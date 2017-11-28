import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

// Components
import Home from './components/routes/Home';
import Callback from './components/routes/Callback';
import Profile from './components/routes/Profile';
import Wishlist from './components/routes/Wishlist';

// Styles
import './styles/sass/materialize.scss';
import './styles/wishlist.scss';

// Scripts
import './scripts/is-mobile.js';
// import 'materialize-css/dist/js/materialize.js';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={Home}/>
            <Route path='/callback' component={Callback} />
            <Route path='/:username/wishlist/:wishlistId' component={Wishlist} />
            <Route path='/:username' component={Profile} />
    </Router>,
    document.getElementById('react-hook')
);
