// import React,{useState} from 'react';

// const Content = () => {

//     function namee()
//     {
//         console.log("rendering......namee function");
//     }
//     let array=['Earn', 'grow', 'give'];;
//     const [count,setCount]=useState(0);
//    // const [name1,setname1]=useState(namee())// avid using like this it calls every times while changing the another state ,use the code like this
//    //const [name1,setname1]=useState(()=>name())// this line of code runs one  time 

//     function handleNameChange() {
//     const int = Math.floor(Math.random() * 3);
//     setCount(int)
//         //setNames([names[int]])
//         // const names = ['Earn', 'grow', 'give'];
//         // const int = Math.floor(Math.random() * 3);
//         // return names[int];

//     }
//     const handleclick=()=>{
//         console.log("subscribe the buttons")
//     }
//     const handleclick2=()=>{
//         console.log("subscribe the buttons")
//     }
//     return (
//     <main>
//         <p style={{userSelect:'none'}} onDoubleClick={()=>{console.log("doubleClick")}}>
//             Let's  {array[count]}
//         </p>
//         <button onClick={()=>handleNameChange()}></button>
//         </main>
//     )

// }

// export default Content;


import React,{useState} from 'react';
import {FaTrashAlt} from 'react-icons/fa'
import ItemList from './ItemList';


function Content({items,handleCheck,handledelete}) {
//     const [items,setItems]=useState([
//     {id:1,checked:true,item:"practice Coding"},
//     {id:2,checked:false,item:"Play Cricket"},
//     {id:3,checked:false,item:"Read about AI"}
// ]);


// const handleCheck=(id)=>{
//     console.log(id)
// const listItems=items.map((item)=>
// item.id===id?{ ...item,checked:!item.checked}:item);
// setItems(listItems)
// localStorage.setItem("todo_list",JSON.stringify(listItems))
// // setItems((prevw))
//    // console.log(`id:${id}`)

// }
// const handledelete=(id)=>{
//     const listItems=items.filter((item)=>item.id!==id);
//     setItems(listItems);
//     localStorage.setItem("todo_list",JSON.stringify(listItems))


// }
  return (
     <>
         {items.length>0?
         <ItemList items={items} 
         handleCheck={handleCheck} 
         handledelete={handledelete}/>
       :
         <p>list is empty</p>
                }
     </ >
  )
}

export default Content
