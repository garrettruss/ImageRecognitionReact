# TensorFlow.js Image Classification React App

In this application, users are able to take a picture or import an image to be analyzed by the TensorFlow.js image classification Mobilenet model which can recognize 1000 different animals and objects. TensorFlow.js is a JavaScript library developed by Google for training and using machine learning (ML) models in the browser. TensorFlow.js provides models such as Mobilenet that were pretrained through training data, and can be imported into an application without having to train the model yourself. In this format, users don't have to think about things such as Tensors, which are the core datastructure of TensorFlow.js.

In this application, an event-driven finite state machine, along with a reducer, and dispatch, control what state the app is in. Depending on what state you are in, different components will be displayed. Loading the model and analyzing the image to make predictions are both asynchronous events. Therefore, there are intermediary states to show the user that we are waiting for something to provide a better UX.

The reducer function takes the current state and an event, then returns a new state based on whatever event was fired. Here there is only one event called subsequent for 'subsequent state'. Whenever the event is triggered, the reducer will cause a new state and the associated UI to be returned. Using React's useReducer function, we can pass in the reducer function and the state. This works with the with the dispatch function that will allow you to fire an event into the reducer function in order to get a new state.

This is all done through the moverButton function which is triggered when a button is clicked. Once the button is clicked, the moverButton function is triggered causing a series of other actions such as preparing the model, uploading the photo, and using the subsequent event to change state and UI.  

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
* [https://www.npmjs.com/package/@tensorflow/tfjs]
* [https://www.tensorflow.org/js/guide]
* [https://github.com/tensorflow/tfjs-examples/tree/master/mobilenet]
* [https://reactjs.org/docs/state-an]
* [https://dmitripavlutin.com/react-useref-guide/]
* [https://reactjs.org/docs/hooks-reference.html]
* [https://mastery.games/post/state-machines-in-react/]
* [https://css-tricks.com/understanding-how-reducers-are-used-in-redux/]
* [https://css-tricks.com/finite-state-machines-with-react/]
* [https://js.tensorflow.org/api/latest/#setBackend]
* [https://github.com/typescript-cheatsheets/react]
* [https://en.wikipedia.org/wiki/Event-driven_finite-state_machine]
* [https://arxiv.org/abs/1704.04861]

#### Unsolved Issues

* None at the moment.

##### Next

* Use TensorFlow.js in Node. [See here](https://www.tensorflow.org/js/guide/nodejs).

* Build a transfer-learning based image classifier to recognize new classes other than the 1000 pretrained classes. [See here](https://www.tensorflow.org/js/tutorials/transfer/what_is_transfer_learning).

* Build an image classifier app with TensorFlow on Python [See here](https://www.tensorflow.org/tutorials/images/classification).
