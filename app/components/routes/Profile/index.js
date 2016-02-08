import React from 'react';
import WishlistBase from '../../WishlistBase';
import Container from '../../common/Container';
import UserProfileCard from '../../common/UserProfileCard';
import WishlistCardList from '../../common/WishlistCardList';

export default class Profile extends WishlistBase {

    constructor() {
        super();

        this.state = {
            initialLoad: false,
            user: {},
            wishlists: []
        };
    }

    loadWishlists(userId) {
        this.wishlistAPI(
            {
                uri: '/api/1/wishlist',
                method: 'GET',
                data: {
                    user_id: userId
                }
            },
            (err, data) => {
                if(err) {
                    return console.log(err);
                }

                this.setState({
                    wishlists: data.result
                });
            }
        );
    }

    loadUser(username) {
        this.wishlistAPI(
            {
                uri: '/api/1/user/search',
                method: 'GET',
                data: { username }
            },
            (err, data) => {
                if(err || data.statusCode === 404 || data.result.length > 1) {
                    console.log(err);
                    return this.changePageTo('/');
                }

                this.loadWishlists(data.result[0].userId);

                this.setState({
                    initialLoad: true,
                    user: data.result[0]
                });
            }
        );

    }

    componentWillMount() {
        this.loadUser(this.props.params.username);
    }

    render() {
        if(!this.state.initialLoad) {
            return false;
        }

        return (
            <Container username={this.props.params.username}>
                <div className='row' style={{marginTop: '5vh'}}>
                    <div className='col s12 m6 l4'>
                        <UserProfileCard user={this.state.user} />
                    </div>
                    <div className='col s12 m6 l8'>
                        <WishlistCardList wishlists={this.state.wishlists} username={this.state.user.username} />
                    </div>
                </div>
            </Container>
        );
    }
}
