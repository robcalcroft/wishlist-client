import React from 'react';
import WishlistBase from '../../WishlistBase';

export default class Home extends WishlistBase {
    constructor() {
        super();
    }

    componentDidMount() {
        // $('.button-collapse').sideNav();
    }

    logoutClickHandler(event) {
        event.preventDefault();
        localStorage.clear();
        this.changePageTo('/');
    }

    render() {
        return (
            <div className='inner-react-container'>
                <header>
                    <nav className='transparent' style={{boxShadow: 'none', MozBoxShadow: 'none', display: 'inline'}}>
                        <div className='nav-wrapper nav-home'>
                            <a data-activates='mobile-menu' href='#' className='button-collapse left'>
                                <i className='material-icons grey-text'>menu</i>
                            </a>
                            <div className='grey-text text-darken-3 brand-font left hide-on-med-and-down'>WISHLIST</div>
                            <div style={{fontSize: '2.4rem'}} className='grey-text text-darken-3 brand-logo brand-font center hide-on-large-only'>WISHLIST</div>
                            {
                                localStorage.getItem('username') ?
                                <ul className='hide-on-med-and-down right'>
                                    <li className='active'>
                                        <a href={`/${localStorage.getItem('username')}`}>{localStorage.getItem('username')}</a>
                                    </li>
                                    <li>
                                        <a onClick={this.logoutClickHandler.bind(this)} href='#'>Logout</a>
                                    </li>
                                </ul>:
                                <ul className='hide-on-med-and-down right'>
                                    <li>
                                        <a href={`${this.wishlistBaseUri}/sign-up`}>Sign Up</a>
                                    </li>
                                    <li>
                                        <a href={`${this.wishlistBaseUri}/api/1/auth/authorize?response_type=code&client_id=${process.env.WISHLIST_CLIENT_ID}&redirect_uri=${process.env.WISHLIST_REDIRECT_URI}`}>Log In</a>
                                    </li>
                                </ul>
                            }
                            <div id='mobile-menu' className='side-nav'>
                                <h4 className='grey-text center brand-font'>WISHLIST</h4>
                                <div className='divider'></div>
                                {
                                    localStorage.getItem('username') ?
                                    <ul>
                                        <li className='active'>
                                            <a href={`/${localStorage.getItem('username')}`}>{localStorage.getItem('username')}</a>
                                        </li>
                                        <li>
                                            <a onClick={this.logoutClickHandler.bind(this)} href='#'>Logout</a>
                                        </li>
                                    </ul>:
                                    <ul>
                                        <li>
                                            <a href={`${this.wishlistBaseUri}/sign-up`}>Sign Up</a>
                                        </li>
                                        <li>
                                            <a href={`${this.wishlistBaseUri}/api/1/auth/authorize?response_type=code&client_id=${process.env.WISHLIST_CLIENT_ID}&redirect_uri=${process.env.WISHLIST_REDIRECT_URI}`}>Log In</a>
                                        </li>
                                    </ul>
                                }
                                <div className='divider'></div>
                                <div className='grey-text center'>Rob Calcroft &copy; 2015</div>
                            </div>
                        </div>
                    </nav>
                </header>
                <main className='container'>
                    <div className='jumbotron center'>
                        <header className='brand-font'>Wishlist? Sorted.</header>
                        <div className='row'>
                            <div className='col m4 hero' style={{paddingTop: '7.5vh'}}>
                                <i className='material-icons'>language</i>
                                <h5>Vendor Agnostic</h5>
                                <p className='grey-text'>We don't care what vendor you use; intelligent searching technology provided by <a href='http://embed.ly/'>EmbedLy</a> will find plenty of data about the product you want</p>
                            </div>
                            <div className='col m4 hero'>
                                <i className='material-icons'>visibility_off</i>
                                <h5>Secure &amp; Privacy Concious</h5>
                                <p className='grey-text'>Whether you don't want your Nan to see her next pair of slippers, or you're pricing up your ASOS binge, you can trust our secure authentication and privacy controls</p>
                            </div>
                            <div className='col m4 hero'>
                                <i className='material-icons'>call_split</i>
                                <h5>Open Source &amp; Extensible</h5>
                                <p className='grey-text'>If you happen to know how to build apps you can use our OAuth2 REST API to build your own Wishlist client, for more info <a href='http://developers.wishlist.pw'>see here</a></p>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className='page-footer transparent'>
                    <div className='footer-copyright transparent'>
                        <div className='center'>
                            <a href='http://developers.wishlist.pw'>Developers</a>
                            <a href='http://github.com/robcalcroft/wishlist-api'>Source Code</a>
                            <a href='#'>Terms &amp; Conditions</a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}
