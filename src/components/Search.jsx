import React from 'react'

const Search = ({searchItem , setsearchItem}) => {
  return (
    <div className='search'>
        <div>
            <img src="./search.svg" alt="search" />
            <input 
            type="text"
            placeholder='Seacrh through the movies'
            value={searchItem}
            onChange={(e) => setsearchItem(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Search