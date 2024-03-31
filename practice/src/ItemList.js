import React from 'react';
import {FaTrashAlt} from 'react-icons/fa'


function ItemList({items,handleCheck,handledelete}) {
  return (
    <ul>
    {items.map((item,idx)=>
   { return(
        <li className="item" key={idx}>
                <input type='checkbox' checked={item.checked} onChange={()=>handleCheck(item.id)}/>
                 <label style={(item.checked)?
                 {
                   textDecoration:"line-through"
                 }:null
                 }
                  onDoubleClick={()=>handleCheck(item.id)}>{item.item}</label>
                {/* <button>Delete</button> */}
                <FaTrashAlt role="button" tabIndex={0} onClick={()=>{handledelete(item.id)}}/>
           </li>
   )
    })}
</ul>
  )
}

export default ItemList
