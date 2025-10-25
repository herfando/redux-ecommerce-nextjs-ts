import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
    id: number;
    title: string;
    price: number;
    img: string;           // gunakan 'img' bukan 'image'
    description?: string;
}

interface ProductState {
    products: Product[];
}

const initialState: ProductState = { products: [] };

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
