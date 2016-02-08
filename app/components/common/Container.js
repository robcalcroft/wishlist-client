import React from 'react';
import Nav from './Nav';

export default class Container extends React.Component {
    render() {
        return (
            <div className='inner-react-container'>
                {this.props.noNavBar ? null : <Nav username={this.props.username || false} />}
                <div className='container'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
