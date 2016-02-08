import React from 'react';
import md5 from 'md5';
import moment from 'moment';
import ProfilePicture from './ProfilePicture';

export default class UserProfileCard extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-image">
                    <ProfilePicture emailAddress={this.props.user.emailAddress} />
                    <span className="card-title">{`${this.props.user.firstName} ${this.props.user.lastName}`}</span>
                </div>
                <div className="card-content">
                    <h5>{this.props.user.username}</h5>
                    <div className='divider'></div>
                    <br />
                    {this.props.user.username === localStorage.getItem('username') ? <p><i className='material-icons'>perm_identity</i> <span className='text-left-of-icon'>You</span></p>: ''}
                    {this.props.user.emailAddress ? <p><i className='material-icons'>email</i> <span className='text-left-of-icon'>{this.props.user.emailAddress}</span></p> : ''}
                    <p><i className='material-icons'>schedule</i> <span className='text-left-of-icon'>Joined on {moment(this.props.user.dateCreated).format('DD/MM/YYYY')}</span></p>
                </div>
            </div>
        );
    }
}
