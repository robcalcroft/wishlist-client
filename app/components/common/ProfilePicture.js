import React from 'react';
import md5 from 'md5';

export default class ProfilePicture extends React.Component {
    render() {
        return (
            <img src={`http://www.gravatar.com/avatar/${md5(this.props.emailAddress)}?d=identicon&s=200`} alt='profile picture' />
        );
    }
}
