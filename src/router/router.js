import React    from 'react'
import {Route}  from 'react-router-dom'
import Search from '../Component/search'
import File from '../Component/file'
import Upload from '../Component/upload'
import Results from '../Component/results'

const ReactRouter = () => {
    return (
        <React.Fragment>
            <Search/>
            <Route exact path="/results"    component={Results}/>
            <Route exact path="/view"       component={File}/>
            <Route exact path="/upload"       component={Upload}/>
        </React.Fragment>
    )
}
export default ReactRouter