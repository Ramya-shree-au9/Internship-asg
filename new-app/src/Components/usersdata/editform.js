import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './register.scss'


const url='http://localhost:5000/users'
const Editform=(props)=>{
    const [selectedData,setSelectedData]= useState([])
    const [email,setEmail]= useState()
    const [user,setUser]=useState()
    const [errorMessage,setErrorMessage] = useState()
    const [error,setError] = useState()
    const [country,setCountry] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()

    
     useEffect(()=>{
        const fetchPosts=async()=>{
            const res = await axios.get(`${url}/${props.match.params.id}`)
            setSelectedData(res.data);
            setUser(res.data["Full Name"])
            setCountry(res.data.Country)
            setEmail(res.data.Email)
        }
        fetchPosts()
    },[])  

    const renderSemail=(e)=>{
        if ((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(e.target.value)) {
          
          setEmail(e.target.value)
          setErrorMessage('') 
         
        } else {
          setErrorMessage('Please enter correct email adress')
        }   
      }
     
     
      const renderName=(e)=>{
          console.log(e.target.value)  
          setUser(e.target.value)  
           
      }
      const renderCountry=(e)=>{
          console.log(e.target.value)   
          setCountry(e.target.value)       
      }
      const renderDateOfBirth=(e)=>{ 
          console.log(e.target.value)     
          setDate(e.target.value)       
      }
      const renderTime=(e)=>{  
          console.log(e.target.value)    
          setTime(e.target.value)       
      }
  
  
      const submmiteditform=()=>{ 
          console.log(user,email,country,date, time)
        if(user && email && country && date && time){
            axios.patch(`${url}/${props.match.params.id}`,{
                
                    "Full Name": user,
                    "Country":country,
                    "Date of birth": `${date}T${time}.000Z`,
                    "Email": email,
                    "Created at":new Date().toISOString()
               
            }).then((res)=>{
                console.log(res.data)
            }).catch(err=>{
                console.log('errr')
            })
            sessionStorage.setItem('update',true)
      props.history.push('/')
      }          
          else{ 
            setError('Fill all credentials') 
          } 
      }
  
        console.log(props)
    return (
        <React.Fragment>
              <div className="registration-form">
        <form>
            <div className="form-icon">
                <span><i className="glyphicon glyphicon-user"></i></span>
            </div>
            <div className="form-group">
            <label>Name:</label> <input type="text" className="form-data" defaultValue={selectedData["Full Name"]} onChange={renderName} id="username" />
                
            </div>
            <div className="form-group">
            <label>Country:</label>  <input type="text" className="form-data" defaultValue={selectedData.Country}  onChange={renderCountry} id="country" placeholder="country"/>
               
            </div>
            <div className="form-group">
                <label>Date of Birth:</label>
                <div className='row'>
                    
                    <div className='col-md-6'><input type="date"  className="form-control item"  onChange={renderDateOfBirth} id="date" /></div>
                    <div className='col-md-6'><input type="time" className="form-control item"  onChange={renderTime} id="time" /></div>
                </div>     
            </div>
          
          
            <div className="form-group">
            <label>Email: </label> <input type="text" className="form-data" defaultValue={selectedData.Email}  onChange={renderSemail} id="email" placeholder="Email"/>
            </div>
            
            <span className='error'>{errorMessage}</span>
          
           <div> <span className='error'>{error}</span></div>
            <div className="form-group">
                <button type="button" className="btn btn-block create-account" onClick={submmiteditform} >Update</button>
            </div>
           
        </form>
      
    </div>
        
    
    </React.Fragment>
    )
}

export default Editform







  
   


