import React from 'react';
import WishlistBase from '../WishlistBase';
import LoadingCard from './LoadingCard';
import moment from 'moment';
import EditWishlistItem from './EditWishlistItem';

export default class WishlistItemCard extends WishlistBase {

    componentDidMount() {
        $('.materialboxed').materialbox();
    }

    render() {
        if(!Object.keys(this.props.wishlistItem).length) {
            return (<LoadingCard />);
        }

        return (
            <div className='card fadein' key={this.props.wishlistItem.wishlistItemId}>
                <div className='card-content'>
                    <div className='row'>
                        <div className='col s12 m3'>
                            <img src={this.props.wishlistItem.imageURI} className='full-width materialboxed' />
                        </div>
                        <div className='col s12 m5'>
                            <h6>{this.props.wishlistItem.title}</h6>
                            <h6>{`${this.props.wishlistItem.priceCurrencySymbol || ''}${this.props.wishlistItem.price || '-'}`}</h6>
                            <p className='grey-text'>{this.props.wishlistItem.description}</p>
                            <p>
                                Sold by <b>{this.props.wishlistItem.sourceName}</b>
                            </p>
                        </div>
                        <div className='col s12 m4'>
                            <a href={this.props.wishlistItem.sourceURI} className='amber darken-1 waves-effect waves-light btn full-width top-spacer-small'>Buy It</a>
                            {
                                this.props.editable === 'false' ? null :
                                <div className='edit-controls'>
                                    <EditWishlistItem
                                        updateHandler={this.props.updateHandler}
                                        error={false}
                                        wishlistItemId={this.props.wishlistItem.wishlistItemId}
                                    />
                                    <button onClick={this.props.deleteHandler} data-wishlistitemid={this.props.wishlistItem.wishlistItemId} href='#' className='red darken-1 waves-effect waves-light btn full-width top-spacer-small'>Delete</button>
                                </div>
                            }
                            <p className='grey-text center top-spacer-small'>Added on {moment(this.props.wishlistItem.dateCreated).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
