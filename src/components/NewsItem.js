import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl,newsUrl, author, date, source } = this.props;   //ye destructuring hai(js concept) this.props agar ek object hai to usme se title description mil jayega 
    return (
      // yahan poora card uske button picture wagera ka bootstrap design hai
      <div className="my-3">
       <div className="card" >
       <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1' }} >
            {source}
          </span>
       <img src={!imageUrl?"https://substackcdn.com/image/fetch/w_1200,h_600,c_limit,f_jpg,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F79fc15fc-6ea8-4426-acad-117e6c349ba0_922x876.png":imageUrl} className="card-img-top" alt="..."/>
       {/* agar image nhi hai to link ki image dikha do aur agar hai to image dikha  */}
       <div className="card-body">
       <h5 className="card-title">{title}... </h5>
       <p className="card-text">{description}...</p>
       <p className="card-text"> <small className="text muted">By {!author?"Unknown": author} on {new Date (date).toGMTString()}</small></p>
       <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
       </div>
</div> 
    {/* jo return ho rha hai ye ek component hai
        ise card ki help se banaya hai (bootstrap)
        title desc basic props diye hai iske alawa sample.json se author date wagera bhi dala hai
        ek button component bhi use kara hai iske alawa */}

      </div>
    )
  }
}

export default NewsItem