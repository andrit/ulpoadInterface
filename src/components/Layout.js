import React from 'react';
import './layout.css';

export const Layout = (props) => {
    return(
        <React.Fragment>
        <header className="top-header">
            <div className="inner-header">
                <img className="brand-logo" src="/bulkpricing/app/ui/build/assets/img/pcrLogo.png" alt="PC Richard & Son" />
                <p>Hello, <span className="name-prop">{props.buyerName}</span>. Please Upload your Price Sheet in the interface below</p>
            </div>
        </header>
        <div className="container">
        
        {props.children}
        </div>
        </React.Fragment>
    )
}