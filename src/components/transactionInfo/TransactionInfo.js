import React, {Component} from 'react';

import './transactioninfo.css';
/*how many rows found
how many unique models found
how many (and listing of each) zones found and # of models in each - zone description in PCRZDP
possibly the listing of manufacturer name and how many models of each found*/

class TransactionInfo extends Component{
    render() {
        const {rowsfound, uniquemodelsfound, zonesfound, zonesarray, manufacturersfound, manufacturersarray} = this.props;
        return(
            <section className="row transaction-info">
            <header><h2>Information About Your Upload</h2></header>
            <div className="transaction-info-content">
                <div className="info-wrap-content">
                    <p>Rows Found: <span>{rowsfound ? rowsfound + ' rows found' : 'No Rows Found'}</span></p>
                </div> 
                <div className="info-wrap-content">
                    <p>Unique Models Found: <span>{uniquemodelsfound ? uniquemodelsfound + ' UM found' : 'No Unique Models Found'}</span></p>
                </div> 
                <div className="info-wrap-content">
                    <p>Zones Found: <span>{zonesfound ? zonesfound + ' zones found' : 'No Zones Found'}</span></p>
                    <ul>
                        {zonesarray.length > 0 
                            ? zonesarray.map((zone, i) => {
                                return <li key={i}>{zone.name}: {zone.numofmodels}</li>
                            })
                            : 'No Zones Found'}
                    </ul>
                </div> 
                <div className="info-wrap-content">
                    <p>Manufacturers Found: <span>{manufacturersfound ? manufacturersfound + ' manufacturers found' : 'No Manufacturers Found'}</span></p>
                    <ul>
                        {manufacturersarray.length > 0 
                            ? manufacturersarray.map((mfg, i) => {
                                return <li key={i}>{mfg.name}: {mfg.numofmodels}</li>
                            }) 
                            : 'No Manufacturers Found'}
                    </ul>
                </div> 
               
                
                

            </div>
            </section>
        )
    }
}

export default TransactionInfo;
