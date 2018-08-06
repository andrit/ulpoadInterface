import React, { Component } from 'react';
import axios from 'axios';

import './table.css';
/*role: grid

aria-label: grid

role row*/

import {loadJsonLocal} from '../../utils/fetchItems';
import {getJSONResObj} from '../../utils/ajaxRoutes';

import {InlineData} from './data';

const TableHeaders = [
    "PCR Model",
    "UPC (if no model)",
    "Value",
    "NLP",
    "Salesman",
    "Invoice",
    "Map",	
    "L1",	
    "L1pay",	
    "L2",	
    "L2 Pay",	
    "L3",	
    "L3 Pay",
];




class Table extends Component{

    state={
        uploadedFileContents: InlineData
    }

   /* componentDidMount (){
 
            const ajaxurl = "./data/data.json";
           
            axios.get(ajaxurl)
                .then((res) => {

                        //var nodes = JSON.parse(res);
                        var nodes = res.data;

                        var nodesArray = Object.keys(nodes).map(function(k) { return nodes[k] });
                        console.log('axios nodesArray: ', nodesArray);
                        console.log('axios nodes: ', nodes);
                        console.log('axios nodes type: ', typeof(nodes));
                        //should concat the state, keeping past state
                        this.setState({
                            uploadedFileContents: nodes
                          })
                        
                
                })
                .catch(function(error){
                    console.log(error);
                });
             
    }*/
    render(){
        //const { uploadedFileContents} = this.state;
        return(
            <section className="table-section row">
                <header><h2>Your Uploaded Data</h2></header>

                <div className="table-wrap">
                <div className=" table-headers-row" role="grid">
                
                {TableHeaders.map((header, i) => {
                    return(
                        <div className="table-header" key={i} id={header}>
                            {header}
                        </div>
                    )
                })}
            </div>
            <div className=" table-fields-row" role="grid">
                {this.state.uploadedFileContents.map((field, i) => {
                    return(
                        <div className="table-row" key={i} >
                            <div className="table-field">{field.model}</div>
                            <div className="table-field">{field.upc}</div>
                            <div className="table-field">{field.value}</div>
                            <div className="table-field">{field.nlp}</div>
                            <div className="table-field">{field.salesman}</div>
                            <div className="table-field">{field.invoice}</div>
                            <div className="table-field">{field.map}</div>
                            <div className="table-field">{field.l1}</div>
                            <div className="table-field">{field.l1pay}</div>
                            <div className="table-field">{field.l2}</div>
                            <div className="table-field">{field.l2pay}</div>
                            <div className="table-field">{field.l3}</div>
                            <div className="table-field">{field.l3pay}</div>
                        </div>
                    )
                })}
            </div>
            
                </div>
                
            </section>
    )
    }
}
export default Table;