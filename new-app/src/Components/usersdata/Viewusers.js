import React, { Component } from 'react'
import axios from 'axios'
import './display.scss'
import Display from './Displayusers'
import {ReactSearchAutocomplete } from 'react-search-autocomplete'
import {Link} from 'react-router-dom'

const url='http://localhost:5000/users'
export class viewusers extends Component {
    constructor(){
        super()
        this.state={
            usersdata:'',
            filtered:''
        }
    }
    renderAllData=()=>{
      this.setState({filtered:this.state.usersdata})
    }
    handleOnSearch = (string, results) => {
        console.log(string, results)
      }
    
    handleOnSelect = (item) => {
        let a = []
        a.push(item)
        console.log(item)
        this.setState({filtered:a})
      }
    
    handleOnFocus = () => {
        console.log('Focused')
      }

      selectedCountry=(e)=>{
        const output = this.state.usersdata.filter((data)=>{
          return ((data.Country) === (e.target.value))})   
          this.setState({filtered:output})
      }

      selectedDate=(e)=>{
        const output = this.state.usersdata.filter((data)=>{
          return ((data["Date of birth"]) === (e.target.value))})   
          this.setState({filtered:output})
      }

      renderCountry=()=>{
        if(this.state.usersdata){
          let country = this.getUnique('Country')
          console.log(country)
          return country.map((item)=>{
              return(
                <option key={item.id} value={item.Country} >{item.Country}</option>
              )
          })
        }
      }

      getUnique=(comp)=>{
        console.log(comp,this.state.usersdata)
        const arr = this.state.usersdata;
        const unique =  arr.map(e => e[comp])

                  // store the indexes of the unique objects
                  .map((e, i, final) => final.indexOf(e) === i && i)

                  // eliminate the false indexes & return unique objects
                 .filter((e) => arr[e]).map(e => arr[e]);

       return unique;
      }

     renderDateOfBirth=()=>{
      
        if(this.state.usersdata){
          let date = this.getUnique('Date of birth')
          return date.map((item)=>{
            return(
              <option key={item.id} value={item["Date of birth"]}>{item["Date of birth"].split('T')[0]}</option>
            )
          })
        }
      }

    // sort the date by increasing order
    sort=()=>{
        if(this.state.usersdata){
          this.state.usersdata.sort((a, b) => new Date(a["Date of birth"].split('T')[0]) - new Date(b["Date of birth"].split('T')[0])) 
      }}

      remainingData=(value)=>{
        this.setState({filtered:value})
      }
    
  render() {
      console.log(this.state.filtered)
    return (
      <div className='contents'>
        {this.sort()}
        <div className='row header'>
        
         <center> <div className='col-md-2 main' onClick={this.renderAllData}><Link><h3>All users</h3></Link></div>
          <div className='filter col-md-5'>
            <select onChange={this.selectedCountry} className='country'>
              <option >---select by country---</option>
              {this.renderCountry()}
            </select>
            <select onChange={this.selectedDate}  className='date'>
              <option>---select by Date of birth---</option>
              {this.renderDateOfBirth()}
            </select>
          </div>
          <div className='col-md-4'>
              <div class='searchbar' >
              <ReactSearchAutocomplete 
                items={this.state.usersdata}
                fuseOptions={{ keys: [ "Full Name","Country", "Date of birth", "Email","Created at"] }}           
                resultStringKeyName="Full Name"
                onSearch={this.handleOnSearch}
                onSelect={this.handleOnSelect}
                onFocus={this.handleOnFocus}
                placeholder='Search by name'
                autoFocus
              />          
            </div>
            </div>
            <div className='col-md-1 register'>
              <Link to='/register' style={{color:'white'}}>Register</Link>
              </div>
              </center>
        </div>
        
        <Display uData={this.state.filtered} remaining={(value)=>this.remainingData(value)}/>
        
    </div>
    )
  }

  componentDidMount(){
    axios.get(url)
    .then(item=>{
        this.setState({usersdata:item.data, filtered:item.data})
    })
}
}

export default viewusers



