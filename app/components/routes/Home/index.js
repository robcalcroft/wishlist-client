import React from 'react';
import WishlistBase from '../../WishlistBase';
import Container from '../../common/Container';

export default class Home extends WishlistBase {
    constructor() {
        super();
    }

    render() {
        return (
            <Container>
                Hello there
            </Container>
        );
    }
}
