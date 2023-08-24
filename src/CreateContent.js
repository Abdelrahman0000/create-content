// import React, { useEffect, useState } from 'react'
// import List from './List';
// import Alert from './Alert'

// const mylocelstorage=()=>{
// let list =localStorage.getItem('list');
// if(list){
//   return JSON.parse(localStorage.getItem('list'))
// }
// else{
//   return [];
// }

// }

// export default function CreateContent() {
// const [name,setName]=useState('');
// const[list,setlist]=useState(mylocelstorage());
// const [edit,setEdit]=useState(false);
// const[editID,setEditID]=useState(null)
// const [alert,setAlert]=useState({show:false,msg:'',type:''})
// const handelevent=(e)=>{
// e.preventDefault();
// if(!name){
//   showalert(true,'danger','please enter value')
// }
// else if(name && edit){
// setlist(
//   list.map((item)=>{
//     if(item.id===editID){
//       return({...item,title:name})
//     }
//     return item;
//   })
// )
// setName('');
// setEditID(null);
// setEdit(false)
// showalert(true,'success','value changed')
// }
// else{
//   showalert(true,'success','item added to list')
//   const newitem={id: new Date().getTime().toString(),
//   title:name
//   }
//   setlist([...list,newitem]);
//   setName('');
// }
// }
// const showalert=(show=false,type='',msg='')=>{
//   setAlert({show,msg,type});
// }
// const clearlist=()=>{ showalert(true,'danger','empty list')
// setlist([])
// }
// const removeitem=(id)=>{
//   showalert(true,'danger','item removed');
//   const newlist=list.filter((item)=>item.id !==id);
//   setlist(newlist)
// }
// const editItem=(id)=>{
// const spicefcitem=list.find((item)=>item.id ===id);
// setEdit(true)
// setEditID(id);
// setName(spicefcitem.title)
// }
// useEffect(()=>{
//   localStorage.setItem('list',JSON.stringify(list))
// },[list])
//   return (
//  <section className='section-center' >
//      <form className='grocery-form' onSubmit={handelevent}>
//        {alert.show&&<Alert {...alert} removeallert={showalert} list={list} />}
//        <h3>grocery bud</h3>
//        <div className='form-control'>
//          <input className='grocery' type='text' placeholder='e.g. eggs' value={name} onChange={(e)=>setName(e.target.value)} />
//          <button type='submit' className='submit-btn' >
//            {edit?'edit':'submit'}
//          </button>
//        </div>
//      </form>
//      { list.length>0 &&
//      <div className='grocery-container'>
//          <List item={list} removeitem={removeitem} edit={editItem} />
//          <button className='clear-btn' onClick={clearlist}>clear items</button>
//      </div>
// }
//  </section>
//   )
// }








import React, { useEffect, useState } from 'react';
import List from './List';
import Alert from './Alert';

const myLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

export default function CreateContent() {
  const [showBox, setShowBox] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('');
  const [list, setList] = useState(myLocalStorage());
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  
  const handleEvent = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !status) {
      showAlert(true, 'danger', 'Please enter all values');
    } else if (firstName && lastName && status && edit) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, firstName, lastName, status };
          }
          return item;
        })
      );
      setFirstName('');
      setLastName('');
      setStatus('');
      setEditID(null);
      setEdit(false);
      showAlert(true, 'success', 'Value changed');
      setShowBox(false); // Hide the FormBox after successful edit
    } else {
      setShowBox(false);
      showAlert(true, 'success', 'Item added to list');
      const newItem = {
        id: new Date().getTime().toString(),
        firstName,
        lastName,
        status,
      };
      setList([...list, newItem]);
      setFirstName('');
      setLastName('');
      setStatus('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, 'danger', 'Empty list');
    setList([]);
    setShowBox(false);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item removed');
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEdit(true);
    setEditID(id);
    setFirstName(specificItem.firstName);
    setLastName(specificItem.lastName);
    setStatus(specificItem.status);
    setShowBox(true); // Show the form when editing
  };

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <section className='section-center'>
      <button onClick={() => setShowBox(true)} className='submit-btn create-btn'>
        Create
      </button>

      <section className={`FormBox`} style={{ display: showBox ? 'block' : 'none' }}>
        <form className='grocery-form' onSubmit={handleEvent}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <h3>Grocery Bud</h3>
          <div className='form-control'>
            <input
              className='grocery'
              type='text'
              placeholder='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className='grocery'
              type='text'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className='check-inner'>
              <p style={{marginLeft:'9px'}}> status: </p>
              <label>
                <input
                  type='checkbox'
                  checked={status === 'active'}
                  onChange={() => setStatus('active')}
                />
                Active
              </label>
              <label>
                <input
                  type='checkbox'
                  checked={status === 'inactive'}
                  onChange={() => setStatus('inactive')}
                />
                Inactive
              </label>
            </div>
            <button type='submit' className='submit-btn'>
              {edit ? 'Edit' : 'Submit'}
            </button>
          </div>
        </form>
      </section>

      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem} setShowBox={setShowBox} />
          <button className='clear-btn' onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}






