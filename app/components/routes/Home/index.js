import React from 'react';
import WishlistBase from '../../WishlistBase';
import Container from '../../common/Container';

export default class Home extends WishlistBase {
    constructor() {
        super();
    }

    render() {
        return (
            <Container username={localStorage.getItem('username')}>
                Hello there
            </Container>
        );
    }
}
