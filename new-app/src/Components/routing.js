import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import UserDetail from './usersdata/Viewusers'
import Register from '../Components/usersdata/Registerform'

const Routing= ()=> {
    return(
        <BrowserRouter>
            <div>
                <Route exact path='/' component={UserDetail}/>   
                <Route exact path='/register' component={Register}/>   
            </div>
        </BrowserRouter>
    )
}

export default Routing