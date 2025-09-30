
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedCategory } from '../slices/productSlice.js';

const SearchFilter = ({ categories }) => {
  const dispatch = useDispatch();
  const { searchQuery, selectedCategory } = useSelector((state) => state.products);

  return (
    <div >
      <h3 className='fs-1 text-decoration-underline'>Search & Filter</h3>
    <div className='d-flex'> 
     <input
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}className="form-control m-2 w-25"
      />

      <select value={selectedCategory} onChange={(e) => dispatch(setSelectedCategory(e.target.value))} className="form-control m-2 w-25">
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};

export default SearchFilter;
