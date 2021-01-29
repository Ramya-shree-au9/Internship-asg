import React, { useState} from 'react'
import './register.scss'


const url='http://localhost:5000/users'
const RegisterForm=()=>{
    const [email,setEmail]= useState()
    const [user,setUser]=useState()
    const [errorMessage,setErrorMessage] = useState()
    const [error,setError] = useState()
    const [country,setCountry] = useState()
    const [date,setDate] = useState()
    const [time,setTime] = useState()
    const [id,setId] = useState(80000)


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
  
  
    const  submmitSignup=async()=>{ 
        if(user && email && country && date && time){
            setId(id + 1)
          fetch((url),
          {method:'POST',
          headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'    
          },
          body:JSON.stringify({
              "Full Name": user,
              "Country":country,
              "Id":id + 1 ,
              "Date of birth": `${date}T${time}.000Z`,
              "Email": email,
              "Created at":new Date().toISOString()
          })
      })
      this.props.history.push('/')
      }
                  
          else{ 
            setError('Fill all credentials') 
          } 
      }

        return (
            <React.Fragment>
            <div className="registration-form">
            <form>
                <div className="form-icon">
                    <span><i className="glyphicon glyphicon-user"></i></span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" value={user} onChange={renderName} id="username" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item"  onChange={renderCountry} id="country" placeholder="country"/>
                </div>
                <div className="form-group">
                    <label>Date of Birth:</label>
                    <div className='row'>
                        <div className='col-md-6'><input type="date" className="form-control item"  onChange={renderDateOfBirth} id="date" /></div>
                        <div className='col-md-6'><input type="time" className="form-control item"  onChange={renderTime} id="time" /></div>
                    </div>
                    
                    
                </div>
              
              
                <div className="form-group">
                    <input type="text" className="form-control item"  onChange={renderSemail} id="email" placeholder="Email"/>
                </div>
                
                <span className='error'>{errorMessage}</span>
              
               <div> <span className='error'>{error}</span></div>
                <div className="form-group">
                    <button type="button" className="btn btn-block create-account" onClick={submmitSignup} >Register Here</button>
                </div>
               
            </form>
          
        </div>
        
        </React.Fragment>
        )
}

export default RegisterForm



