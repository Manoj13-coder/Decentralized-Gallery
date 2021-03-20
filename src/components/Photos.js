import React,{Component} from "react"
import Navbar from "./Navbar.js"
import "./App.css"
class Photos extends Component{

	render(){
		return(
			<div className="container-fluid mt-5 mb-5 text-center">
					<hr/>
					<b className="mt-5"><span className="text-danger">Note</span> : Need to click on save changes after any change.</b>
 					<div className="row">
	 					{
	 						this.props.posts.map((post,key) => {
		                        return(<div className="col-lg-3 col-md-6 col-12" key={key}>
								            <div className="card-body text-center">
								            		<div className="card mt-5 mb-3 mx-auto text-center" style={{width: "250px"}} id="cards">
								            			<img className="card-img-top text-center mb-3" src={`https://ipfs.io/ipfs/${post.Hash}`} alt="Card image"/>
								            			<div className="text-center mb-3">
								            				<b className="ml-2 mr-2 text-center">{post.name}</b>
								            			</div>
								            			<div className="text-center">
								            				<img width='30' height='30' src={`https://joeschmoe.io/api/v1/${post.author}`}/>
								            				<small>{post.author}</small>
								            			</div>
								            		</div>
								            </div>
								        </div>);
		                    })
	 					}
 					</div>
 			</div>
		);
	}
}
export default Photos;