import React from 'react';
import WishlistBase from '../../WishlistBase';
import WishlistItemCardList from '../../common/WishlistItemCardList';
import WishlistCard from '../../common/WishlistCard';
import Container from '../../common/Container';
import Breadcrumbs from '../../common/Breadcrumbs';
import NewWishlistItem from '../../common/NewWishlistItem';

export default class Wishlist extends WishlistBase {

    constructor() {
        super();

        this.state = {
            wishlistItems: [],
            wishlist: {}
        };

        this.filters = {
            priority: []
        };

        this.sorters = {
            date: 'desc'
        };
    }

    updateWishlistItemHandler(event) {
        event.preventDefault();
        const form = $(event.target);
        const formData = form.serializeArray();
        let updatedFields = {};
        let length = formData.length;
        while(length--) {
            updatedFields[formData[length].name] = formData[length].value;
        }
        updatedFields.wishlist_item_id = form.data('wishlistitemid');
        this.wishlistAPI({
            uri: '/api/1/wishlist/item',
            method: 'PUT',
            data: updatedFields
        })
        .then(() => {
            $(`#wishlist-item-edit-modal-${form.data('wishlistitemid')}`).closeModal();
            this.loadWishlistItems({ wishlist_id: this.props.params.wishlistId });
        })
        .catch(this.errorHandler);
    }

    deleteWishistItemHandler(event) {
        event.preventDefault();
        let button = $(event.target);
        let wishlistItemId = button.data('wishlistitemid');

        if(button.attr('data-confirm') !== 'on') {
            button.html('Are you sure?').attr('data-confirm', 'on');

            // Reset the button
            return setTimeout(() => {
                button.html('Delete').attr('data-confirm', 'off');
            }, 2000);
        }

        this.wishlistAPI({
            uri: `/api/1/wishlist/item?wishlist_item_id=${wishlistItemId}`,
            method: 'DELETE'
        })
        .then(() => {
            this.loadWishlistItems({ wishlist_id: this.props.params.wishlistId });
        })
        .catch(this.errorHandler);
    }


    loadWishlistItems(options) {
        this.wishlistAPI({
            uri: '/api/1/wishlist/item',
            method: 'GET',
            data: options
        })
        .then((data) => {
            this.setState({
                wishlistItems: data.result
            });
        })
        .catch((err) => {
            if(err.status === 404) {
                this.setState({
                    wishlistItems: []
                });
            }
            this.errorHandler(err);
        });
    }

    loadWishlist(wishlistId) {
        this.wishlistAPI({
            uri: '/api/1/wishlist',
            method: 'GET',
            data: { wishlist_id: wishlistId }
        })
        .then((data) => {
            this.setState({
                wishlist: data.result[0]
            });
        })
        .catch(this.errorHandler);
    }

    wishlistItemsFilterSort(event) {
        event.preventDefault();

        if(event.target.parentElement.parentElement.id === 'priority_drop') {
            const priority = $(event.target).data('priority');

            if(this.filters.priority.indexOf(priority) === -1) {
                $(event.target).addClass('drop-down-selected');
                this.filters.priority.push(priority);
            } else {
                $(event.target).removeClass('drop-down-selected');
                this.filters.priority.splice(this.filters.priority.indexOf(priority), 1);
            }

        }

        if(event.target.parentElement.parentElement.id === 'sortbydate_drop') {
            $('a[data-order]').toggleClass('drop-down-selected');
            this.sorters.date = $(event.target).attr('data-order');
        }

        this.loadWishlistItems({
            wishlist_id: this.props.params.wishlistId,
            priority: this.filters.priority.join(','),
            order: this.sorters.date
        });
    }

    initDropdowns() {
        $('.dropdown-button').dropdown({ belowOrigin: true });
    }

    componentDidMount() {
        this.initDropdowns();
    }

    componentWillMount() {
        this.loadWishlistItems({ wishlist_id: this.props.params.wishlistId });
        this.loadWishlist(this.props.params.wishlistId);
    }

    render() {
        return (
            <Container username={localStorage.getItem('username')}>
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            href: `/${this.props.params.username}`,
                            text: 'Profile'
                        },
                        {
                            href: window.location.pathname,
                            text: this.state.wishlist.title
                        }
                    ]}
                />
                <div className='row'>
                    <div className='col l4 s12'>
                        <div className='row'>
                            <div className='col s12'>
                                <WishlistCard
                                    showControls='false'
                                    wishlist={this.state.wishlist}
                                    vertical='true'
                                />
                            </div>
                            <div className='col s12'>
                                <div className='card'>
                                    <div className='card-content'>
                                        <div className='row'>
                                            <div className='col s12'>
                                                <button className='dropdown-button btn full-width top-spacer-small' data-beloworigin='true' data-activates='sortbydate_drop'>Sort By Date</button>
                                                <ul onClick={this.wishlistItemsFilterSort.bind(this)} id='sortbydate_drop' className='dropdown-content'>
                                                    <li><a className='drop-down-selected' data-order='desc' href='#'>Newest first</a></li>
                                                    <li><a data-order='asc' href='#'>Oldest first</a></li>
                                                </ul>
                                            </div>
                                            <div className='col s12'>
                                                <button className='dropdown-button btn full-width top-spacer-small' href='#' data-beloworigin='true' data-activates='priority_drop'>Filter By Priority</button>
                                                <ul onClick={this.wishlistItemsFilterSort.bind(this)} id='priority_drop' className='dropdown-content'>
                                                    <li><a data-priority={5} href='#'>5 (most wanted)</a></li>
                                                    <li><a data-priority={4} href='#'>4</a></li>
                                                    <li><a data-priority={3} href='#'>3</a></li>
                                                    <li><a data-priority={2} href='#'>2</a></li>
                                                    <li><a data-priority={1} href='#'>1 (least wanted)</a></li>
                                                </ul>
                                            </div>
                                            <div className='col s12'>
                                                &nbsp;
                                            </div>
                                            <div className='col s12' style={{paddingTop: '13px'}}>
                                                <p className='grey-text'>{this.state.wishlistItems.length} item(s) returned</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col l8 s12'>
                        <NewWishlistItem
                            loadItems={this.loadWishlistItems.bind(this)}
                            wishlistId={this.state.wishlist.wishlistId}
                        />
                        <WishlistItemCardList
                            deleteHandler={this.deleteWishistItemHandler.bind(this)}
                            updateHandler={this.updateWishlistItemHandler.bind(this)}
                            wishlistItems={this.state.wishlistItems}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}
