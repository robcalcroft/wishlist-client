import React from 'react';

export default class WishlistBase extends React.Component {

    constructor() {
        super();

        this.wishlistBaseUri = 'http://wishlist.pw';
    }

    // Handles authentication and refreshing of token
    wishlistAPI(options, callback) {
        if(!localStorage.getItem('access_token')) {
            callback('no_access_token', false);
        }

        $.ajax({
            url: `${this.wishlistBaseUri}${options.uri}`,
            method: options.method,
            data: options.data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .done((result) => {
            callback(null, result);
        })
        .fail((response) => {
            if(response.status === 401 && !options.rtRetry) {
                return $.ajax({
                    url: '/api/token',
                    method: 'GET',
                    data: {
                        refresh_token: localStorage.getItem('refresh_token')
                    }
                })
                .done((result) => {
                    localStorage.setItem('access_token', result.access_token);
                    options.rtRetry = true;
                    this.wishlistAPI(options, callback);
                })
                .fail((response_1) => {
                    callback(response_1);
                });
            }
            callback(response);
        });
    }
}
