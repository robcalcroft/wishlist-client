import React from 'react';
import WishlistBase from '../../WishlistBase';
import Container from '../../common/Container';
import '../../../scripts/purl';

const COMP_LOADING = (
    <div>
        <div className="progress" style={{marginTop: '5vh'}}>
            <div className="indeterminate"></div>
        </div>
        <h5 className='center'>Please wait while we authenticate your details</h5>
    </div>
);

const COMP_NO_CODE = (
    <div className='card-panel red lighten-3' style={{marginTop: '5vh'}}>
        No authorization code found in query string
    </div>
);

const COMP_AJAX_ERROR = (
    <div className='card-panel red lighten-3' style={{marginTop: '5vh'}}>
        Internal error - is the authorization code correct?
    </div>
);

export default class Callback extends WishlistBase {

    constructor() {
        super();

        this.state = {
            component: COMP_LOADING
        };
    }

    componentDidMount() {
        if(!$.url().param('code')) {
            return this.setState({
                component: COMP_NO_CODE
            });
        }

        $.ajax({
            url: '/api/token',
            method: 'GET',
            data: {
                code: $.url().param('code')
            }
        })
        .done((data) => {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            // Collect user details
            this.wishlistAPI({
                uri: '/api/1/user',
                method: 'GET'
            })
            .then((data) => {
                localStorage.setItem('username', data.result.username);

                this.changePageTo(`/${data.result.username}`);
            })
            .catch(this.errorHandler);
        })
        .fail(() => {
            this.setState({
                component: COMP_AJAX_ERROR
            });
        });
    }

    render() {
        return (
            <Container noNavBar={true}>
                {this.state.component}
            </Container>
        );
    }
}
