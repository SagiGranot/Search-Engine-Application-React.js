import React, { Component } from 'react'

class Result extends Component {
  constructor(props) {
    super(props)
    this.state = { docs: [] } 

    this.add     = this.add.bind(this)
    this.eachDoc = this.eachDoc.bind(this)
}

componentDidMount() {
    let url = 'http://localhost:8080/search/'
    if(this.props._query){
        url = url + this.props._query
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
    return (
        <div
        key={ `container${doc.id}` }
        style={ { width: '100%', marginBottom: '7px', textAlign: 'center' } }
        >
        <div style={ {border: '2px solid'} }>
            <h2 style={ {background: '#E3E5E7'} }>Document Number: { doc.id }</h2>
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
        <br/><br/>
        <div style = {{width: '900px', margin: '0px auto'}}>
            { this.state.docs.map(this.eachDoc) }
        </div>
    </div>
    );
}
}

export default Result
