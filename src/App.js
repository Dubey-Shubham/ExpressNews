import './App.css';
import NavBar from './components/NavBar';
import React, {useState} from 'react'
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";

const App =()=> {
  const pageSize=15;
  const apiKey= process.env.REACT_APP_NEWSAPP_API

  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
         <NavBar/>
         <LoadingBar                        // component use kiya aur color height progress set krdi
           color='#f11946'
           height={3}
           progress={progress}        //progress
         />
         {/* <News setProgress={setProgress} pageSize={pageSize}  country="de" category="science"/> */}
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize}  country="in" category="general"/>} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize}  country="in" category="entertainment"/>} />
            <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize}  country="in" category="general"/>} />
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize}  country="in" category="health"/>} />
            <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize}  country="in" category="science"/>} />
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize}  country="in" category="sports"/>} />
            <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize}  country="in" category="technology"/>} />   
          </Routes>
        </Router>
        {/* multiple router use kiye so that page to page route kar sakein
            exact use kare so that routing sahi ho
            key use ki so that route krte hi naya page load ho
            category href se connect karega */}
      </div>
    )
  }

   export default App;