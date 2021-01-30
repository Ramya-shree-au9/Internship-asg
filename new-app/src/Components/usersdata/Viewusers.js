import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './display.scss'
import Display from './Displayusers'
import Header from './Header'
import Pagination from "react-js-pagination";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

const App=(props)=>{
    const [posts,setPosts] =useState([])
    const [postPerPage] = useState(500);
    const [activePage,setActivePage] = useState(8)
    const [filteredData,setFilterData]=useState()
    sessionStorage.setItem('update',false)
    const [update,setUpdate]=useState(sessionStorage.getItem('update'))

    useEffect(()=>{
        const fetchPosts=async()=>{
            const res = await axios.get('http://localhost:5000/users')
            setPosts(res.data);
            setUpdate(false)
            localStorage.setItem("lastId",res.data[res.data.length-1].Id)
        }
        fetchPosts()
    },[update])

    const indexOfLastPost = activePage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = posts.slice(indexOfFirstPost,indexOfLastPost)

    // const paginate = (pageNumber)=>setCurrentpage(pageNumber)
   
    const handlePageChange=(pageNumber)=> {
      console.log(`active page is ${pageNumber}`);
      setActivePage(pageNumber); 
      // setUpdate(true) 
    }
  
    // console.log(posts[(posts.length-1)].Id)
    return(
     
      <React.Fragment>
        {posts.length > 10?
        <div className='contents'>
         
            <Header posts={currentPosts} alldata={posts}  history={props.history} filter={(data)=>{setFilterData(data)}} />
            <div>
            <Display posts={filteredData || currentPosts} history={props.history} updates={(data)=>{setUpdate(data)}}/>
            </div>
            <div className='pagecontent'>
            {filteredData?<div></div>:
            
            <center ><Pagination
              activePage={activePage}
              itemsCountPerPage={postPerPage}
              totalItemsCount={posts.length}
              pageRangeDisplayed={11}
              onChange={handlePageChange}
            
            /></center>
            }
        
      </div>
      </div>:
      <center><Loader type="Circles" color="#00BFFF" height={80} width={80}/></center>}
      </React.Fragment>
        
    )
}

export default App
