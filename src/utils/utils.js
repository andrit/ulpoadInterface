export const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
        console.log(reader.result);
        return reader.result;
    }; 
    reader.onerror = function(error) {
        console.log('Error with FileReader: ', error);
    };
};

export const longPollForHeaders = (status) => {
    //if status == null
    setInterval( () => {
        //async/await
        //no socket.io??
        //axios or fetch?
    }, 5000 )
}

//is this a HOC?
export const checkHeadersForStatus = (status) => {
    //check header status everytime app is open
    switch(status){
        case 'Q':
        //processing view
        //return value for component to app componet to set 
        break;
        case 'P':
        //processing view
        break;
        case 'C':
        //Review view
        break;
        case 'E':
        //Review view
        break;
        case 'S':
        //Upload view
        break;
        case 'X':
        //Upload view
        break;
        case 'norel':
        //upload view
        break;
        default:
        //upload view
        break;
    }
}