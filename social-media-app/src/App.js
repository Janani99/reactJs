// import About from './About';
// import './App.css';
// import Header from './Header';
// import Home from './Home';
// import NewPost from './NewPost';
// import Post from './Post';
// import PostPage from './PostPage';
// import Missing from './Missing';
// import { Routes, Route, Link } from 'react-router-dom'
// import PostLayout from './PostLayout';


// function App() {
//   return (
//     <div className="App">
//       <nav>
//         <ul>
//           <li><Link to='/'>Home</Link></li>
//           <li><Link to='/about'>About</Link></li>
//           {/* <li><Link to='/newPost'>NewPost</Link></li> */}
//           <li><Link to='/postpage'>POSTPAGE</Link></li>

//         </ul>
//       </nav>
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/about' element={<About />} />
//         <Route path='/newPost' element={<NewPost />} />
//         <Route path='/postpage' element={<PostLayout/>} >
//            <Route  index element={<PostPage />} />
//         <Route path=':id' element={<Post />} />
//         <Route path='newpost' element={<NewPost />} />


//         </Route>

//         {/* <Route path='/postpage' element={<PostPage />} />
//         <Route path='/postpage/:id' element={<Post />} /> */}
//         <Route Path='*' element={<Missing />} />
//       </Routes>
//       {/* <Header/>
//       <Nav/>
//       <Home/>
//       <NewPost/>
//       <PostPage/>
//       <About/>
//       <Missing/>
//       <Footer/> */}

//     </div>
//   );
// }

// export default App;


import About from './About';
import './App.css';
import Header from './Header';
import Home from './Home';
import NewPost from './NewPost';
import Post from './Post';
import PostPage from './PostPage';
import Missing from './Missing';
import Nav from './Nav';
import Footer from './Footer';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import PostLayout from './PostLayout';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/post'



function App() {
  const [posts, setPosts] = useState([]);
  // const [posts, setPosts] = useState([
  //   {
  //     "id": 1,
  //     "title": "My First Post",
  //     "dateTime": "July 01, 2021 11:17:36 AM",
  //     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  //   },
  //   {
  //     "id": 2,
  //     "title": "My Second Post",
  //     "dateTime": "July 01, 2021 11:17:36 AM",
  //     "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  //   },
  //   {
  //     "id": 3,
  //     "title": "My third Post",
  //     "dateTime": "July 01, 2021 11:17:36 AM",
  //     "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  //   },
  //   {
  //     "id": 4,
  //     "title": "My Fourth Post",
  //     "dateTime": "July 01, 2021 11:17:36 AM",
  //     "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
  //   }]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, dateTime, body: postBody };
    try {
      const response = await api.post('/posts', newPost)
      const allPost = [...posts, response.data];
      setPosts(allPost);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    }
    catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers)
      }
      else {
        console.log(`Error: ${err.message}`)
      }

    }



  }
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data)
      }
      catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers)
        }
        else {
          console.log(`Error: ${err.message}`)
        }

      }
    }
    (async () => await fetchPost())()
  }, []);
  useEffect(() => {
    console.log(posts)
    const filteredResults = posts.filter((post) => {
      //  console.log("useEffe",post)
      (((post['body']).toLowerCase()).includes(search.toLowerCase()) ||
        ((post['title']).toLowerCase()).includes(search.toLowerCase()))

    });

    setSearchResult(filteredResults.reverse());
    console.log("useEffectuseEffect", filteredResults);
  }, [posts, search]);
  const handledelete = async (id) => {
    try {
      await api.delete(`posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/')
    }
    catch (err) {
      console.log(` Error : ${err.message}`)
    }
    console.log('handlesSubmit')
  }
  const handleEdit= async (id)=>{

    const dateTime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, dateTime, body: editBody };
    try{
      const response =api.put(`/posts/${id}`,updatedPost);
      setPosts(posts.map((post)=>post.id===id?{...response.data}:post));
      setEditTitle('');
      setEditBody('');
      navigate('/')

    }
    catch (err) {
      console.log(` Error : ${err.message}`)
    }
  }

  return (
    <div className="App">

      <Header title={'SOCIAL MEDIA'} />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path='/' element={<Home posts={posts} />} />
        <Route path='post'>
          <Route index element={<NewPost handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=':id' element={<PostPage posts={posts} handledelete={handledelete} />} />
        </Route>
        {/* <PostPage /> */}
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />


      </Routes>
      <Footer />

    </div>
  );
}

export default App;
