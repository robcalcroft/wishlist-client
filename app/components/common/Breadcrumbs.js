import React from 'react';

export default class Breadcrumbs extends React.Component {

    processBreadcrumbs(breadcrumbs) {
        let key = 0;
        return breadcrumbs.map(breadcrumb => {
            return <a key={key++} href={breadcrumb.href} className='breadcrumb'>{breadcrumb.text}</a>;
        });
    }

    render() {
        return (
            <nav style={{marginTop: '5vh'}}>
                <div className="nav-wrapper">
                    <div className="col s12" style={{paddingLeft: '20px'}}>
                        {this.processBreadcrumbs(this.props.breadcrumbs)}
                    </div>
                </div>
            </nav>
        );
    }
}
