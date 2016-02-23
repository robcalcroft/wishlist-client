import React from 'react';

export default class WishlistBase extends React.Component {

    constructor() {
        super();

        this.wishlistBaseUri = process.env.WISHLIST_BASE_URI;
    }

    getBaseUri() {
        return this.wishlistBaseUri;
    }

    changePageTo(uri) {
        if(!uri) {
            throw new Error('No URI present');
        }
        document.location.href = uri;
    }

    // Handles authentication and refreshing of token
    // This is very dirty
    wishlistAPI(options) {
        return new Promise((resolve, reject) => {
            if(!localStorage.getItem('access_token')) {
                reject('no_access_token');
            }

            $.ajax({
                url: `${this.wishlistBaseUri}${options.uri}`,
                method: options.method,
                data: options.data,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .done(resolve)
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
                        this.wishlistAPI(options).then(resolve).catch(reject);
                    })
                    .fail(response_1 => {
                        localStorage.clear();
                        reject(response_1);
                    });
                }
                reject(response);
            });
        });


    }

    errorHandler(err, status = 500, message = 'Application Error') {
        console.log(err, status, message);
    }
}
