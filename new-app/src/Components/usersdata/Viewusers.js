import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './display.scss'
import Display from './Displayusers'
import Header from './Header'
import Pagination from "react-js-pagination";
// import './'


const App=()=>{
    const [posts,setPosts] =useState([])
    const [loading,setLoading] = useState(false)
    // const [currentPage,setCurrentpage] = useState(1)
    const [postPerPage] = useState(100);
    const [activePage,setActivePage] = useState(8)
    const [filteredData,setFilterData]=useState()
    const [update,setUpdate]=useState(false)

    useEffect(()=>{
        const fetchPosts=async()=>{
            setLoading(true)
            const res = await axios.get('http://localhost:5000/users')
            setPosts(res.data);
            setLoading(false)
            setUpdate(false)
            sessionStorage.setItem("lastdata",res.data)
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
   
    return(
        <div className='contents'>
         
            <Header posts={currentPosts} filter={(data)=>{setFilterData(data)}} updates={(data)=>setUpdate(data)}/>
           
            <Display posts={filteredData || currentPosts} loading={loading}/>
            <div className='pagecontent'>
            {filteredData?<div></div>:
            
            <center ><Pagination
              // hideNavigation
              
              activePage={activePage}
              itemsCountPerPage={postPerPage}
              totalItemsCount={posts.length}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            
            /></center>
            }
        
      </div>
      </div>
        
    )
}

export default App
