import React, { Component } from 'react'
import { MdSearch } from "react-icons/md"
const localStorage = require('localStorage')

class Search extends Component
{
    constructor(props) {
        super(props)
        this.state = {
            editing: true,
            query: null
        }
        this.save       = this.save.bind(this)
        this.renderUI   = this.renderUI.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.change = this.change.bind(this)
    }

    save(event) {
        event.preventDefault() // to prevent the default behaviour/ functionality
        localStorage.setItem('query', "")
        localStorage.setItem('query', this._query.value)
        this.setState({
            editing: false,
        })
    }
    change(){
        this.setState({editing: true})
    } 
    renderForm(props) {
        return(
            <div>
                <form style={{textAlign: 'center'}}>
                <div><h3>Enter Query:</h3></div>
                <input ref={_query => this._query = _query}/>
                <br/><br/>
                <span>
                    <button onClick={this.save}><MdSearch /> Search</button>
                </span>
                </form>
            </div>
        )
    }
    renderUI(props) {
        window.location.href = '/results'
      }
    render() {
       return this.state.editing ? this.renderForm() : this.renderUI()
    }
}
export default Search