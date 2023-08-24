// import React from 'react'
// import{FaEdit,FaTrash} from'react-icons/fa'
// export default function List({item,removeitem,edit}) {
    
//   return (
//     <div className='grocery-list'>
// {item.map((x)=>{
//     const {id,title}=x;
//     return(<article className='grocery-item' >
//         <p className='title'>{title}</p>
//         <div className='btn-container'>
// <button className='edit-btn' type='button' onClick={()=>{
//     edit(id)
//    }} >
//     <FaEdit />
// </button>
// <button className='delete-btn' type='button' onClick={()=>removeitem(id)} >
//     <FaTrash />
// </button>
// </div>
//     </article>)
// })}
//     </div>
//   )
// }




import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function List({ items, removeItem, editItem, setShowBox }) {
  const editItem1 = (id) => {
    editItem(id);
    setShowBox(true);
  };

  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, firstName, lastName, status } = item;
        return (
          <article className='grocery-item' key={id}>
            <p className='title'>
          fullname :    {firstName} {lastName}
            </p>

            <div className='status-container'> <span style={{color:'#F465A8'}}> status : </span>
              {status === 'active' ? (
                <span className='status-active'></span> 
              ) : (
                <span className='status-inactive'>Inactive</span>
              )}
            </div>


            <div className='btn-container'>
              <button
                className='edit-btn'
                type='button'
                onClick={() => editItem1(id)}
              >
                <FaEdit />
              </button>
              <button
                className='delete-btn'
                type='button'
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          
          </article>
        );
      })}
    </div>
  );
}