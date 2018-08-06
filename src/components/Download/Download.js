import React, {Component} from 'react';

import './download.css';

class Download extends Component {

    handleDownloadBtnClick = (e) => {
        e.preventDefault();
        console.log('dl clicked: ', e);
    }
    render() {
        const {priceSheetTitle} = this.props;
        return(
            <section className="col-sm-4 download-section">
                <header><h2>Download Price Sheet</h2></header>
                <div className="download-section-content">
                    <button className="download-btn" onClick={this.handleDownloadBtnClick}>
                        <span className="go-left">
                            <i className="fas fa-download"></i>
                        </span> 
                        <span className="go-right">Download</span>
                    </button>
                    
                </div>
                <p>{priceSheetTitle ? priceSheetTitle : 'Name of Price Sheet'}</p>
            </section>)
    }
}

export default Download;