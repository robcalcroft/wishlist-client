import React from 'react';
import WishlistBase from '../WishlistBase';
import Spinner from './Spinner';

export default class EditWishlist extends WishlistBase {

    constructor() {
        super();

        this.state = {
            loading: true,
            wishlist: {}
        };
    }

    loadCurrentData(wishlistId) {
        this.wishlistAPI({
            uri: '/api/1/wishlist',
            method: 'GET',
            data: { wishlist_id: wishlistId }
        })
        .then(data => {
            this.setState({
                loading: false,
                wishlist: data.result[0]
            });
        })
        .catch(this.errorHandler);
    }

    componentDidMount() {
        $(`#${this.modalButtonId}`).leanModal();
    }

    componentWillMount() {
        this.modalButtonId = `wishlist-edit-button-${this.props.wishlistId}`;
        this.modalId = `wishlist-edit-modal-${this.props.wishlistId}`;
        this.loadCurrentData(this.props.wishlistId);
    }

    render() {
        return (
            <div className='editWishlist'>
                <button id={this.modalButtonId} data-target={this.modalId} className='modal-trigger darken-1 waves-effect waves-light btn full-width top-spacer-small'>Edit Wishlist</button>

                <div id={this.modalId} className='modal bottom-sheet'>
                    <div className='modal-content'>
                        <div className='row'>
                            <div className='col offset-l1 l11 offset-m1 m11 s12'>
                                <h5>Edit a Wishlist</h5>
                                {this.props.error ? <b className='red-text'>this.props.error</b> : null}
                                <div className='row'>
                                    <div className='col l6 m8 s12'>
                                        {
                                            this.state.loading ? <Spinner size='small' /> :
                                            <form onSubmit={this.props.updateHandler} data-wishlistid={this.props.wishlistId}>
                                                <div className='row'>
                                                    <div className='input-field'>
                                                        <input id='title' type='text' name='title' defaultValue={this.state.wishlist.title} autofocus required />
                                                        <label className='active' htmlFor='title'>Title</label>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='switch'>
                                                        <label>
                                                            Public
                                                            <input name='privacy' type='checkbox' defaultChecked={this.state.wishlist.privacy === 'public' ? false : true} />
                                                            <span className='active lever'></span>
                                                            Private
                                                        </label>
                                                    </div>
                                                </div>
                                                <button type='submit' className='waves-effect waves-light btn'>Update Wishlist</button>
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
