import { useEffect } from 'react';
import { useState } from "react";
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import {fetchAllUser} from '../services/UserServices'
import ReactPaginate from 'react-paginate';


const TableUsers = (props) =>{
        const [listUsers, setlistUsers] = useState([]);
        const [totalUsers, setTotalUsers] = useState(0);
        const [totalPages, setTotalPages] = useState(0);

    useEffect(() =>{

        getUsers(1);
        
           
    },[])

    const getUsers = async  (page) =>{
        let res = await fetchAllUser(page);
        if (res && res.data ){
          setTotalUsers(res.total)
          setTotalPages(res.total_pages)
            setlistUsers(res.data)
            
        }
        
    }
    const handlePageClick = (event) =>{
      getUsers(+event.selected + 1);
    } 

    return (<>
    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>EMAIL</th>
          <th>first Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) =>{
               
                return(
                    <tr key={`users-${index}`}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>    
                   </tr>
                )
            })
        }
        
      </tbody>
    </Table>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
       
    
  
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
       
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
    



      />
    
    </>)
}

export default TableUsers;