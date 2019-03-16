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
                    message: ''
    }
    this.selectFiles  = this.selectFiles.bind(this)
    this.uploadImages = this.uploadImages.bind(this)
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

  render(){
    return(
      <div>
        <div>
	        	<br/>
	        	<div style = {{textAlign: 'center', fontFamily: 'Francois One, sans-serif'}}>
        			<h1>Image Uploader</h1>
                <label>Name<br/><input type="text" name='name' ref='name' required/></label><br/><br/>
		        		<input type="file" onChange={this.selectFiles} multiple style = {{width: '200px', marginLeft: '23px'}} required/>
		          	{ this.state.message? <p>{this.state.message}</p>: ''}
		          	<br/><br/><br/>
		          	<button value="Submit" onClick={this.uploadImages}>Submit</button>
                <br/><br/><br/><br/><br/><br/><br/><br/>
		        </div>
        </div>
      </div>
    )
  }
}
export default Upload