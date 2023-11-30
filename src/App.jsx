// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import View1 from './view1';
import View2 from './view2';
import View3 from './view3';
import View4 from './view4';
import {csv} from 'd3'



const App = () => {
  useEffect(() => {
    // csv('data.csv').then(csvData => {
    //   // setData(csvData);
    //   console.log(csvData)
    // });
  },[])
  return (
    <Router>
      <div>
      
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/view1" element={<View1 />} />
          <Route path="/view2" element={<View2 />} />
          <Route path="/view3" element={<View3 />} />
          <Route path="/view4" element={<View4/>} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;


