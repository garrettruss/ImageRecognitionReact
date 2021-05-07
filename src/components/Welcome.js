import mlphoto from "../Images/Machine-Learning.jpeg";

function Welcome(props) {
	return <div className="welcome">
            

           <p className="One">
                Machine learning is a field of study related to Artificial Intelligence that focuses on computer algorithms that improve automatically through experience and by the use of data. 
                <br>
                </br>
                <br>
                </br>
                Machine learning algorithms build a model based on sample data, known as "training data", in order to make predictions or decisions without being explicitly programmed to do so. Machine learning algorithms are used in a wide variety of applications, that you use on a daily basis. Click the link below to learn more. 
                <br></br>
                <br></br>
                <a href="https://en.wikipedia.org/wiki/Machine_learning">Learn more here</a>
                
           </p>

           <>
     
               <img src={mlphoto} alt="MLPhoto"></img>
           </>
			</div>
}
export default Welcome;