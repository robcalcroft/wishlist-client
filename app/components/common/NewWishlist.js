import React from 'react';

export default class NewWishlist extends React.Component {

    constructor() {
        super();

        this.modalButtonId = 'wishlist-create-button';
        this.modalId = 'wishlist-create-modal';
    }

    componentDidMount() {
        $(`#${this.modalButtonId}`).leanModal();
    }

    render() {
        return (
            <div className='wishlist-create'>
                <button id={this.modalButtonId} data-target={this.modalId} className='modal-trigger amber darken-1 waves-effect waves-light btn full-width'>New Wishlist +</button>

                <div id={this.modalId} className="modal bottom-sheet">
                    <div className="modal-content">
                        <div className='row'>
                            <div className='col offset-l1 l11 offset-m1 m11 s12'>
                                <h5>Create a new Wishlist</h5>
                                {this.props.error ? <b className='red-text'>this.props.error</b> : null}
                                <div className='row'>
                                    <div className='col l6 m8 s12'>
                                        <form onSubmit={this.props.createHandler}>
                                            <div className='row'>
                                                <div className='input-field'>
                                                    <input id="title" type="text" name='title' autofocus required />
                                                    <label htmlFor="title">Title</label>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="switch">
                                                    <label>
                                                        Public
                                                        <input name='privacy' type="checkbox" />
                                                        <span className="lever"></span>
                                                        Private
                                                    </label>
                                              </div>
                                            </div>
                                            <button type='submit' className='waves-effect waves-light btn'>Create Wishlist</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
