import React from 'react';
import WishlistBase from './WishlistBase';

export default class WishlistList extends WishlistBase {

    constructor() {
        super();

        this.state = {};
    }

    processWishlists(wishlists) {
        let wishlistCards = [];
        let key = 0;

        wishlists.map((wishlist) => {
            wishlistCards.push(
                <a href='#' key={key++}>
                    <div className="card small">
                        <div className='card-image'>
                            <img src={wishlist.imageURI} />
                            <div className='card-title'>{wishlist.title}</div>
                        </div>
                        <div className='card-content' style={{color: 'black'}}>
                            No description
                        </div>
                    </div>
                </a>
            );
        });

        this.setState({ wishlistCards });

    }

    componentWillMount() {
        this.wishlistAPI(
            {
                uri: '/api/1/wishlist',
                method: 'GET',
                data: {
                    user_id: JSON.parse(localStorage.getItem('user')).userId
                }
            },
            (err, result) => {
                if(err) {
                    return alert(err);
                }

                this.processWishlists(result.result);
            }
        );
    }

    render() {
        return (
            <div className='col s12 m6 l8'>
                {this.state.wishlistCards}
            </div>
        );
    }
}
