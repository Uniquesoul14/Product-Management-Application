
import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { addProduct, updateProduct } from '../slices/productSlice.js';

/*
 This form has both Add and Edit functionality.
*/

const ProductForm = ({ editingProduct = null, onFinish = () => {} }) => {
  const dispatch = useDispatch();
 
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price);
    }
  }, [editingProduct]);

  const reset = () => {
    setTitle('');
    setCategory('');
    setPrice('');
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !category || !price) return alert('Please fill all fields');
    const product = { title, category, price: Number(price) };
    await dispatch(addProduct(product)).unwrap();
    reset();
    onFinish();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    await dispatch(updateProduct({ id: editingProduct.id, data: { title, category, price: Number(price) } })).unwrap();
    reset();
    onFinish();
  };

  return (
    <div>
      <h3 className='fs-1 text-decoration-underline'>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
      <form onSubmit={editingProduct ? handleUpdate : handleAdd} >
        <label className="form-label fs-5">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product title" className="form-control"/>

        <label className="form-label fs-5">Category</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder=" Product Category" className="form-control"/>

        <label className="form-label fs-5">Price</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder=" Product Price" className="form-control"/>

        <button type="submit" className="btn btn-dark m-3 w-50">{editingProduct ? 'Update' : 'Add product'}</button>
        {editingProduct && <button type="button" onClick={() => { reset(); onFinish(); }}>Cancel</button>}
      </form>
    </div>
  );
};

export default ProductForm;
