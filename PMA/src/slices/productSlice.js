
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = "http://localhost:3000/products";

// Thunks(api calls)
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await axios.get(API_URL);
  return res.data;
});
//for adding products
export const addProduct = createAsyncThunk('products/add', async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
});
//for updating products
export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
});
//for deleting products
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

// Initial state
const initialState = {
  items: [],
  error: null,
  searchQuery: '',
  selectedCategory: 'All',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});
//exporting thr reducer
export const { setSearchQuery, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;
