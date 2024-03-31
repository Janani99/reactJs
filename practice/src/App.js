// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import Content from "./Content";
import Header from "./Header";
import Footer from './Footer';
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";
function App() {
  //   const [items,setItems]=useState([
  //     {id:1,checked:true,item:"practice Coding"},
  //     {id:2,checked:false,item:"Play Cricket"},
  //     {id:3,checked:false,item:"Read about AI"}
  // ]);
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);

  //const [items,setItems]=useState(JSON.parse(localStorage.getItem('todo_list'))||[]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchErr,setFetchErr]=useState(null);
  const [isLoading,setIsLoading]=useState(true);


  const handleCheck =async (id) => {
    console.log(id)
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems)
    const myItems=listItems.filter((item)=>item.id==id);
    const updateOptions={
      method:'PATCH',
      Header:{
        'Content-Type':'application/json'
      },
  
      body:JSON.stringify({checked:myItems[0].checked})
    }
    const reqUrl =`${API_URL}/${id}`
    const result = await apiRequest(reqUrl,updateOptions);
    if(result)
    {
      setFetchErr(result)
    }
    
   //localStorage.setItem("todo_list", JSON.stringify(listItems))
  }
  const handledelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions={
      method:'DELETE',
        
    }
    const reqUrl =`${API_URL}/${id}`
    const result = await apiRequest(reqUrl,deleteOptions);
    if(result)
    {
      setFetchErr(result)
    }

    //localStorage.setItem("todo_list", JSON.stringify(listItems))


  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted")

    if (!newItem) return;
    //add
    addItem(newItem);

    setNewItem('');
  }
  const addItem = async   (item) => {
    const id = items.length ? Number(items[items.length - 1].id) + 1 : 1
    const addNewItem = { id, checked: false, item };
    const listItems = [...items, addNewItem];
    setItems(listItems);
    const postOptions={
      method:'POST',
      Header:{
        'Content-Type':'application/json'
      },
  
      body:JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL,postOptions);
    if(result)
    {
      setFetchErr(result)
    }
   // localStorage.setItem("todo_list", JSON.stringify(listItems))
  }
  // function handleNameChange() {
  //   const names = ['Earn', 'grow', 'give'];
  //   const int = Math.floor(Math.random() * 3);
  //   return names[int];

  // }
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('data Not Received')
        const listItems =await response.json();
        setItems(listItems);
        setFetchErr((null))
      }
      catch (err){
        setFetchErr(err.message)
       // console.log('error',err.message)
   }
      finally{
        setIsLoading(false)
      }
    }
   ( async () => await fetchItem())()
    //setItems(JSON.parse(localStorage.getItem('todo_list')))

    console.log("rendering....")
  }, [])
  return (
    <div>
      <Header title={'TODOLIST'} />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} />
      <SearchItem search={search} setSearch={setSearch} />
    <main>
      {isLoading && <p>Loading Items....</p>}
      {fetchErr&& <p>{`Error:${fetchErr}`}</p>}
     {!isLoading && !fetchErr&& <Content
        items={items.filter((item) => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handledelete={handledelete}
      />}
      </main>
      <Footer />


      {/* React js Practice
      <p>
        Let's {handleNameChange()}
      </p> */}
    </div>
  )

}
export default App;
