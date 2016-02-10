import React from 'react';
import WishlistBase from '../WishlistBase';

export default class Nav extends WishlistBase {

    componentDidMount() {
        $('.button-collapse').sideNav();
    }

    logoutClickHandler(event) {
        event.preventDefault();
        localStorage.clear();
        this.changePageTo('/');
    }

    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <a className='brand-logo center brand-font'>WISHLIST</a>
                    <a data-activates='mobile-menu' href='#' style={{paddingLeft: '10px'}} className='button-collapse'>
                        <i className='material-icons'>menu</i>
                    </a>
                    {
                        this.props.username ?
                        <ul className='hide-on-med-and-down right'>
                            <li className='active'>
                                <a href={`/${this.props.username}`}>{this.props.username}</a>
                            </li>
                            <li>
                                <a onClick={this.logoutClickHandler.bind(this)} href='#'>Logout</a>
                            </li>
                        </ul>:
                        <ul className='hide-on-med-and-down right'>
                            <li>
                                <a href='http://wishlist.pw/sign-up'>Sign Up</a>
                            </li>
                            <li>
                                <a href={`${this.wishlistBaseUri}/api/1/auth/authorize?response_type=code&client_id=f6effb0a6eaf48daf2e9588d76733592&redirect_uri=http://localhost:8001/callback`}>Log In</a>
                            </li>
                        </ul>
                    }
                    <div id='mobile-menu' className='side-nav'>
                        <h4 className='grey-text center brand-font'>WISHLIST</h4>
                        <div className='divider'></div>
                        {
                            this.props.username ?
                            <ul>
                                <li className='active'>
                                    <a href={`/${this.props.username}`}>{this.props.username}</a>
                                </li>
                            </ul>:
                            <ul>
                                <li>
                                    <a href='http://wishlist.pw/sign-up'>Sign Up</a>
                                </li>
                                <li>
                                    <a href={`${this.wishlistBaseUri}/api/1/auth/authorize?response_type=code&client_id=f6effb0a6eaf48daf2e9588d76733592&redirect_uri=http://localhost:8001/callback`}>Log In</a>
                                </li>
                            </ul>
                        }
                        <div className='divider'></div>
                        <div className='grey-text center'>Rob Calcroft &copy; 2015</div>
                    </div>
                </div>
            </nav>
        );
    }
}
