import React from 'react';
import WishlistBase from '../WishlistBase';
import Spinner from './Spinner';

export default class NewWishlistItem extends WishlistBase {

    constructor() {
        super();

        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        $('#modal-bottom-newWishlistItem').leanModal();
    }

    loadUriMetaData(uri, uriField) {
        this.wishlistAPI({
            uri: '/api/1/uri-metadata',
            method: 'GET',
            data: { uri }
        })
        .then((data) => {

            // TODO add price etc
            this.wishlistAPI({
                uri: '/api/1/wishlist/item',
                method: 'POST',
                data: {
                    wishlist_id: this.props.wishlistId,
                    title: data.result.title,
                    description: data.result.description,
                    image_uri: data.result.image[0].url,
                    source_uri: data.result.uri,
                    source_name: data.result.provider_name,
                    user_priority: 5
                }
            })
            .then(() => {
                this.setState({
                    loading: false
                });
                this.props.loadItems({ wishlist_id: this.props.wishlistId });
                uriField.val('');
                $('#create_wishlist_item_modal').closeModal();
            })
            .catch((err) => {
                this.setState({
                    loading: false,
                    wishlistItemCreateError: 'Error creating item'
                });
                this.errorHandler(err);
            });
        })
        .catch(err => {
            this.setState({
                loading: false,
                wishlistItemCreateError: err.responseJSON.message
            });
            this.errorHandler(err);
        });
    }

    uriChangeHandler(event) {
        event.preventDefault();
        let uriField = $(event.target);
        let uri = uriField.val();
        this.setState({
            wishlistItemCreateError: null,
            loading: true
        });
        this.loadUriMetaData(uri, uriField);
    }

    render() {
        return (
            <div className='newWishlistItem top-spacer-small'>
                <button id='modal-bottom-newWishlistItem' data-target='create_wishlist_item_modal' className='modal-trigger amber darken-1 waves-effect waves-light btn full-width'>New Item +</button>

                <div id='create_wishlist_item_modal' className='modal bottom-sheet'>
                    <div className='modal-content'>
                        <div className='row'>
                            <div className='col offset-l1 l11 offset-m1 m11 s12'>
                                <h5>Add an Item {this.state.loading ? <Spinner size='x-small' /> : null}</h5>
                                {this.state.wishlistItemCreateError ? <b className='red-text'>{this.state.wishlistItemCreateError}</b> : null}
                                <div className='row'>
                                    <div className='col l6 m8 s12'>
                                        <form onSubmit={this.props.wishlistItemCreateSubmitHandler}>
                                            <div className='row'>
                                                <div className='input-field'>
                                                    <input onChange={this.uriChangeHandler.bind(this)} id='source_uri' type='text' name='source_uri' autofocus required />
                                                    <label htmlFor='source_uri'>Website Link</label>
                                                </div>
                                            </div>
                                        </form>
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
