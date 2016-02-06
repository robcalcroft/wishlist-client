import React from 'react';
import WishlistBase from './WishlistBase';
import '../scripts/purl';

let loadingComp = (
    <div>
        <div className="progress" style={{marginTop: '10vh'}}>
            <div className="indeterminate"></div>
        </div>
        <h5 className='center'>Please wait while we authenticate your details</h5>
    </div>
);

let noCodeErrorComp = (
    <div className='card-panel red lighten-3' style={{marginTop: '10vh'}}>
        No authorization code found in query string
    </div>
);

let ajaxErrorComp = (
    <div className='card-panel red lighten-3' style={{marginTop: '10vh'}}>
        Internal error - is the authorization code correct?
    </div>
);

export default class Callback extends WishlistBase {

    constructor() {
        super();

        this.state = {
            ui: loadingComp
        };
    }

    componentDidMount() {
        if(!$.url().param('code')) {
            this.setState({
                ui: noCodeErrorComp
            });
            return false;
        }

        $.ajax({
            url: '/api/token',
            method: 'GET',
            data: {
                code: $.url().param('code')
            }
        })
        .done((result) => {
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('refresh_token', result.refresh_token);
            window.location.href = '/profile';
        })
        .fail(() => {
            this.setState({
                ui: ajaxErrorComp
            });
        });
    }

    render() {

        return (
            <div className='inner-react-container'>
                <div className='container'>
                    {this.state.ui}
                </div>
            </div>
        );
    }
}
