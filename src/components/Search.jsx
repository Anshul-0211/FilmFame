import React from 'react'

const Search = ({searchItem , setSearchItem}) => {
  return (
    <div className='search'>
        <div>
            <img src="./search.svg" alt="search" />
            <input 
            type="text"
            placeholder='Seacrh thrssough the movies'
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search