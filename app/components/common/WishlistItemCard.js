import React from 'react';
import WishlistBase from '../WishlistBase';
import { Link } from 'react-router';
import moment from 'moment';

export default class WishlistItemCard extends WishlistBase {

    componentDidUpdate() {
        if(!$.browser.mobile) {
            $('.materialboxed').materialbox();
        }
    }

    render() {
        return (
            <div className='card' key={this.props.wishlistItem.wishlistItemId}>
                <div className='card-content'>
                    <div className='row'>
                        <div className='col s12 m3'>
                            <img src='http://lorempixel.com/400/400/sports/' className='full-width materialboxed' />
                        </div>
                        <div className='col s12 m6'>
                            <h4>{this.props.wishlistItem.title}</h4>
                            <h5>{`${this.props.wishlistItem.priceCurrencySymbol}${this.props.wishlistItem.price}`}</h5>
                            <p className='grey-text'>{this.props.wishlistItem.description}</p>
                            <p>
                                Sold by <b>{this.props.wishlistItem.sourceName}</b>
                            </p>
                        </div>
                        <div className='col s12 m3'>
                            <a href={this.props.wishlistItem.sourceURI} className="amber darken-1 waves-effect waves-light btn full-width top-spacer-small">Buy It</a>
                            <a href='#' className="waves-effect waves-light btn full-width top-spacer-small">Edit</a>
                            <a onClick={this.props.deleteWishistItem} data-wishlistitemid={this.props.wishlistItem.wishlistItemId} href='#' className="red darken-1 waves-effect waves-light btn full-width top-spacer-small">Delete</a>
                            <p className='grey-text center top-spacer-small'>Added on {moment(this.props.wishlistItem.dateCreated).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
