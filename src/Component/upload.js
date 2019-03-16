import React, { Component } from 'react'
import axios  from 'axios'
const BASE_URL = 'http://localhost:8080/'    //web service url

class Upload extends Component
{
  constructor(props) {
    super(props)
    this.state =  { 
                    editing: true,
                    url: '', name: '',
                    images: [],
                    imageUrls: [],
                    message: '',
                    logged: false,
                    password: '1234'
    }
    this.selectFiles       = this.selectFiles.bind(this)
    this.uploadImages      = this.uploadImages.bind(this)
    this.disable           = this.disable.bind(this)
    this.renderLogin       = this.renderLogin.bind(this)
    this.renderUpload      = this.renderUpload.bind(this)
    this.handleSubmit      = this.handleSubmit.bind(this)
  }

  selectFiles = (event) => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(txt)$/))
    let message = `${images.length} valid image(s) selected`
    this.setState({images, message })
  }

  uploadImages = () => { 
    if(this.state.images.length === 0)
    {
      console.error("Must select photo!")
      return null
    }
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);
      // Make an AJAX upload request using Axios
      return axios.post(BASE_URL + 'upload', data)
      .then(response => {
        console.log(response)
      })
   });
    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      alert('done')
      window.location.href = '/'
      
    })
    .catch(err => alert(err.message));
  }

  disable(){
    let url = 'http://localhost:8080/disable/'
    url = url + this.refs.name.value
    if(this.refs.name.value){
      fetch(url)
      .then(()=> {
        alert(this.refs.name.value + " was disabled")
        this.refs.name.value = ""
      })
    }
    else{
      console.log("error")
    }
  }

  handleSubmit(event){
    event.preventDefault()
    if(this.refs.password.value === this.state.password){
      this.setState({logged: true})
    }
    else{
      alert("Not valid password")
      this.refs.password.value = ""
    }
  }

  renderLogin(){
    return(
      <div>
        <form style={{marginTop:'50px', textAlign: 'center', fontFamily: 'Francois One, sans-serif'}} onSubmit={this.handleSubmit}>
          <br/><br/>
          <div>Password:</div>
          <input type="password" name='password' ref='password'/>
          <br/><br/>
          <span>
            <input type="submit" value="Login"/>
          </span>
        </form>
      </div>
    )
  }

  renderUpload(){
    return(
      <div>
        <div>
	        	<br/>
	        	<div style = {{textAlign: 'center', fontFamily: 'Francois One, sans-serif'}}>
        			<h2>Image Uploader</h2>
                <label>Name<br/><input type="text" name='name' ref='name' required/></label><br/><br/>
		        		<input type="file" onChange={this.selectFiles} multiple style = {{width: '200px', marginLeft: '23px'}} required/>
		          	{ this.state.message? <p>{this.state.message}</p>: ''}
		          	<br/><br/><br/>
		          	<button value="Submit" onClick={this.uploadImages}>Submit</button>
                <br/><br/><br/><b><u>OR</u></b><br/><br/><br/>
                <h2>Disable a document</h2>
                <label>Document Number<br/><input type="text" name='name' ref='name' required/></label><br/><br/>
                <button value="Submit" onClick={this.disable}>Submit</button>
		        </div>
        </div>
      </div>
    )
  }

  render(){
    return this.state.logged ? this.renderUpload() : this.renderLogin()
   }
}

export default Upload