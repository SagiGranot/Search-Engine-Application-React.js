import  React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser';


class Search extends Component
{
    constructor(props){
        super(props)
        this.state = { text: null }
        
    }

    componentWillMount(){
        let params = (new URL(document.location)).searchParams;
        let id = params.get("id");
        let url = 'http://localhost:8080/view/'+id+'/'
        if(localStorage.getItem('query')){
            url = url + localStorage.getItem('query');
            fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                this.setState({text: data.body})
            })
        }
    }
    render() {
       return(
           <div>
               {ReactHtmlParser(this.state.text)}
           </div>
       )
    }
}
export default Search