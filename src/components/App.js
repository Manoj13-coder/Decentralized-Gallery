import React, { Component } from 'react';
import './App.css';
import ipfs from "./ipfs";
import logo from "./logo.png";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import Navbar from "./Navbar.js";
import Gallery from '../abis/Gallery.json';
import Web3 from 'web3';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      buffer: null,
      account: '',
      ipfsHash : '',
      access : null,
      count : 0,
      posts : [],
      photo: '',
      changes : false
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
      }else{
        window.alert("You are not on Ganache!!")
      }
    }
    captureFile = (event) =>{
      event.preventDefault();
      const file = event.target.files[0]
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () =>{
        this.setState({buffer : Buffer(reader.result)})
        console.log(this.state.buffer)
      }
    }
    onSum = (event) =>{
      this.setState({loading : true})
      this.setState({upload : "black"})
      event.preventDefault();
      ipfs.files.add(this.state.buffer , (error , result) =>{
        if(error || this.state.photo === ''){
            window.alert("Insufficient Data !!")
            this.setState({loading: false})
            return
        }
        this.setState({ipfsHash : result[0].hash})
        console.log(this.state.ipfsHash)
        this.state.access.methods.Add(this.state.photo,this.state.ipfsHash).send({from : this.state.account}).once('receipt',(receipt) =>{
        })
        this.setState({loading : false})
        this.setState({changes : true})
      })
    }
    Name = (event) =>{
      event.preventDefault();
      this.setState({photo : event.target.value})
    }
    Ref = (event) =>{
      event.preventDefault();
      if(this.state.changes){
        window.location.reload();
      }else{
        window.alert("Nothing to do !!")
      }
      this.setState({changes : false})
    }
  render(){
    return(this.state.loading ?<div id="spinner">
                                  <div className="spinner-border"></div>
                                  <p>Loading.....</p>
                                </div>
            : <Navbar
                account = {this.state.account}
                posts = {this.state.posts}
                col = {this.state.col}
                onSum = {this.onSum}
                captureFile = {this.captureFile}
                Ref = {this.Ref}
              />);
  }
}
export default App;