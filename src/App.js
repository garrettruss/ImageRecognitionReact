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