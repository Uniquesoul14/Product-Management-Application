
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts} from '../slices/productSlice.js';
import ProductList from '../components/ProductsList.jsx';
import ProductForm from '../components/ProductForm.jsx';
import SearchFilter from '../components/Searchafilter.jsx';

const Home = () => {
  const dispatch = useDispatch();
  const { status, error, items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // get categories for dropdown 
  const categories = ['All', ...Array.from(new Set(items.map((p) => p.category)))];

  return (
    <div>
      <div>
        <ProductForm />
        <SearchFilter categories={categories} />
      </div>

      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p>Error: {error}</p>}

      <ProductList />
     
    </div>
  );
};

export default Home;
