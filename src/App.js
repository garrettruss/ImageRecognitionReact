

//State Machine controls what state to transition to next. Below are the states to cycle through. Now can add properties to each state to access. Indicates what UI to show. Saves us boolean logic by specifying rules out here. 



/*
Reducer takes current state and an event, then return a new state based on whatever that event was fired. Ex. in initial state, call next event, with reducer, causes app to go to next state which is loadingModel. Because returns object with On: value of event key (next) then returns next state. 
*/


/*put hook into component with use reducer in order to get dispatch and current state. 
states 

useReducer takes reducer function and initial state. State is a string that represents whatever state you are in now. Dispatch is a function that fires an event in reducer to get a new state

*/

/* Button onClick Dispatch next state shows us different states and functions depending on what state we are in  and what we comes up next */ 

//tf.setBackend("cpu");

import React, { useState, useRef, useReducer } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
//import { auth } from "./services/firebase"; 
import "./App.css";

const machine = {
  initial: "initial",
  states: {
    initial: { on: { next: "loadingModel" } },
    loadingModel: { on: { next: "modelReady" } },
    modelReady: { on: { next: "imageReady" } },
    imageReady: { on: { next: "identifying" }, showImage: true },
    identifying: { on: { next: "complete" } },
    complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
  }
};

function App() {
  tf.setBackend("cpu");
  const [results, setResults] = useState([]);
  //const [welcomeState, setWelcomeState] = useState([]);
  const [imageURL, setImageURL] = useState(null);
  const [model, setModel] = useState(null);
  const imageRef = useRef();
  const inputRef = useRef();

  const reducer = (state, event) =>
    machine.states[state].on[event] || machine.initial;

  const [appState, dispatch] = useReducer(reducer, machine.initial);
  const next = () => dispatch("next");

  const loadModel = async () => {
    next();
    const model = await mobilenet.load();
    setModel(model);
    next();
  };

  const identify = async () => {
    next();
    const results = await model.classify(imageRef.current);
    setResults(results);
    next();
  };

  const reset = async () => {
    setResults([]);
    next();
  };

  const upload = () => inputRef.current.click();

  const handleUpload = event => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImageURL(url);
      next();
    }
  };

  const actionButton = {
    initial: { action: loadModel, text: "Load Model"},
    loadingModel: { text: "Loading Model..." },
    modelReady: { action: upload, text: "Upload Image" },
    imageReady: { action: identify, text: "Identify Content Of Image" },
    identifying: { text: "Identifying..." },
    complete: { action: reset, text: "Reset" }
  };

  const { showImage, showResults } = machine.states[appState];

  return (
    <>
        <Header />
        
        <main>    
            {showImage && <img src={imageURL} alt="upload-preview" ref={imageRef} />}
              <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleUpload}
                ref={inputRef}
              />
              {showResults && (
                <> 
                <div>Results
                   <ul >
                  {results.map(({ className, probability }) => (
                    <li key={className}>
                      {`${className}: %${(probability * 100).toFixed(2)}`}
                    </li>
                  ))}
                </ul>
                </div>
                </>
             
              )}
              <button onClick={actionButton[appState].action || (() => {})}>
                {actionButton[appState].text}
              </button>
  
        </main>
        
        <Welcome />
        <Footer />
    </>     
   
  );
}

export default App;