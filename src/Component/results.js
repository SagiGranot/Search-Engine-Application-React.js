import React, { Component } from 'react'
import { NavLink } from  "react-router-dom";
import Search from './search'

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = { docs: [] } 

    this.add     = this.add.bind(this)
    this.eachDoc = this.eachDoc.bind(this)
}

componentDidMount() {
    let url = 'http://localhost:8080/search/'
    if(localStorage.getItem('query')){
        url = url + localStorage.getItem('query');
        fetch(url)
        .then(res => {
            if(res.status === 404){
                return null
            }
            if(res.status === 200){
                return res.json()
            }
        })
        .then(data => {
            if (data)
            data.map(doc =>
                this.add({
                    id:      doc.id,
                    summary: doc.summary
                }))
            }
        )
        .catch(err => console.error(err));
    }
}
add({ id = null, summary = null}) {
    this.setState(prevState => ({
    docs: [
        ...prevState.docs, {
        id:       id,
        summary: summary
        }]
    }))
}
eachDoc(doc, i) {
    let url = "/view?id="+doc.id
    return (
        <div
        key={ `container${doc.id}` }
        style={ { width: '100%', marginBottom: '7px', textAlign: 'center' } }
        onClick={this.change}>
        <div style={ {border: '2px solid'} }>
            <h2 style={ {background: '#E3E5E7'} }>Document Number: <NavLink exact to={ url } >{ doc.id }</NavLink></h2>
            <h3><b style = {{borderBottom: '1px solid red'}}>Summary</b></h3>
            <p>{ doc.summary }</p>
            <hr></hr>
        </div>
        </div>
    )
}

render() {
    return (
        <div>
            <Search/>
            <br/><br/>
            <div style = {{width: '900px', margin: '0px auto'}}>
                { this.state.docs.map(this.eachDoc) }
            </div>
        </div>
    )
}
}
export default Result