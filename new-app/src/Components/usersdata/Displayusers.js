import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'

const url='http://localhost:5000/users'
const Displayusers =({posts,updates})=>{
  const deleteItem=(Id)=>{
    console.log(Id)
    axios.delete(`${url}/${Id}`) 
    updates(true)
    
  }

  const month = [0,'Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nav','Dec']

  if(posts){ 
    return(
    <div>
       {posts.map((item)=>{
         
                return(
                  <div class="content">
                  <div class="col-xs-12 col-sm-12 col-md-6">
                    <div class="card">
                      <div class="card-body">
                      <center><h4>User Details</h4></center>
                        <div className='row'>
                          <div className='col-md-4'><i class="usericon glyphicon glyphicon-user"></i></div>
                          <div className='col-md-8'>
                            
                          <div key={item.Id}>
                              <div><b>Name:</b> {item["Full Name"]}</div>
                    
                            <div><b>Country:</b> {item.Country}</div>
                            {item["Date of birth"].split('T')[0].split('-')[1] < 10?
                             <div><b>Date of birth:</b> {item["Date of birth"].split('T')[0].split('-')[2]}th  {month[item["Date of birth"].split('T')[0].split('-')[1].split("")[1]]} {item["Date of birth"].split('T')[0].split('-')[0]}</div>:
                            <div><b>Date of birth:</b> {item["Date of birth"].split('T')[0].split('-')[2]}th  {month[item["Date of birth"].split('T')[0].split('-')[1]]} {item["Date of birth"].split('T')[0].split('-')[0]}</div>}
                            <div><b>Email:</b> {item.Email}</div>
                           
                            <button className='btn btn-success'> <Link to={`/edited/${item.Id}`} >Edit</Link></button>
                            <button className='btn btn-danger'> <Link onClick={()=>{deleteItem(item.Id)}}>Delete</Link></button>
                      </div> 
                    </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        
                  
                )
            })}
       
    </div>
  )}
}

export default Displayusers

