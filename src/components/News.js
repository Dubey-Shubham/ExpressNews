import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from '../Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    
  capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  constructor(props){                       //class me ham aise hi constructer banake hi state set krte hain
    super(props);
    this.state = {                              //yahan hamne state banayi aur hamari state me bas article hai
      articles: [],        // state change krke article bhi change kar sakte hain
      loading: false,               //jab bhi koi chiz load hogi ham true dikha denge
      page:1,
      totalResults: 0     //by default ye value 0 hai srticles jo api se a rhe unki
      
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- ExpressNews`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});     //click hote hi true
    let data = await fetch(url);       //async functions will wait for its promises to resolve,mtlb jabtak await run nhi hoga agla nhi chalega, yahan url ka data data variable me fetch ho rha hai
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({articles: parsedData.articles, 
      totalResults: parsedData.totalResults, //state ko ham api se liye hue articles se change krte rahenge
      loading: false     //initially loading false hai 
    })  
    this.props.setProgress(100);
  }

  async componentDidMount(){                  //it is a lifecycle method, ye render k baad run hoga
    this.updateNews();
  }

  Handlepreviousclick = async ()=>{
   this.setState({page: this.state.page -1});
   this.updateNews();
  }
 
  HandleNextclick = async ()=>{ 
   this.setState({page: this.state.page +1});
   this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page +1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page${this.state.page}&pageSize=${this.props.pageSize}`;
    //this.setState({loading: true});     //click hote hi true
    let data = await fetch(url);       //async functions will wait for its promises to resolve,mtlb jabtak await run nhi hoga agla nhi chalega, yahan url ka data data variable me fetch ho rha hai
    let parsedData = await data.json()
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults, //state ko ham api se liye hue articles se change krte rahenge
      // loading: false     //initially loading false hai
    }) 
  };


  render() {
    return (
      <>
        <h1 className= "text-center">Express News - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
         {this.state.loading && <Spinner/>}   {/*agar this.state.loading true hai tabhi spinner component dikhega */}
        <InfiniteScroll
          dataLength={this.state.articles.length}   /*npmjs.com se react scroll component copy kar lia aur this.state .loading spinner ki jagah laga diya */
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
          >

          <div className="container">
        
        <div className="row">
          {this.state.articles?.map((element)=>{     //agar loading component nhi hai tabhi sirf articles show honge otherwise nahi honge
           return <div className="col-md-4" key={element.url}>
           <NewsItem title={element.title?element.title.slice(0, 35):""} description={element.description?element.description.slice(0, 85):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>  {/*jo news me props the the unko text de diya yexy k alawa upar jo array hai uska detail bhi render kara diya*/}
           {/* above we use conditional where if title exist then slice if it does not just put blank similarly for dscription */}
           </div>
          })}
          
          {/* kuch cheeze jo samajh nhi a rhi wo js concept hain */}
        </div>
        </div>
        </InfiniteScroll>
      </>
    )
  }
}

export default News
