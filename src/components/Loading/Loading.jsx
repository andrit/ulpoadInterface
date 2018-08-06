import React, {Component} from 'react';
import bouncingball from './bouncingball';
import anime from 'animejs';
import axios from 'axios';


import './loading.css';

const LoadingHeader = (props) => {
    return <h2 className="loading-boxes-header">{props.loadingStatus}</h2>
}
class Loading extends Component{
    constructor(props){
        super(props);
        this.state={
            loadingStatus: 'Please wait while we organize the data...',
        }

        //this.ajaxurl = "http://localhost/bulkpricing/uploadpricesheet";
        this.ajaxurl = "https://as400pcr.pcrichard.com:1082/php/bulkpricing/uploadpricesheet";
    }

    componentDidMount() {
        axios.post(this.ajaxurl, {
            file: this.props.uploadedFile,      
            ignoreinvalid: this.props.ignoreinvalid,
            skipoqf: this.props.skipoqf,
          },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
         .then(res=>{
             //console.log('file: ', file[0]);
             console.log('resdata: ', res.data);
           })
         .catch(error => {
             console.log('axios error: ', error.response);
           }
         )
        anime({
            targets: '.box',
            translateX: '53.5rem',
            scale: [.75, .9],
            delay: function(el, index) {
              return index * 360;
            },
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuart'
          });
          anime({
            targets: '.box-right',
            translateX: '53.5rem',
            scale: [.75, .9],
            delay: function(el, index) {
              return index * 270;
            },
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutQuart',
            elasticity: function(el, i, l) {
                return (200 + i * 200);
              }
          });
    }
    
    render(){
        return(
            <React.Fragment>
               <LoadingHeader loadingStatus={this.state.loadingStatus} />
                <div className="boxes-wrapper">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
                <div className="boxes-wrapper-right">
                    <div className="box-right"></div>
                    <div className="box-right"></div>
                    <div className="box-right"></div>
                </div>
            </React.Fragment>
           

        )
    }
}

export default Loading;