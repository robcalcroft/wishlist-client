import React from 'react';
import md5 from 'md5';
import WishlistAuthenticatedPage from './WishlistAuthenticatedPage';
import WishlistList from './WishlistList';
import Nav from './includes/Nav';

export default class Profile extends WishlistAuthenticatedPage {

    constructor() {
        super();

        this.state = {
            user: {}
        };
    }

    componentWillMount() {
        this.wishlistAPI(
            {
                uri: '/api/1/user',
                method: 'GET'
            },
            (err, result) => {
                if(err) {
                    return console.log(err);
                }

                this.setState({
                    user: result.result
                });
                localStorage.setItem('user', JSON.stringify(result.result));
            }
        );
    }

    render() {
        return (
            <div className='inner-react-container'>
                <Nav />
                <div className='container'>
                    <div className='row' style={{marginTop: '10vh'}}>
                        <div className='col s12 m6 l4'>
                            <div className="card">
                                <div className="card-image">
                                    <img src={`http://www.gravatar.com/avatar/${md5(this.state.user.emailAddress)}?d=identicon&s=200`} alt='profile picture' />
                                    <span className="card-title">{`${this.state.user.firstName} ${this.state.user.lastName}`}</span>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-content">
                                    <h5>{this.state.user.username}</h5>
                                    <div className='divider'></div>
                                    <br />
                                    <p><i className='material-icons'>email</i> <span className='text-left-of-icon'>{this.state.user.emailAddress}</span></p>
                                    <p><i className='material-icons'>schedule</i> <span className='text-left-of-icon'>{this.state.user.dateCreated}</span></p>
                                </div>
                            </div>
                        </div>
                        <WishlistList />
                    </div>
                </div>
            </div>
        );
    }
}
