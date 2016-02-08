import React from 'react';
import WishlistBase from '../WishlistBase';
import WishlistItemCard from './WishlistItemCard.js';

export default class WishlistItemCardList extends WishlistBase {

    constructor() {
        super();
    }

    processWishlists(wishlistItems) {
        if(!wishlistItems.length) {
            return <h5 style={{marginTop: '2.5vh'}} className='center grey-text'>No wishlist items available</h5>;
        }
        return wishlistItems.map(wishlistItem => {
            return <WishlistItemCard deleteWishistItemHandler={this.props.deleteWishistItemHandler} key={wishlistItem.wishlistItemId} wishlistItem={wishlistItem} />;
        });
    }

    render() {
        return (
            <div id='wishlistItemCardList'>
                {this.processWishlists(this.props.wishlistItems)}
            </div>
        );
    }
}
