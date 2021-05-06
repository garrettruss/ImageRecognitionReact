# TensorFlow.js Image Classification React App

In this Single Page React App, users are introduced to Machine Learning. Users can take a picture or import an image to be analyzed by the TensorFlow.js Image Classification Mobilenet model. TensorFlow.js is a JavaScript library developed by Google for training and using machine learning (ML) models in the browser. It contains pretrained models that can be imported into an application without having to train the model yourself. In this format, users don't have to think about things such as Tensors, which are the core datastructure of TensorFlow.js.

In this example, a event-driven finite state machine, along with a reducer, control what state the app is in. The reducer function takes the current state and an event, then return a new state based on whatever that event was fired. Here there is only one type of event called next. Whenever the next event is triggered, it brings you to the next step. useReducer takes 2 arguments, the reducer function and your intital state. State is a string that represents whatever state you are in now. Dispatch is a function that will allow you to fire an event into the reducer function in order to get a new state. Through button onClick you fire off the next event in the dispatch.

Depending on what state you are in, different components will be displayed. This is done because loading of the model and classifying/identifying the predictions are both asynchronous events. We therefore have intermediary states to show the user that we are waiting on the model.

## Technologies Used

* HTML5
* CSS3
* Javascript
* React
* Tensorflow.js Library - Mobilenet Model
* Git/Github
* Heroku
* Trello

[Click here](https://tensorflow-react-app.herokuapp.com/) to see the app.
[Click here](https://trello.com/b/sGXQ43xi/capstone-project) to see the Trello board.

### Sources

* [https://www.npmjs.com/package/@tensorflow-models/mobilenet]
* [https://www.tensorflow.org/js/guide]
* [https://github.com/tensorflow/tfjs-examples/tree/master/mobilenet]
* [https://reactjs.org/docs/state-an]
* [https://dmitripavlutin.com/react-useref-guide/]
* [https://levelup.gitconnected.com/build-ad-dog-classifier-with-react-and-tensorflow-js-in-minutes-f08e98608a65]
* [https://reactjs.org/docs/hooks-reference.html]
* [https://mastery.games/post/state-machines-in-react/]
* [https://css-tricks.com/understanding-how-reducers-are-used-in-redux/]
* [https://css-tricks.com/finite-state-machines-with-react/]
* [https://js.tensorflow.org/api/latest/#setBackend]
* [https://github.com/typescript-cheatsheets/react]
* [https://en.wikipedia.org/wiki/Event-driven_finite-state_machine]
* [https://arxiv.org/abs/1704.04861]

#### Unsolved Issues

##### Future Enhancements
