import React, { Component } from 'react'
import './register.scss'
// import { Link } from 'react-router-dom'


const url='http://localhost:5000/users'
export class SignUp extends Component {
    constructor(){
        super()
        this.state={     
            Semail:'',
            user:'',
            errorMessage:'',
            error:'',
            country:'',
            date:'',
            id:80000,
            time:''
        }
    }
   
   
    renderSemail=(e)=>{
      if ((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(e.target.value)) {
        this.setState({validation: true})
        this.setState({Semail:e.target.value})
        this.setState({errorMessage: ''})
        this.setState({chkbox:false}) 
      } else {
        this.setState({validation: false});
        this.setState({errorMessage: 'Please enter correct email adress'})
      }   
    }
   
   
    renderName=(e)=>{
           
        this.setState({user:e.target.value})  
         
    }
    renderCountry=(e)=>{
            
        this.setState({country:e.target.value})       
    }
    renderDateOfBirth=(e)=>{ 
        console.log(e.target.value)     
        this.setState({date:e.target.value})       
    }
    renderTime=(e)=>{  
        console.log(e.target.value)    
        this.setState({time:e.target.value})       
    }


    submmitSignup=async()=>{ 
      if(this.state.user && this.state.Semail && this.state.country && this.state.date){
          this.setState({id:this.state.id + 1})
        fetch((url),
        {method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'    
        },
        body:JSON.stringify({
            "Full Name": this.state.user,
            "Country":this.state.country,
            "id":this.state.id + 1 ,
            "Date of birth": `${this.state.date}T${this.state.time}.000Z`,
            "Email": this.state.Semail,
            "Created at":new Date().toISOString()
        })
    })
    this.props.history.push('/')
    }
                
        else{ 
          this.setState({error:'Fill all credentials'}) 
        } 
    }
   
  render() {
    return (
        <React.Fragment>
        <div className="registration-form">
        <form>
            <div className="form-icon">
                <span><i className="glyphicon glyphicon-user"></i></span>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item" value={this.state.user} onChange={this.renderName} id="username" placeholder="Username"/>
            </div>
            <div className="form-group">
                <input type="text" className="form-control item"  onChange={this.renderCountry} id="country" placeholder="country"/>
            </div>
            <div className="form-group">
                <label>Date of Birth:</label>
                <div className='row'>
                    <div className='col-md-6'><input type="date" className="form-control item"  onChange={this.renderDateOfBirth} id="date" /></div>
                    <div className='col-md-6'><input type="time" className="form-control item"  onChange={this.renderTime} id="time" /></div>
                </div>
                
                
            </div>
          
          
            <div className="form-group">
                <input type="text" className="form-control item"  onChange={this.renderSemail} id="email" placeholder="Email"/>
            </div>
            
            <span className='error'>{this.state.errorMessage}</span>
          
           <div> <span className='error'>{this.state.error}</span></div>
            <div className="form-group">
                <button type="button" className="btn btn-block create-account" onClick={this.submmitSignup} >Register Here</button>
            </div>
           
        </form>
      
    </div>
    
    </React.Fragment>
    )
  }
}


export default SignUp


