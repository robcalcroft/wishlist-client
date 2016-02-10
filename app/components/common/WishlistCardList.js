import React from 'react';
import WishlistBase from '../WishlistBase';
import WishlistCard from './WishlistCard';

export default class WishlistCardList extends WishlistBase {

    constructor() {
        super();
    }
    //fix naming i.e. remove wishlist or wishliteitem before cos we know what it is cos of the element
    //fix $('.modal-trigger').leanModal(); working too many times

    processWishlists(wishlists) {
        if(!wishlists.length) {
            return <h5 style={{marginTop: '2.5vh'}} className='center grey-text'>No wishlists available</h5>;
        }
        return wishlists.map(wishlist => {
            return (
                <WishlistCard
                    key={wishlist.wishlistId}
                    username={this.props.username}
                    wishlist={wishlist}
                    updateHandler={this.props.updateHandler}
                    deleteHandler={this.props.deleteHandler} 
                />
            );
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
