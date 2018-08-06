let myHeaders = new Headers();


export const postCorsResObj = { method: 'POST',
                     header:myHeaders,
                     mode: 'cors',
                     cache: 'default'
};
export const getJSONResObj = { 
    method: 'GET',
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    }
};