import React from 'react';
import moment from 'moment';
import ProfilePicture from './ProfilePicture';
import LoadingCard from './LoadingCard';

export default class UserProfileCard extends React.Component {
    render() {
        if(!Object.keys(this.props.user).length) {
            return (<LoadingCard />);
        }

        return (
            <div className='card'>
                <div className='card-content'>
                    <div style={{display: 'inline-block'}}>
                        <ProfilePicture emailAddress={this.props.user.emailAddress} />
                    </div>
                    <div style={{display: 'inline-block', verticalAlign: 'top', paddingLeft: '10px'}}>
                        <h5>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h5>
                    </div>
                    <div className='divider'></div>
                    <br />
                    {this.props.user.username === localStorage.getItem('username') ? <p><i className='material-icons'>perm_identity</i> <span className='text-left-of-icon'>@{this.props.user.username} <span className='grey-text text-lighten-1'>(You)</span></span></p>: <p><i className='material-icons'>perm_identity</i> <span className='text-left-of-icon'>@{this.props.user.username}</span></p>}
                    {this.props.user.emailAddress ? <p><i className='material-icons'>email</i> <span className='text-left-of-icon'>{this.props.user.emailAddress}</span></p> : ''}
                    <p><i className='material-icons'>schedule</i> <span className='text-left-of-icon'>Joined on {moment(this.props.user.dateCreated).format('DD/MM/YYYY')}</span></p>
                </div>
            </div>
        );
    }
}
