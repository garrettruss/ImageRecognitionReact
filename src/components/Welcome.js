//import SimpleSlider from "./Carousel";
//<SimpleSlider className ="slider" />

function Welcome(props) {
	return <div className="welcome">
            

           <p className="One">
                Machine learning (ML) is the study of computer algorithms that improve automatically through experience and by the use of data.[1] It is seen as a part of artificial intelligence. Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so.[2] Machine learning algorithms are used in a wide variety of applications, such as in medicine, email filtering, and computer vision, where it is difficult or unfeasible to develop conventional algorithms to perform the needed tasks. <a href="https://en.wikipedia.org/wiki/Machine_learning">Learn more here</a>
                
           </p>

           <p className="Two">
             TensorFlow.js is a pretrained machine learning model that operates in the web browser. <a href="https://www.tensorflow.org/js/models">Learn more here</a>
             
            For this example, the Image Classification model with labels from the ImageNet database MobileNet was used. The model was trained to classify 999 different items.
            <a href="https://github.com/tensorflow/tfjs-models/blob/master/mobilenet/src/imagenet_classes.ts">Learn more here</a>
        
           </p>
			</div>
}
export default Welcome;