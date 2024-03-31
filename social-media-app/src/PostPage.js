import React from 'react'
import { Link, useParams } from 'react-router-dom'

function PostPage({ posts, handledelete }) {
   const {id} =useParams();
   const post =posts.find((post)=>(post.id).toString()===id);
   console.log("PostPage",post)
   return (
      <main className='PostPage'>
         <article className='post'>
            {
               post &&
               <>
                  <h2>{post.title}</h2>
                  <p className='postDate'>{post.dateTime}</p>
                  <p className='postBody'>{post.body}</p>
                  <button onClick={() => handledelete(post.id)}>
                     Delete post
                  </button>
               </>
            }
            {
               !post &&
               <>
                  <h2>Post Not found</h2>
                  <p>Well that's dispoinnting</p>
                  <Link to='/'>Visit the website again</Link>
               </>
            }
         </article>



      </main>
   )
}

export default PostPage
