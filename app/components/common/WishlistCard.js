import React from 'react';
import WishlistBase from '../WishlistBase';
import LoadingCard from './LoadingCard';
import { Link } from 'react-router';
import moment from 'moment';
import EditWishlist from './EditWishlist';

export default class WishlistCard extends WishlistBase {
    render() {
        if(!Object.keys(this.props.wishlist).length) {
            return <LoadingCard />;
        }

        return (
            <div id={`wishlistCard${this.props.wishlist.wishlistId}`}>
                    <div className='card fadein'>
                        <div className='card-content' style={{color: 'black'}}>
                            <div className='row'>
                                <div className={`col ${this.props.vertical ? 's12' : 'l4 m6 s12'}`}>
                                    <div className='card-title'>{this.props.wishlist.title}</div>
                                </div>
                                <div className={`col ${this.props.vertical ? 's12' : 'l4 m6 s12'} grey-text`}>
                                    <p>
                                        <i className='material-icons'>toc</i>
                                        <span className='text-left-of-icon'>
                                            {this.props.wishlist.wishlistItemCount} item(s) in the list
                                        </span>
                                    </p>
                                    <p>
                                        {this.props.wishlist.privacy === 'public' ? <i className='material-icons'>visibility</i> : <i className="material-icons">visibility_off</i>}
                                        <span className='text-left-of-icon'>
                                            {this.props.wishlist.privacy ? (`${this.props.wishlist.privacy[0].toUpperCase()}${this.props.wishlist.privacy.substr(1)} ${this.props.wishlist.privacy === 'public' ? '(Anyone can view)': '(Only you can view)'}`): ''}
                                        </span>
                                    </p>
                                    <p>
                                        <i className='material-icons'>query_builder</i>
                                        <span className='text-left-of-icon'>
                                            Created {moment(this.props.wishlist.dateCreated).format('DD/MM/YYYY')}
                                        </span>
                                    </p>
                                </div>
                                <div className={`col ${this.props.vertical ? 's12' : 'l4 s12'}`}>
                                    {
                                        this.props.showControls === 'false' ? null :
                                        <div className='cardControls'>
                                            <Link style={{color:'white !important'}} to={`/${this.props.username}/wishlist/${this.props.wishlist.wishlistId}`}><button className='waves-effect waves-light btn full-width top-spacer-small'>View</button></Link>
                                            {
                                                this.props.editable === 'false' ? null :
                                                <div className='edit-controls'>
                                                    <EditWishlist
                                                        updateHandler={this.props.updateHandler}
                                                        wishlistId={this.props.wishlist.wishlistId}
                                                    />
                                                    <button onClick={this.props.deleteHandler} data-wishlistid={this.props.wishlist.wishlistId} className='red darken-1 waves-effect waves-light btn full-width top-spacer-small'>Delete</button>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}
