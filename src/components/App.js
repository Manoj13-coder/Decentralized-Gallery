import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Gallery from '../abis/Gallery.json'
import ipfs from "./ipfs";
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      account : '',
      buffer: null,
      ipfsHash : '',
      access : null,
      count : 0,
      posts : [],
      photo: ''
    };
  }
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Gallery.networks[networkId]
    if(networkData) {
      const access = web3.eth.Contract(Gallery.abi, networkData.address)
      this.setState({ access : access })
      let count = await access.methods.count().call()
      count = count.toNumber()
      this.setState({count : count})
      this.setState({loading : false})
      for (var i = 1; i <= count; i++) {
        const post = await access.methods.photos(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
    }
  }
  captureFile = (event) =>{
    event.preventDefault();
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({buffer : Buffer(reader.result)})
      console.log('buffer',this.state.buffer)
    }
  }
  onSum = (event) =>{
    this.setState({loading : true})
    event.preventDefault();
    ipfs.files.add(this.state.buffer , (error , result) =>{
      if(error || this.state.photo === ''){
        window.alert("Insufficient Data !!")
        console.log(error)
        this.setState({loading : false})
      }else{
        this.setState({ipfsHash : result[0].hash})
        console.log('ipfsHash' , this.state.ipfsHash)
        this.state.access.methods.Add(this.state.photo,this.state.ipfsHash).send({from : this.state.account}).once('receipt',(receipt) =>{
          console.log("Transaction Successfull !!")
          this.setState({loading : false})
          window.location.reload(false)
        })
        this.setState({loading : false})
      }
    })
  }
  Name = (event) =>{
    event.preventDefault();
    this.setState({photo : event.target.value})
  }
  render(){
    return(this.state.loading ?<div id="spinner">
                                  <div className="spinner-border"></div>
                                  <p>Loading.....</p>
                                </div>
            :<div>
                <nav className="navbar navbar-expand-sm bg-dark mb-5">
                  <i className="navbar-brand text-light">D-Gallery</i>
                  <img width='30' height='30' className="ml-auto" src={`https://joeschmoe.io/api/v1/${this.state.account}`}/>
                  <small className="text-light mr-2">{this.state.account}</small>
                </nav>
                <div className="text-center mb-5">
                  <form className="form" style={{background : "lightgray"}}>
                    <p className="mb-3 text-dark">Upload Photo <b>Reload page ones after upload</b></p>
                    <input className="mb-3" type="file" onChange={this.captureFile}/>
                    <input placeholder="Name of your picture" className="form-control w-50 mx-auto" onChange={this.Name}/>
                    <button className="btn btn-secondary mt-2" type="button" onClick={this.onSum}>Upload</button>
                  </form>
                </div>
                <p className="text-right mr-5">Total : {this.state.count}</p>
                <div className="container-fluid">
                  <div className="row">
                      {
                        this.state.posts.map((post,key) => {
                          return(<div className="col-lg-3 col-md-6 col-12" key={key}>
                                  <div className="card mt-5 text-right mb-2 mx-auto" style={{width: "250px"}}>
                                    <img className="card-img-top text-center" src={`https://ipfs.io/ipfs/${post.Hash}`} alt="Card image"/>
                                    <div className="card-body">
                                      <p className="card-text text-center">{post.name}</p>
                                      <img width='30' height='30' src={`https://joeschmoe.io/api/v1/${post.author}`}/>
                                      <small className="card-text">{post.author}</small>
                                    </div>
                                  </div>
                                </div>);
                        })
                      }
                    </div>
                  </div>
                </div>);
  }
}
export default App;