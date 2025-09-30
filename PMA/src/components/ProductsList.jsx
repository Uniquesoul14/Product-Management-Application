
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductItem from '../components/ProductItem.jsx';
import ProductForm from '../components/ProductForm.jsx';

const ProductList = () => {
  const { items, searchQuery, selectedCategory } = useSelector((state) => state.products);

  // store selected product id
  const [editingId, setEditingId] = useState(null);

  // filter + search (both working together)
  const filtered = items.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h3 className='fs-1'>Products ({filtered.length})</h3>

      {filtered.length === 0 && <p>No products match your search/filters.</p>}

      <div>
        {filtered.map((p) => (
          <ProductItem key={p.id} product={p} onEdit={() => setEditingId(p.id)} onCloseEdit={() => setEditingId(null)}>
         
            {editingId === p.id && (
              <ProductForm editingProduct={p} onFinish={() => setEditingId(null)} />
            )}
          </ProductItem>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
