import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from '../Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)  
  
  const capitalizeFirstLetter =(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);   //first alphabet ko capitalize krne k liye
  }
  
  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page${page}&pageSize=${props.pageSize}`;
    setLoading({loading: true});     //click hote hi true
    let data = await fetch(url);       //async functions will wait for its promises to resolve,mtlb jabtak await run nhi hoga agla nhi chalega, yahan url ka data data variable me fetch ho rha hai
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)}- ExpressNews`;
    updateNews();    //yahan neeche enpty array k change hone par effect run hoga 
  }, [])

  // const Handlepreviousclick = async ()=>{
  //  setpage(page+1)
  //  updateNews();
  // }
 
  // const HandleNextclick = async ()=>{ 
  //  setpage(page+1)
  //  updateNews();
  // }

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page+1)     //state change kari page ki, yahan hamne ye link k baad kia hai kyuki isme thoda time lagta hai
    let data = await fetch(url);       //async functions will wait for its promises to resolve,mtlb jabtak await run nhi hoga agla nhi chalega, yahan url ka data data variable me fetch ho rha hai
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };



    return (
      <>
        <h1 className= "text-center" style={{margin: '35px 0px', marginTop:'90px'}}>Express News - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
         {loading && <Spinner/>}   {/*agar loading true hai tabhi spinner component dikhega */}
        <InfiniteScroll
          dataLength={articles.length}   /*npmjs.com se react scroll component copy kar lia aur loading spinner ki jagah laga diya */
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
          >

          <div className="container">
        
        <div className="row">
          {articles?.map((element)=>{     //agar loading component nhi hai tabhi sirf articles show honge otherwise nahi honge
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


export default News;
