
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../slices/productSlice.js';

const ProductItem = ({ product, onEdit, children }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (window.confirm('Delete this product?')) {
      await dispatch(deleteProduct(product.id)).unwrap();
    }
  };

  return (
    <div className="card w-75 h-75 m-4 p-3" >
      <div className="card-body" >
        <strong className="card-title fs-2 fw-bold">{product.title}</strong>
        <p className="card-subtitle mb-2 ">Category: {product.category}</p>
        <p className="card-text">Price: ₹{product.price}</p>
      </div>

      <div>
        <button onClick={onEdit} className="btn btn-warning m-2">Edit</button>
        <button onClick={handleDelete} className="btn btn-danger m-2">Delete</button>
      </div>

      {/* render inline children (edit form) if provided */}
      {children}
    </div>
  );
};

export default ProductItem;
