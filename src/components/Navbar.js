import React,{Component} from "react"
import App from "./App.js"
import logo from "./logo.png"
import Photos from "./Photos.js"
class Navbar extends Component{
	
	render(){
		return(<div>
					<nav className="navbar navbar-expand-lg bg-dark fixed-top text-center text-light">
	                  <img src={logo} width="30" height="30"/>&nbsp;
	                  <a href="index.html" className="navbar-brand text-light mr-auto">Gallery</a>
	                  <button className="navbar-toggler bg-dark text-center" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="btn navbar-toggler-icon text-light material-icons text-center">tune</span>
					  </button>

					  <div className="collapse navbar-collapse" id="navbarSupportedContent">
		                  <div className="nav-item">
	 						  <a href="#" className="nav-link text-light ml-2" onClick={this.props.Upload} data-toggle="modal" data-target="#myModal">Upload</a>
		                   </div>
		                   <div className="nav-item">
	 						  <a href="#" className="nav-link text-light ml-2" onClick={this.props.Ref}>Save Changes</a>
		                   </div>
		                    <div className="ml-auto">
		                    	<small>{this.props.account}</small>
		                    	<img width='30' height='30' src={`https://joeschmoe.io/api/v1/${this.props.account}`}/>
		                  	</div>
		                </div>
	                </nav>
	                <div className="container text-center">
                  <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div>
                          <button type="button" className="close mr-3 mt-3" data-dismiss="modal" onClick={this.props.ChC}>&times;</button>
                        </div>
                        <div className="modal-body text-center">
                          <form className="form">
                            <input className="mb-3" type="file" onChange={this.props.captureFile}/>
                            <input placeholder="Name of your picture" className="form-control w-75 mx-auto" onChange={this.props.Name}/>
                            <button className="btn btn-secondary mt-3" type="button" onClick={this.props.onSum} data-dismiss="modal">Upload</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
 				</div>
 				<div>
 					<Photos  posts={this.props.posts}/>
 				</div>
              </div>);
	}
}
export default Navbar;