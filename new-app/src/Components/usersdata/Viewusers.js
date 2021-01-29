import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './display.scss'
import Display from './Displayusers'
import Header from './Header'
import Pagination from "react-js-pagination";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'



const App=()=>{
    const [posts,setPosts] =useState([])
    const [loading,setLoading] = useState(false)
    // const [currentPage,setCurrentpage] = useState(1)
    const [postPerPage] = useState(500);
    const [activePage,setActivePage] = useState(8)
    const [filteredData,setFilterData]=useState()
    sessionStorage.setItem('update',false)
    const [update,setUpdate]=useState(sessionStorage.getItem('update'))

    useEffect(()=>{
        const fetchPosts=async()=>{
            setLoading(true)
            const res = await axios.get('http://localhost:5000/users')
            setPosts(res.data);
            setLoading(false)
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
        {posts.length > 50?
        <div className='contents'>
         
            <Header posts={currentPosts} alldata={posts} filter={(data)=>{setFilterData(data)}} />
           
            <Display posts={filteredData || currentPosts}  loading={loading} updates={(data)=>{setUpdate(data)}}/>
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
      </div>:
      <center><Loader
            type="Grid"
            color="red"
            height={100}
            width={100}
            timeout={3000} //3 secs

        /></center>}
      </React.Fragment>
        
    )
}

export default App
