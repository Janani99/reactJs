import React,{useRef} from 'react';
import { FaPlus } from 'react-icons/fa'


function AddItem({ newItem, setNewItem, handleSubmit }) {
    const inputRef=useRef()

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor='addForm'>
                AddLabel
            </label>
            <input
            ref={inputRef}

                autoFocus
                id='addItem'
                type='text'
                placeholder='Add Item'
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                required
            />
            <button type='submit' aria-label='Add Iten' onClick={()=>inputRef.current.focus()}>
                <FaPlus></FaPlus>
            </button>


        </form>

    )
}

export default AddItem
