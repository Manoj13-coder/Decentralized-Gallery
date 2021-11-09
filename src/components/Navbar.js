import React,{Component} from "react"
import App from "./App.js"
import "./App.css"
import logo from "./logo.png"
import Photos from "./Photos.js"
class Navbar extends Component{
	render(){
		return(
			<div>
				<nav className="navbar bg-dark">
					<img src={logo} height='45' width='45' className="rounded-circle"/>
					<div className="ml-auto">
						<button className="btn btn-dark" data-toggle="modal" data-target="#myModal">Upload</button>
						<button className="btn btn-dark" onClick={this.props.Ref}>Save Changes</button>
					</div>
				</nav>
				<div className="container text-center">
						<div className="modal fade" id="myModal" role="dialog">
							<div className="modal-dialog">
								<div className="modal-content">
									<div>
										<button type="button" className="close mr-3 mt-3" data-dismiss="modal">&times;</button>
									</div>
									<div className="modal-body text-center">
										<div>
											<input className="mb-3" type="file" onChange={this.props.captureFile}/>
											<input placeholder="Name of your picture" className="form-control w-75 mx-auto" onChange={this.props.Name}/>
											<button className="btn btn-secondary mt-3" type="button" onClick={this.props.onSum} data-dismiss="modal">Upload</button>
										</div>
									</div>
								</div>
							</div>
						</div>
 				</div>
				<div className="container text-center">
					<div className="mt-3">
						<img width='35' height='35' src={`https://joeschmoe.io/api/v1/${this.props.account}`}/>
						<b>Current Account</b><br/>
						<b>{this.props.account}</b>
					</div>
					<div className="container-fluid mb-5">
						<Photos posts={this.props.posts}/>
					</div>
				</div>
			</div>
		);
	}
}
export default Navbar;