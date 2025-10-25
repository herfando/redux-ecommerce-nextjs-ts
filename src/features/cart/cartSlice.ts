import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../product/productSlice';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

// Ambil cart dari localStorage saat init
const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
const initialState: CartState = { items: savedCart ? JSON.parse(savedCart) : [] };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) item.quantity += 1;
            else state.items.push({ ...action.payload, quantity: 1 });
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(i => i.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            localStorage.removeItem('cart');
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
