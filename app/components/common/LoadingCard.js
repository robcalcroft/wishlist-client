import React from 'react';
import Spinner from './Spinner';

export default class LoadingCard extends React.Component {
    render() {
        return (
            <div className='center'>
                <div className='card'>
                    <div className='card-content'>
                        <Spinner />
                    </div>
                </div>
            </div>
        );
    }
}
