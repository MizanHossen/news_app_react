
import './App.css'
import React, { useState } from 'react'
import NavBar from './components/NavBar'
import NewsComponent from './components/News'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




const App = () => {

  const [progress, setProgress] = useState(0);

  //   state = {
  //     progress: 0,
  //   }

  //  const  setProgress = (progresss) => {
  //     this.setState({ progress: progresss })
  //   }
  return (

    <Router>
      <NavBar />
      <LoadingBar
        color='#f11946'
        progress={progress}
      // onLoaderFinished={() => setProgress(0)}
      />

      <div className="container my-3">
        <Routes>
          <Route
            path="/"
            element={<NewsComponent setProgress={setProgress} key="general" pageSize={8} category={"general"} />}
          />

          <Route
            path="/home"
            element={<NewsComponent setProgress={setProgress} key="general" pageSize={8} category={"general"} />}
          />
          <Route
            path="/business"
            element={<NewsComponent setProgress={setProgress} key="business" pageSize={8} category={"business"} />}
          />

          <Route
            path="/entertainment"
            element={<NewsComponent setProgress={setProgress} key="entertainment" pageSize={8} category={"entertainment"} />}
          />

          <Route
            path="/health"
            element={<NewsComponent setProgress={setProgress} key="health" pageSize={8} category={"health"} />}
          />

          <Route
            path="/science"
            element={<NewsComponent setProgress={setProgress} key="science" pageSize={8} category={"science"} />}
          />

          <Route
            path="/sports"
            element={<NewsComponent setProgress={setProgress} key="sports" pageSize={8} category={"sports"} />}
          />

          <Route
            path="/technology"
            element={<NewsComponent setProgress={setProgress} key="technology" pageSize={8} category={"technology"} />}
          />

        </Routes>
      </div>
    </Router>

    // <div>
    //   <NavBar />
    //   <NewsComponent  setProgress={this.setProgress} pageSize={7} category={"sport"} />
    // </div>
  )

}

export default App

