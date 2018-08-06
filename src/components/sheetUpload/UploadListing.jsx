import React, {Component} from 'react';


class UploadListing extends Component{
    removeFileItem= () => {}
    render(){
        const {fileData, removeFileItem} = this.props;
        return (
            <React.Fragment>
                { 
            //Unexpected token, expected ,..?
            fileData.map(f => {
                    return(
                     <div key={f.name} className="col-xs-12">
                         <div className="col-xs-11">
                            <p><strong>{f.name}</strong> - {f.size} bytes - {f.type} type</p>
                            <label htmlFor="ignore-bad" className="col-xs-6">Ignore Invalid Models: <input type="checkbox" name="ignore-bad" /></label>
                            <label htmlFor="skip-oqf" className="col-xs-6">Skip Oppy/Quit/Frozen: <input type="checkbox" name="skip-oqf" /></label>
                         </div>
                         <div onClick={removeFileItem} className="col-xs-1 remove-list-item center-text">
                            <p className="fas fa-times"><br/>Remove</p>
                            <p></p>
                         </div>
                     </div>
                    )    
             })
             }
            </React.Fragment>
        )
    }
}

export default UploadListing;