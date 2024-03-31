import React from 'react';
import {Link,Outlet} from 'react-router-dom';

function PostLayout() {
  return (
    <>
      <Link to='/postpage/1'>POST1</Link>
        <br></br>
        <Link to='/postpage/2'>POST2</Link>
        <br></br>
         <Link to='/postpage/3'>POST3</Link>
        <br></br>
        <Link to='/postpage/newpost'>NewPost</Link>
        <Outlet/>

    </>
  )
}

export default PostLayout
