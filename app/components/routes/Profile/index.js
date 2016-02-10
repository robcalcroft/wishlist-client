import React from 'react';
import WishlistBase from '../../WishlistBase';
import Container from '../../common/Container';
import UserProfileCard from '../../common/UserProfileCard';
import WishlistCardList from '../../common/WishlistCardList';
import NewWishlist from '../../common/NewWishlist';

export default class Profile extends WishlistBase {

    constructor() {
        super();

        this.state = {
            initialLoad: false,
            user: {},
            wishlists: [],
            wishlistCreateError: null
        };
    }

    loadWishlists(userId) {
        this.wishlistAPI({
            uri: '/api/1/wishlist',
            method: 'GET',
            data: {
                user_id: userId
            }
        })
        .then(data => {
            this.setState({
                wishlists: data.result
            });
        })
        .catch(err => {
            this.setState({
                wishlists: []
            });
            this.errorHandler(err);
        });
    }

    loadUser(username) {
        this.wishlistAPI({
            uri: '/api/1/user/search',
            method: 'GET',
            data: { username }
        })
        .then(data => {
            this.setState({
                initialLoad: true,
                user: data.result[0]
            });
            this.loadWishlists(this.state.user.userId);
        })
        .catch(this.errorHandler);

    }

    wishlistCreateHandler(event) {
        event.preventDefault();
        const form = $(event.target).serializeArray();

        this.wishlistAPI({
            uri: '/api/1/wishlist',
            method: 'POST',
            data: {
                title: form[0].value,
                privacy: form[1] ? 'private' : 'public'
            }
        })
        .then(() => {
            $('#wishlist-create-modal').closeModal();
            this.loadWishlists(this.state.user.userId);
        })
        .catch(this.errorHandler);
    }

    wishlistUpdateHandler(event) {
        event.preventDefault();
        const form = $(event.target);
        const formData = form.serializeArray();

        this.wishlistAPI({
            uri: '/api/1/wishlist',
            method: 'PUT',
            data: {
                wishlist_id: form.data('wishlistid'),
                title: formData[0].value,
                privacy: formData[1] ? 'private' : 'public'
            }
        })
        .then(() => {
            $(`#wishlist-edit-modal-${form.data('wishlistid')}`).closeModal();
            this.loadWishlists(this.state.user.userId);
        })
        .catch(this.errorHandler);
    }

    wishlistDeleteHandler(event) {
        event.preventDefault();
        let button = $(event.target);

        if(button.attr('data-confirm') !== 'on') {
            button.html('Are you sure?').attr('data-confirm', 'on');

            // Reset the button
            return setTimeout(() => {
                button.html('Delete').attr('data-confirm', 'off');
            }, 2000);
        }

        const wishlistId = $(event.target).data('wishlistid');

        this.wishlistAPI({
            uri: `/api/1/wishlist?wishlist_id=${wishlistId}`,
            method: 'DELETE'
        })
        .then(() => {
            this.loadWishlists(this.state.user.userId);
        })
        .catch(err => {
            if(err.status === 403) {
                alert('This is not your wishlist; you cannot delete it');
            }
            if(err.status === 404) {
                this.loadWishlists(this.state.user.userId);
            }
            this.errorHandler(err);
        });

    }

    componentWillMount() {
        this.loadUser(this.props.params.username);
    }

    render() {
        return (
            <Container username={localStorage.getItem('username')}>
                <div className='row' style={{marginTop: '5vh'}}>
                    <div className='col s12 l4'>
                        <UserProfileCard user={this.state.user} />
                    </div>
                    <div className='col s12 l8'>
                        <NewWishlist
                            error={this.state.wishlistCreateError}
                            createHandler={this.wishlistCreateHandler.bind(this)}
                        />
                        <WishlistCardList
                            updateHandler={this.wishlistUpdateHandler.bind(this)}
                            deleteHandler={this.wishlistDeleteHandler.bind(this)}
                            wishlists={this.state.wishlists}
                            username={this.state.user.username}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}
