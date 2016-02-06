import React from 'react';



export default class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div className='nav-wrapper'>
                    <a className='brand-logo center brand-font'>WISHLIST</a>
                    <a data-activates='mobile-menu' href='#' style={{paddingLeft: '10px'}} className='button-collapse'>
                        <i className='material-icons'>menu</i>
                    </a>
                    <ul className='hide-on-med-and-down right'>
                        <li>
                            <a href='http://wishlist.pw/sign-up'>Sign Up</a>
                        </li>
                        <li>
                            <a href='http://wishlist.pw/api/1/auth/authorize?response_type=code&client_id=f6effb0a6eaf48daf2e9588d76733592&redirect_uri=http://localhost:8001/callback'>Log In</a>
                        </li>
                    </ul>
                    <div id='mobile-menu' className='side-nav'>
                        <h4 className='grey-text center brand-font'>WISHLIST</h4>
                        <div className='divider'></div>
                        <ul>
                            <li>
                                <a href='http://wishlist.pw/sign-up'>Sign Up</a>
                            </li>
                            <li>
                                <a href='http://wishlist.pw/api/1/auth/authorize?response_type=code&client_id=f6effb0a6eaf48daf2e9588d76733592&redirect_uri=http://localhost:8001/callback'>Log In</a>
                            </li>
                        </ul>
                        <div className='divider'></div>
                        <div className='grey-text center'>Rob Calcroft &copy; 2015</div>
                    </div>
                </div>
            </nav>
        );
    }
}
