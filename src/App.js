
/*
Sources:
https://www.npmjs.com/package/@tensorflow-models/mobilenet
https://www.tensorflow.org/lite/examples/image_classification/overview
https://www.tensorflow.org/js/tutorials
https://www.tensorflow.org/js/guide
https://github.com/tensorflow/tfjs-examples/tree/master/mobilenet 
https://reactjs.org/docs/state-an
https://dmitripavlutin.com/react-useref-guide/
https://levelup.gitconnected.com/build-ad-dog-classifier-with-react-and-tensorflow-js-in-minutes-f08e98608a65
https://reactjs.org/docs/hooks-reference.html
https://reactjs.org/docs/getting-started.html
https://mastery.games/post/state-machines-in-react/
https://css-tricks.com/understanding-how-reducers-are-used-in-redux/
https://css-tricks.com/finite-state-machines-with-react/
https://js.tensorflow.org/api/latest/#setBackend

TensorFlow.js is a JavaScript library developed by Google for training and using machine learning (ML) models in the browser. It contains pretrained models that can be imported into an application without having to train the model yourself. TensorFlow.js allows you to run AI models on the frontend without setting up a server or database. Tensors are the core datastructure of TensorFlow.js They are a generalization of vectors and matrices to potentially higher dimensions.

In Machine Learning, 

//State Machine controls what state to transition to next. Below are the states to cycle through. Now can add properties to each state to access. Indicates what UI to show. Saves us boolean logic by specifying rules out here. 

React Hooks

Allows you to load a machine learning model into memory. Then upload a image. Model will anaylze image for 999 known classifications. 

create react app 
mobilenet (tensorflow model for image classification)
tensorflow.js 

image input is invisible to user but visible to DOM with z-index: -1;

Reducer takes current state and an event, then return a new state based on whatever that event was fired. Ex. in initial state, call next event, with reducer, causes app to go to next state which is loadingModel. Because returns object with On: value of event key (next) then returns next state. 

Use of different states showing different UI with State Machine. Better alternative than Booleans or If/Else. 

Finite state machine. Your app can only occupy one state at a time and you have to use events to trigger transition between states. Each state you define what will happen next.

state machine object is where you specify different states. 

The loading of the model and classifying/identifying the predictions are both asynchronous events. We therefore have intermediary states to show the user that they are waiting until the results of the model is ready.  


Each state has rules for how they transition to the next state. There is only one type of event called next. 

Here there is only one type of event. The event called next. 

Whenever next event is triggered, it brings you to the next step.  On object specifies all events that could transition to but there is only one event next. 

When you hit reset you go back to the model ready because the model has already loaded. 







Reducer function adds the functionality to wire the states together and allow the transition to happen.. Like Redux.

Reducer takes the current state and an event, then returns a new state based on whatever that event was. 

With reducer in initial state, someone fires next event, next event with reducer causes the app to be in a new state.  



The reducer returns a new state based on whatever event is called and the current state. 

Ex. in intial state, someone calls next event, reducer returns value of he reducer returns statemachine.states.currentstates.on.event or statemachine.initial. (returns value of event key (loading model which returns the enext state. 


useReducer, put hook into component in order to get dispatch and current state. 

useReducer takes 2 arguments reducer function and your intital state. State is a string that represents whatever state you are in now. Dispatch is a function that will allow you to fire an event into the reducer function in order to get a new state. 

put hook into component with use reducer in order to get dispatch and current state. 
states 

useReducer takes reducer function and initial state. State is a string that represents whatever state you are in now. Dispatch is a function that fires an event in reducer to get a new state

onClick you fire off the next event in the dispatch. 

Now we can add properties to each of the states to access and indicate what UI to show. Ex. the image element only shows once the image has been uploaded and when the classification was complete. showImage:true property. Show's Image. 

Button - Needs to show different text and perform different functions depending on what state it is in. 

Button onClick Dispatch next state shows us different states and functions depending on what state we are in  and what we comes up next 

Make oject to control this. 

buttonProps - specifies what needs to be shown on the button at any given state and what the button needs to do at any given state. Takes in the states as objects. Each state takes in two properties: text, and action (function). Shows the text, and action. 

Duplicate buttonprops to make new states. 



import mobilnet

make a async function to load the model. (from docs)


Need to store the model somewhere. use useState to store model. 

loadModel 
mobilenetmodel = await mobilenet.load. store the model to the state here. Also need to transition to next state. 

loadmodel is the action of the intial state. 


input not visible on ui. Use click event to trigger upload.  

capture camera allows someone to take a picture to scan it again the model. 

useRef to make reference for input




handleUpload takes an event,
pulls out files from the event. If array of files is greater than 0, take the first one, and only the first one. We only want to process one file a time. 

call url.createObjectURL from index 0 in the array. make state for imageURL = useState null. 
const url = above 
setimageurl = url  (save in state)
then need to call next to get to next state. 


need to show img with imageurl in img tag. 

classify function need to pass in an element. Do so with a ref. 

Use useRef with imageRef 

refer to state machine. Show images on certain states. 

const { showImage }  = statemachine.states(state) - makes show image equal to that current state. 


return show image and image source. Wont see anything until it is uploaded. 

acess the 

on awaiting upload you acess it via inputref



now the machine learning classification process

TensorFlow.js is an open-source JavaScript library that allows users to define, train, and run machine learning models using the api. The model included below is an image classification model which is trained to recognize various classes of images.



all you need to do is call model.classify. function identify. 

results = await model.classify( pass in imageRef.current ) 
you call next before and after the results. Remember to use useState and initialize to empty to array. 


make a formatresults function to pull out className and probability and return a LI with key that contains a string of the className and probability as a percentage. Convert the float to percentage. 

map results in ul. Only show results on last page via showResults which we access with other state specific properties. Only show that element on the last state. 


lastly you want to reset. Make a reset function. reset = setResults  to empty array, set image url to null, and call next to bring the next state. 

then deploy to Heroku. 

go to mobilenet sourcecode imagenet classes lists out all the objects and animals it can recognize. 

problem solving - 

//tf.setBackend("cpu");
tf.setBackend (backendName) functionsource
Sets the backend (cpu, webgl, wasm, etc) responsible for creating tensors and executing operations on those tensors. Returns a promise that resolves to a boolean if the backend initialization was successful.

*/

import React, { useState, useRef, useReducer } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import "./App.css";

const machine = {
  initial: "initial",
  states: {
    initial: { on: { next: "loadingModel" } },
    loadingModel: { on: { next: "modelReady" } },
    modelReady: { on: { next: "imageReady" }, showBrief: true },
    imageReady: { on: { next: "identifying" }, showImage: true, showCongrats: true },
    identifying: { on: { next: "complete" } },
    complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
  }
};

function App() {

  tf.setBackend('cpu');

  const [results, setResults] = useState([]);
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

  const moverButton = {
    initial: { action: loadModel, text: "Greetings, Click Here To Load The Model"},
    loadingModel: { text: "Preparing Model For Use" },
    modelReady: { action: upload, text: "Click To Upload Image" },
    imageReady: { action: identify, text: "Click To Identify Content Of Image" },
    identifying: { text: "Identifying..." },
    complete: { action: reset, text: "Reset" }
  };

  const { showBrief, showCongrats, showImage, showResults } = machine.states[appState];

  return (
    <>
        <Header />

            {showBrief && (
              <>
              <p className="model-ready">
                Are you ready?
              </p>
              </>
            )} 
        
        <main>

            {showImage && <img src={imageURL} alt="upload-preview" ref={imageRef} />}

              <input
                type="file"
                accept="image/*"
                capture="camera"
                onChange={handleUpload}
                ref={inputRef}
              />

              {showCongrats && (
              <>
              <div>
                This is exciting!
              </div>
              </>
            )} 

              {showResults && (

                <> 
                  <h2>Image result predictions:</h2>
                   < >
                    {results.map(({ className, probability }) => (
                      <div key={className}>
                        {`Our model believes it is a ${className} with ${(probability * 100).toFixed(2)}% certainty`}
                      </div>
                    ))}
                   </>
                   <Welcome />
                </>
             
              )}

               {showBrief && (
              <>
              <p>The Model is now ready for your use. If you are on a mobile device, when you click upload image to model, your camera will open and you can take a picture. If you are on a desktop, your folders should open allowing you to add a picture from your computer.</p>
              </>
            )}  

              <button onClick={moverButton[appState].action || (() => {})}>
                {moverButton[appState].text}
              </button>

              
        </main>
        
        <Footer />
    </>     
   
  );
}

export default App;