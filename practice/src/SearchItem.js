import React from 'react'

function SearchItem({search,setSearch}) {
  return (
    <form className='searchForm' onSubmit={(e)=>{
        e.preventDefault()
    }}>  
<label htmlFor='searchForm'></label>
<input 
id='search' 
type='text' 
role='searchBox' 
placeholder='search Items'
value={search}
onChange={(e)=>setSearch(e.target.value)}
></input>
    </form>
  )
}

export default SearchItem
