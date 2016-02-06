import React from 'react';
import WishlistBase from './WishlistBase';
import Nav from './includes/Nav';

export default class Home extends WishlistBase {
    render() {
        return (
            <div className='inner-react-container'>
                <Nav />
                <div className='container'>
                    Hello there
                </div>
            </div>
        );
    }
}
