import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error?: string;
}

const initialState: ProductState = {
    products: [],
    loading: false,
};

// GET all products
export const fetchProducts = createAsyncThunk('product/fetch', async () => {
    const res = await fetch('https://dummyjson.com/products?limit=36');
    const data = await res.json();
    return data.products as Product[];
});

// GET by ID
export const fetchProductById = createAsyncThunk(
    'product/fetchById',
    async (id: number) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        return data as Product;
    }
);

// POST new product
export const createProduct = createAsyncThunk(
    'product/create',
    async (product: Omit<Product, 'id'>) => {
        const res = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        return res.json();
    }
);

// PUT/PATCH product
export const updateProduct = createAsyncThunk(
    'product/update',
    async (product: Product) => {
        const res = await fetch(`https://dummyjson.com/products/${product.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        return res.json();
    }
);

// DELETE product
export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (id: number) => {
        const res = await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' });
        return id;
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => { state.loading = true; })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, state => { state.loading = false; state.error = 'Failed to fetch products'; })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            })
            .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                state.products.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) state.products[index] = action.payload;
            });
    },
});

export default productSlice.reducer;
