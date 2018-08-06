import axios from 'axios';

export const loadJsonHttp = (url, resObj) => {
    return fetch(url, resObj)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
            } else {
            return Promise.reject(new Error(response.statusText))
            }
        })
      .then(response => {
          console.log('response: ', response);
          console.log('responsejson: ', response.json());
          response.json();
          
        });
  }
export const loadJsonLocal = (url, resObj) => {
    return  axios.get(url)
                .then(function(res) {

                        var nodes;
                        nodes = res.data;

                        var nodesArray = Object.keys(nodes).map(function(k) { return nodes[k] });
                        console.log('axios nodeArray: ', nodesArray);
                        
                        return nodesArray;
                        
                
                })
                .catch(function(error){
                    console.log(error);
                });

  }


           