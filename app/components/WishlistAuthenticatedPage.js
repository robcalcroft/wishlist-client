import React from 'react';
import WishlistBase from './WishlistBase';

export default class WishlistAuthenticatedPage extends WishlistBase {

    constructor() {
        super();

        this.checkLoggedIn();
    }

    // User has no stored details so redirect to homepage
    checkLoggedIn() {
        if(!localStorage.getItem('access_token') || !localStorage.getItem('refresh_token')) {
            window.location.href = '/';
        }
    }

}
