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
        salesmanName: 'Mark Cuban',
        salesmanNumber: 0,
        ignoreinvalid: '0', //used to be false 8/12
        skipoqf: '0',
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
        uploadErr: false,
        sheetProcessStatus: 'none',
    };
   this.pollStatusUrl = 'https://as400pcr.pcrichard.com:1082/php/bulkpricing/pollpricesheetstatus';
  }

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
  }

  removeErr = () => {
    this.setState({
      uploadErr: false
    })
  }

  updateSalesmanNumber = (salesmanNumber) => {
    this.setState({ salesmanNumber: salesmanNumber})
  }

  runPoll = (salesman) => {
    return axios.post(this.pollStatusUrl, {salesmannumber: salesman})
    .then( res => {
        // let status = res.status ?  res.status : 'none';  
        let status = res.status;  
        this.setState({
          sheetProcessStatus: status
        })
      }
    ).catch(error => {
      console.log('polling error: ', error.response);
    }
  )
  }

  handleLongPoll = () => {
    //if status == null
    let salesmannumber = this.state.salesmanNumber;   
    setInterval( this.runPoll(salesmannumber), 5000 );
}




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
      <Layout salesmanName={this.state.salesmanName}>
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
            uploadedFile={this.state.uploadedFile}
            updateSalesmanNumber={this.updateSalesmanNumber}
            handleLongPoll={this.handleLongPoll} /> 
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
