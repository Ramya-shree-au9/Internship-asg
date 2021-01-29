import React from 'react'
import {ReactSearchAutocomplete } from 'react-search-autocomplete'
import {Link} from 'react-router-dom'

const Header = ({posts,filter,alldata}) => {
        const handleOnSelect = (item) => {
          let a = []
          a.push(item)
          filter(a)
        }

        const selectedCountry=(e)=>{
          const output = posts.filter((data)=>{
            return ((data.Country) === (e.target.value))})   
            filter(output)
        }
  
        const selectedDate=(e)=>{
          const output = posts.filter((data)=>{
            return ((data["Date of birth"]) === (e.target.value))})   
            filter(output)
        }
  
        const renderCountry=()=>{
          if(posts){
            let country = getUnique('Country')

            let newcountry =country.sort((a, b) => a.Country.localeCompare(b.Country)) 
            return newcountry.map((item)=>{
                return(
                  <option key={item.id} value={item.Country} >{item.Country}</option>
                )
            })
          }
        }
  
        const getUnique=(comp)=>{
          const arr = posts;
          const unique =  arr.map(e => e[comp])
  
                    // store the indexes of the unique objects
                    .map((e, i, final) => final.indexOf(e) === i && i)
  
                    // eliminate the false indexes & return unique objects
                   .filter((e) => arr[e]).map(e => arr[e]);
  
         return unique;
        }
  
        const renderDateOfBirth=()=>{
        
          if(posts){
            let date = getUnique('Date of birth')
          const newdate= date.sort((a, b) => new Date(a["Date of birth"].split('T')[0]) - new Date(b["Date of birth"].split('T')[0]))
            return newdate.map((item)=>{
              return(
                <option key={item.id} value={item["Date of birth"]}>{item["Date of birth"].split('T')[0]}</option>
              )
            })
          }
        }
  

  return (
      <div>
    <div className='row header'>
        
         <center> 
             {/* <button className='col-md-1 main btn btn-warning'><Link to='/'>All users</Link></button> */}
          <div className='filter col-md-6'>
            <select onChange={selectedCountry} className='country'>
              <option >---Select by country---</option>
              {renderCountry()}
            </select>
            <select onChange={selectedDate}  className='date'>
              <option>---Select by Date of birth---</option>
              {renderDateOfBirth()}
            </select>
          </div>
          <div className='col-md-4'>
              <div class='searchbar' >
              <ReactSearchAutocomplete 
                items={alldata}
                fuseOptions={{ keys: [ "Full Name","Country", "Date of birth", "Email","Created at"] }}           
                resultStringKeyName="Full Name"
                // onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                // onFocus={handleOnFocus}
                placeholder='Search by name'
                autoFocus
              />          
            </div>
            </div>
            <button className='col-md-2 main btn btn-success'><Link to='/register'>Register</Link></button>
             
              
              </center>
        </div>
       
        </div>
  )
}

export default Header
