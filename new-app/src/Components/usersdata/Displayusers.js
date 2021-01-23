import axios from 'axios'
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Edit from './editform'

const url='http://localhost:5000/users'
export class Displayusers extends Component {

  deleteItem=(id)=>{
    console.log(id)
    axios.delete(`${url}/${id}`)
    axios.get(url)
      .then((item)=>{
        this.props.remaining(item.data)
      })
  }
  editItem=(id)=>{

  }
  
    renderData=({uData})=>{
      let month = [0,'Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nav','Dec']
        if(uData){
          console.log(uData)
           return uData.map((item)=>{
                return(
                  <div class="content">
                  <div class="col-xs-12 col-sm-12 col-md-6">
                    <div class="card">
                      <div class="card-body">
                      <center><h4>User Details</h4></center>
                        <div className='row'>
                          <div className='col-md-4'><i class="usericon glyphicon glyphicon-user"></i></div>
                          <div className='col-md-8'>
                            
                          <div key={item.id}>
                              <div><b>Name:</b> {item["Full Name"]}</div>
                    
                            <div><b>Country:</b> {item.Country}</div>
                            {item["Date of birth"].split('T')[0].split('-')[1] < 10?
                             <div><b>Date of birth:</b> {item["Date of birth"].split('T')[0].split('-')[2]}th  {month[item["Date of birth"].split('T')[0].split('-')[1].split("")[1]]} {item["Date of birth"].split('T')[0].split('-')[0]}</div>:
                            <div><b>Date of birth:</b> {item["Date of birth"].split('T')[0].split('-')[2]}th  {month[item["Date of birth"].split('T')[0].split('-')[1]]} {item["Date of birth"].split('T')[0].split('-')[0]}</div>}
                            <div><b>Email:</b> {item.Email}</div>
                           
                            <button className='btn btn-success'> <Link to={`/edited/${item.id}`} onClick={()=>{this.editItem(item.id)}}>Edit</Link></button>
                            <button className='btn btn-danger'> <Link onClick={()=>{this.deleteItem(item.id)}}>Delete</Link></button>
                      </div> 
                    </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        
                  
                )
            })
        }
    }
  render() {
    return (
      <div className='detail'>
       {this.renderData(this.props)}
      
      </div>
    )
  }
}

export default Displayusers
