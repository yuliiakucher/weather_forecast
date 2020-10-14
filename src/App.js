import React from 'react';
import './App.css';
import HomePage from "./components/HomePage/HomePage";
import {Route} from "react-router-dom";

function App() {
  return (
      <Route path='/' render={() => <HomePage/>}/>
  );
}

export default App;
