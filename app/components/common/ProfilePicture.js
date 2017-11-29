import React from 'react';
import md5 from 'md5';

export default class ProfilePicture extends React.Component {
    render() {
        if (!this.props.emailAddress) {
          return null;
        }
        return (
            <img className='circle responsive-img' src={`https://www.gravatar.com/avatar/${md5(this.props.emailAddress)}?d=mm&s=50`} alt='profile picture' />
        );
    }
}
