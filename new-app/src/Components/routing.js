import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import UserDetail from './usersdata/Viewusers'
import Register from '../Components/usersdata/Registerform'
import EditedForm from '../Components/usersdata/editform'

const Routing= ()=> {
    return(
        <BrowserRouter>
            <div>
                <Route exact path='/' component={UserDetail}/>   
                <Route exact path='/register' component={Register}/>   
                <Route exact path='/edited/:id' component={EditedForm}/>   
            </div>
        </BrowserRouter>
    )
}

export default Routing