import axios from 'axios'
import React from 'react'
// import {Link} from 'react-router-dom'

const url='http://localhost:5000/users'
const Displayusers =({posts,updates,history})=>{
  const deleteItem=(Id)=>{
    console.log(Id)
    axios.delete(`${url}/${Id}`) 
    updates(true)  
  }

  const editItem=(Id)=>{
    history.push(`/regiEdit/${Id}`)
  }

  const months = [0,'Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nav','Dec']
  const dateformatrender=(date)=>{
    // console.log(date)
    const days = date.split('-')[2]
    const month = date.split('-')[1]
    const year = date.split('-')[0]
    if((days === '01' ||days ===  '21' ||days ===  '31') && month < 10){
      return(<span className='detail'>{date.split('-')[2]}st  {months[month.split("")[1]]} {year}</span>)
    }
    else if((days === '02' ||days ===  '22' ) && month < 10){
      return(<span className='detail'>{date.split('-')[2]}nd  {months[month.split("")[1]]} {year}</span>)
    }
    else if((days === '03' ||days ===  '23' ) && month < 10){
      return(<span className='detail'>{date.split('-')[2]}rd  {months[month.split("")[1]]} {year}</span>)
    }
    else if(month < 10){
      return (<span className='detail'>{date.split('-')[2]}th  {months[month.split("")[1]]} {year}</span>)
    }
    else{
      return (<span className='detail'>{date.split('-')[2]}th  {months[month]} {year}</span>)
    }
   }

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
                              <div className='detail'><b>Name:</b> {item["Full Name"]}</div>
                    
                            <div className='detail'><b>Country:</b> {item.Country}</div>
                            <div><b>Date of birth:</b>{dateformatrender(item["Date of birth"].split('T')[0])}</div>
                            
                            <div className='detail'><b>Email:</b> {item.Email}</div>
                           
                            <button  className='btn btn-success detail' onClick={()=>{editItem(item.Id)}}> Edit</button>
                            <button className='btn btn-danger detail' onClick={()=>{deleteItem(item.Id)}}>Delete</button>
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

