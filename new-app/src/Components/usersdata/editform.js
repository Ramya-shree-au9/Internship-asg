import axios from 'axios'
import React, { Component } from 'react'
import './register.scss'
// import { Link } from 'react-router-dom'


const url='http://localhost:5000/users'
export class editform extends Component {
    constructor(){
        super()
        this.state={  
            selectedData:'',   
            Semail:'',
            user:'',
            errorMessage:'',
            error:'',
            country:'',
            date:'',
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
        console.log(e.target.value)  
        this.setState({user:e.target.value})  
         
    }
    renderCountry=(e)=>{
        console.log(e.target.value)   
        this.setState({country:e.target.defaultvalue})       
    }
    renderDateOfBirth=(e)=>{ 
        console.log(e.target.value)     
        this.setState({date:e.target.value})       
    }
    renderTime=(e)=>{  
        console.log(e.target.value)    
        this.setState({time:e.target.value})       
    }


    submmiteditform=()=>{ 
        console.log(this.state.user,this.state.Semail,this.state.country,this.state.date, this.state.time)
      if(this.state.user && this.state.Semail && this.state.country && this.state.date && this.state.time){
        fetch((`${url}/${this.props.match.params.id}`),
        {method:'PATCH',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'    
        },
        body:JSON.stringify({
            "Full Name": this.state.user,
            "Country":this.state.country,
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
      console.log(this.state.selectedData)
     
    return (
        <React.Fragment>
              <div className="registration-form">
        <form>
            <div className="form-icon">
                <span><i className="glyphicon glyphicon-user"></i></span>
            </div>
            <div className="form-group">
            <label>Name:</label> <input type="text" className="form-data" defaultValue={this.state.selectedData["Full Name"]} onChange={this.renderName} id="username" />
                
            </div>
            <div className="form-group">
            <label>Country:</label>  <input type="text" className="form-data" defaultValue={this.state.selectedData.Country}  onChange={this.renderCountry} id="country" placeholder="country"/>
               
            </div>
            <div className="form-group">
                <label>Date of Birth:</label>
                <div className='row'>
                    
                    <div className='col-md-6'><input type="date"  className="form-control item"  onChange={this.renderDateOfBirth} id="date" /></div>
                    <div className='col-md-6'><input type="time" className="form-control item"  onChange={this.renderTime} id="time" /></div>
                </div>     
            </div>
          
          
            <div className="form-group">
            <label>Email: </label> <input type="text" className="form-data" defaultValue={this.state.selectedData.Email}  onChange={this.renderSemail} id="email" placeholder="Email"/>
            </div>
            
            <span className='error'>{this.state.errorMessage}</span>
          
           <div> <span className='error'>{this.state.error}</span></div>
            <div className="form-group">
                <button type="button" className="btn btn-block create-account" onClick={this.submmiteditform} >Update</button>
            </div>
           
        </form>
      
    </div>
        
    
    </React.Fragment>
    )
    
  }
  componentDidMount(){
      axios.get(`${url}/${this.props.match.params.id}`)
      .then((item)=>{
          this.setState({selectedData:item.data,user:item.data["Full Name"],country:item.data.Country,Semail:item.data.Email})
      })
  }
}


export default editform


