import React from 'react';
import WishlistBase from '../WishlistBase';
import WishlistCard from './WishlistCard';

export default class WishlistCardList extends WishlistBase {

    constructor() {
        super();
    }

    processWishlists(wishlists) {
        if(!wishlists.length) {
            return <h5 style={{marginTop: '2.5vh'}} className='center grey-text'>No wishlists available</h5>;
        }
        return wishlists.map(wishlist => {
            return <WishlistCard key={wishlist.wishlistId} username={this.props.username} wishlist={wishlist} />;
        });
    }

    render() {
        return (
            <div id='wishlistCardList'>
                {this.processWishlists(this.props.wishlists)}
            </div>
        );
    }
}
