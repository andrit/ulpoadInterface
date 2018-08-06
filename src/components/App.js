import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import {Layout} from './Layout';
import SheetUpload from './sheetUpload';
import Loading from './Loading';
import FileReview from '../containers/FileReview';
import TransactionInfo from './transactionInfo';
import Table from './Table';
import Download from './Download';

import SetShedule from './setSchedule';


import {loadJsonLocal, loadJsonHttp} from '../utils/fetchItems';
import {getJSONResObj, postCorsResObj} from '../utils/ajaxRoutes';
import {getBase64} from '../utils/utils';

const zonesfoundarray = [
  {name: 'something', numofmodels: 7},
  {name: 'internet', numofmodels: 7},
  {name: 'cellphone', numofmodels: 7},
  {name: 'yoda', numofmodels: 7},
  {name: 'redux', numofmodels: 7},
  {name: 'react', numofmodels: 7},
];
const mfgfoundarray = [
  {name: 'scrolling', numofmodels: 8},
  {name: 'egghead', numofmodels: 8},
  {name: 'portals', numofmodels: 8},
  {name: 'avatar', numofmodels: 8},
  {name: 'css ninja', numofmodels: 8},
  {name: 'brightidea', numofmodels: 8},
  {name: 'spa chemistry', numofmodels: 8},
];
class App extends Component {
  //add to local storage for persistence
  constructor(props){
    super(props);
    this.state = {
        buyerName: 'Mark Cuban',
        ignoreinvalid: false,
        skipoqf: false,
        fileUploaded: false,
        fileUploading: localStorage.getItem("fileUploading") || false,
        uploadedFile: null,
        uploadedFileContents: [],
        rowsfound: 20,
        uniquemodelsfound: 10,
        zonesfound: zonesfoundarray.length,
        zonesarray: zonesfoundarray || [], 
        manufacturersfound: mfgfoundarray.length, 
        manufacturersarray: mfgfoundarray || [],
        uploadErr: false
    };
   
   // this.upfile = this.state.uploadedFile; 
    //this.fileToUpload = this.upfile !== null ? getBase64(this.upfile[0]) : null;
  }
  
  /*
   handleGetBackData = () => {
    const ajaxurl = "./data/data.json";
   
    loadJsonLocal(ajaxurl, getJSONResObj)
      .then(data => {
        console.log('ajax data: ', data);
        this.setState({
          uploadedFileContents: data
        })
      })
      .then(
        this.setState({
          fileUploaded: true
        })
      )
      .catch((err) => {
        console.log("Error in Fetch:", err);
      })
  }
  */
 
  updateFile = (file) => {
    return new Promise((resolve, reject) => {
      try{
       // console.log('in updateFile');
        this.setState({
          uploadedFile: file,
        })

        
      }
      catch(e){
        reject(e);
      }
    }); 
  };

  removeErr = () => {
    this.setState({
      uploadErr: false
    })
  }

    //ui calls this, this runs the function pull data into data state (need jwt?)
  handleFileSend = (file) => {
    if(file){
        this.updateFile(file)
      .then(
        localStorage.setItem("uploadedFile", file)
      )
      .then(
        localStorage.setItem("fileUploading", "true")
      )
      .then(
        this.setState({
          fileUploading: true,  
        })
          
      )
    } else {
      this.setState({
        uploadErr: true
      })
         return;
    }
    
    };

  render() {
    return (
      <Layout buyerName={this.state.buyerName}>
      {this.state.fileUploaded 
      ? <FileReview>
          <TransactionInfo 
            rowsfound={this.state.rowsfound} 
            uniquemodelsfound={this.state.uniquemodelsfound} 
            zonesfound={this.state.zonesfound} 
            zonesarray={this.state.zonesarray} 
            manufacturersfound={this.state.manufacturersfound} 
            manufacturersarray={this.state.manufacturersarray} />
          
          <Table uploadedFileContents={this.state.uploadedFileContents} />
          <div className="row">
            <SetShedule />
            <Download />
            
          </div>
        </FileReview>
      : this.state.fileUploading 
        ? <Loading 
            loadingStatus={this.state.loadingStatus}
            ignoreinvalid={this.state.ignoreinvalid} 
            skipoqf={this.state.skipoqf}
            uploadedFile={this.state.uploadedFile} /> 
        : <SheetUpload 
            handleFileSend={this.handleFileSend} 
            ignoreinvalid={this.state.ignoreinvalid} 
            skipoqf={this.state.skipoqf}
            uploadErr={this.state.uploadErr}
            removeErr={this.removeErr}  />
      }    
        
      </Layout>
    );
  }
}

export default App;
