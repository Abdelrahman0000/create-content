
import React , {useState} from 'react';
import { useLocation, NavLink,Link } from 'react-router-dom';
import { List , X,Heart,Person,Cart} from 'react-bootstrap-icons'
export default function Sidebar() {
    
const [isClose , setClose]=useState(false)
  return (
    <nav className='sidebar' style={{left: isClose ? "0px" : "-250px",  boxShadow:isClose ? '0 0 0 100vw rgba(0, 0, 0, 0.7)':'none'}}>
    <div className="nav-inner ">
     
  

<span onClick={()=>setClose(!isClose)}> {isClose? <X/> :<List />  } </span>



    
    <ul className='my-row' >
        <li>
         <h6> <NavLink to="/">Create Content</NavLink> </h6>
        </li>
        <li>
        <h6>  <NavLink to="/mapForCovide">Covide Map</NavLink> </h6>
        </li>
     
      </ul>





    </div>
  </nav>
  )
}
