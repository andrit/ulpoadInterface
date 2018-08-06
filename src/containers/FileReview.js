import React from 'react';

//connect this...method and data actions
class FileReview extends React.Component{
    render() {
        return(
            <div className="file-review-wrap">
                {this.props.children}
            </div>
        )
    }
}

export default FileReview;