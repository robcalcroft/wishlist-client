import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

// Components
import Home from './components/Home';
import Callback from './components/Callback';
import Profile from './components/Profile';

// Styles
import './styles/sass/materialize.scss';
import './styles/wishlist.css';

// Scripts
import './scripts/wishlist';
import 'materialize-css/dist/js/materialize.js';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={Home} />
            <Route path='/callback' component={Callback} />
            <Route path='/profile' component={Profile} />
    </Router>,
    document.getElementById('react-hook')
);
