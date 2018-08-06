import React, {Component} from 'react';
import './sheetupload.css';
import Dropzone from 'react-dropzone';
import UploadListing from './UploadListing';

class SheetUpload extends Component{
    constructor(props){
        super(props);
        this.state={
            uploadingFiles: [],
            FileToUpload: null,
            
        }
       // this.FileToUpload;
    }
    fileread = (files) => {
        var that = this;
        return new Promise((resolve, reject) => {
            try{
                 const reader = new FileReader();
                 if(files){
                     reader.readAsDataURL(files[0]);
                 }
     
                 reader.onloadend = function(){
                     that.setState({
                         FileToUpload: reader.result 
                     })
                 }
                 reader.onabort = () => console.log('file reading was aborted');
                 reader.onerror = () => console.log('file reading has failed');
            }
            catch(e){
                reject(e);
            }
         });
     }

    onDrop = (files) => {
           this.fileread(files)
           .then(
            this.props.removeErr()
           ).then(
               this.setState({
                    uploadingFiles : files   
                })

           )
           .catch(error => {
            console.log('file error: ', error.response);
          });
       
      }
      removeListItem = () =>{
        this.setState({
            uploadingFiles : [],
            FileToUpload: null   
        })
      }

      handleFileSend = (e) => {
          e.preventDefault();
         // console.log('sending file: ', this.state.FileToUpload);
         
          this.props.handleFileSend(this.state.FileToUpload);
      }
    render(){
        return(
            <section className="row upload-form-section">
                <header className="row">
                    <div className="col-sm-12 top-header">
                    <h1>Price Sheet Processing</h1>
                    
                    <a className="download-template" href="/assets/files/BulkPricingTemplate_V1.xlsx" download="Price Sheet Template">Pricing Template Download 
                                <i className="fas fa-download"></i>
                            </a>
                        
                    </div>
                    <div className="col-md-6 border-right">
                        <h3>File Upload</h3>
                    </div>
                    <div className="col-md-6">
                        <h3>Included Files</h3>
                    </div>
                </header>
               
                <div className="row">
                    <div className="dropzone-wrap col-md-5 col-md-offset-1">
                        <Dropzone 
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            className="dropzone-inner" 
                            name="file-dropzone"
                            onDrop={this.onDrop}>
                            <h4>Upload Files</h4>
                            <p><i className="fas fa-cloud-upload-alt"></i></p>
                            <h6>DRAG AND DROP</h6>
                            <h4>OR</h4>
                            <div className="upload-browse">BROWSE FILES</div>
                        </Dropzone>
                    </div>
                    <aside className="col-md-5">
                        <UploadListing fileData={this.state.uploadingFiles} removeFileItem={this.removeListItem} />
                    </aside>
                    <p className={this.props.uploadErr ? 'show-error' : 'hide-error'}>Please upload a file to review before continuing.</p>
                </div>
                <div className="btn-wrap row">
                
                    <button 
                        type="button" 
                        className="btn" 
                        onClick={this.handleFileSend}>Check your File For errors</button>
                </div>
            </section>
            
        )
    }
}

export default SheetUpload;