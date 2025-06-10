import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const existing = state.products.find(
                (item) =>
                    item._id === action.payload._id &&
                    item.color === action.payload.color &&
                    item.size === action.payload.size
            );
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.products.push(action.payload);
            }
            state.quantity += action.payload.quantity;
            state.total += action.payload.price * action.payload.quantity;
        },
       removeProduct: (state, action) => {
    const { id, color, size } = action.payload;
    const product = state.products.find(
        (item) =>
            item._id === id && item.color === color && item.size === size
    );
    if (product) {
        state.quantity -= product.quantity;
        state.total -= product.price * product.quantity;
        
        // Додайте перевірку на від'ємні значення
        if (state.quantity < 0) state.quantity = 0;
        if (state.total < 0) state.total = 0;
        
        state.products = state.products.filter(
            (item) =>
                !(
                    item._id === id &&
                    item.color === color &&
                    item.size === size
                )
        );
    }
},
        increaseQuantity: (state, action) => {
            const { id, color, size } = action.payload;
            const product = state.products.find(
                (item) =>
                    item._id === id && item.color === color && item.size === size
            );
            if (product) {
                product.quantity += 1;
                state.quantity += 1;
                state.total += product.price;
            }
        },
        decreaseQuantity: (state, action) => {
            const { id, color, size } = action.payload;
            const product = state.products.find(
                (item) =>
                    item._id === id && item.color === color && item.size === size
            );
            if (product && product.quantity > 1) {
                product.quantity -= 1;
                state.quantity -= 1;
                state.total -= product.price;
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const {
    addProduct,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
