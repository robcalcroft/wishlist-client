import React from 'react';
import WishlistBase from '../WishlistBase';
import Spinner from './Spinner';

export default class EditWishlistItem extends WishlistBase {

    constructor() {
        super();

        this.state = {
            loading: true,
            wishlistItem: {}
        };
    }

    loadCurrentData(wishlistItemId) {
        this.wishlistAPI({
            uri: '/api/1/wishlist/item',
            method: 'GET',
            data: { wishlist_item_id: wishlistItemId }
        })
        .then(data => {
            this.setState({
                loading: false,
                wishlistItem: data.result[0]
            });
        })
        .catch(this.errorHandler);
    }

    componentDidUpdate() {
        $('select').material_select();
    }

    componentDidMount() {
        $(`#${this.modalButtonId}`).leanModal();
    }

    componentWillMount() {
        this.modalButtonId = `wishlist-item-edit-button-${this.props.wishlistItemId}`;
        this.modalId = `wishlist-item-edit-modal-${this.props.wishlistItemId}`;
        this.loadCurrentData(this.props.wishlistItemId);
    }

    render() {
        return (
        <div className='editWishlistItem'>
                <button id={this.modalButtonId} data-target={this.modalId} className='modal-trigger darken-1 waves-effect waves-light btn full-width top-spacer-small'>Edit</button>

                <div id={this.modalId} className='modal bottom-sheet'>
                    <div className='modal-content'>
                        <div className='row'>
                            <div className='col offset-l1 l11 offset-m1 m11 s12'>
                                <h5>Edit a Wishlist Item</h5>
                                {this.props.error ? <b className='red-text'>this.props.error</b> : null}
                                <div className='row'>
                                    <div className='col l6 m8 s12'>
                                        {
                                            this.state.loading ? <Spinner size='small' /> :
                                            <form onSubmit={this.props.updateHandler} data-wishlistitemid={this.props.wishlistItemId}>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='title' type='text' name='title' defaultValue={this.state.wishlistItem.title}  required />
                                                        <label className='active' htmlFor='title'>Title</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='description' type='text' name='description' defaultValue={this.state.wishlistItem.description} />
                                                        <label className='active' htmlFor='description'>Description</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='source_uri' type='text' name='source_uri' defaultValue={this.state.wishlistItem.sourceURI} />
                                                        <label className='active' htmlFor='source_uri'>URL</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='source_name' type='text' name='source_name' defaultValue={this.state.wishlistItem.sourceName} />
                                                        <label className='active' htmlFor='source_name'>Sold by</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='image_uri' type='text' name='image_uri' defaultValue={this.state.wishlistItem.imageURI} />
                                                        <label className='active' htmlFor='image_uri'>Image link</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col s4'>
                                                        <div className='input-field'>
                                                            <select defaultValue={this.state.wishlistItem.priceCurrencySymbol || ''} name='price_currency_symbol'>
                                                                <option defaultValue=''>Select currency symbol</option>
                                                                <option defaultValue='£'>£</option>
                                                                <option defaultValue='$'>$</option>
                                                                <option defaultValue='€'>€</option>
                                                            </select>
                                                            <label>Currency Symbol</label>
                                                        </div>
                                                    </div>
                                                    <div className='col s8'>
                                                        <div className='input-field'>
                                                            <input id='price' type='text' name='price' defaultValue={this.state.wishlistItem.price} />
                                                            <label className='active' htmlFor='price'>Price</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <select defaultValue={this.state.wishlistItem.userPriority} name='user_priority'>
                                                            <option defaultValue=''>Select item priority</option>
                                                            <option defaultValue='5'>I must have this</option>
                                                            <option defaultValue='4'>This would be great</option>
                                                            <option defaultValue='3'>I'd like this</option>
                                                            <option defaultValue='2'>I'm not too bothered about this</option>
                                                            <option defaultValue='1'>I'm not sure if I still want this</option>
                                                        </select>
                                                        <label>Priority</label>
                                                    </div>
                                                </div>
                                                <button type='submit' className='waves-effect waves-light btn'>Update Wishlist Item</button>
                                            </form>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
