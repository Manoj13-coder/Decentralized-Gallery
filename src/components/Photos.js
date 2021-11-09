import React,{Component} from "react"
import Navbar from "./Navbar.js"
import "./App.css"
class Photos extends Component{

	render(){
		return(
			<div className="row">
				{
	 				this.props.posts.map((post,key) => {
		                return(<div className="col-lg-3 col-md-4 col-12" key={key}>
								    <div className="card-body text-center">
								        <div className="card mx-auto text-center">
								        	<img className="card-img-top text-center mb-2" src={`https://ipfs.io/ipfs/${post.Hash}`} alt="Card image"/>
								            <div className="text-center mb-1">
								            	<b>{post.name}</b>
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
		);
	}
}
export default Photos;