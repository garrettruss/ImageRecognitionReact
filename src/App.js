import React, { useState, useRef, useReducer } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from '@tensorflow/tfjs';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import "./App.css";

const machine = {
  start: "start",
  states: {
    start: { on: { subsequent: "preparingModel" } },
    preparingModel: { on: { subsequent: "modelPrepared" } },
    modelPrepared: { on: { subsequent: "imageSet" }, showBrief: true },
    imageSet: { on: { subsequent: "analyzing" }, showImage: true, showCongrats: true },
    analyzing: { on: { subsequent: "complete" } },
    complete: { on: { subsequent: "modelPrepared" }, showImage: true, showResults: true }
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
    machine.states[state].on[event] || machine.start;

  const [appState, dispatch] = useReducer(reducer, machine.start);

  const subsequent = () => dispatch("subsequent");

  const getModel = async () => {
    subsequent();
    const model = await mobilenet.load();
    setModel(model);
    subsequent();
  };

  const identify = async () => {
    subsequent();
    const results = await model.classify(imageRef.current);
    setResults(results);
    subsequent();
  };

  const reset = async () => {
    setResults([]);
    subsequent();
  };

  const upload = () => inputRef.current.click();

  const handleUpload = event => {
    const { files } = event.target;
    if (files.length > 0) {
      const url = URL.createObjectURL(event.target.files[0]);
      setImageURL(url);
      subsequent();
    }
  };

  const moverButton = {
    start: { action: getModel, text: "Greetings, Click Here To Load The Model"},
    preparingModel: { text: "Preparing Model For Use" },
    modelPrepared: { action: upload, text: "Click To Add Image" },
    imageSet: { action: identify, text: "Click To Identify Content Of Image" },
    analyzing: { text: "Analyzing Image..." },
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
                "Can machines do what we (as thinking entities) can do?" - Alan Turing, Computing Machinery and Intelligence. 1950.
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