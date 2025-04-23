import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number,
    title: string,
    category: string,
    description: string,
    price: number,
    rating: number,
    stock: number,
    tags: [string],
    brand: string,
    dimensions: {
        width: number,
        height: number,
        depth: number
    },
    images: [string]

}
interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    images: [string];
}
interface CartState {
    items: CartItem[];
}


const getCart = (): CartItem[] => {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
};
const initialState: CartState = {
    items: getCart()
}

const setCart = (cart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart(state, action: PayloadAction<Product>) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) item.quantity + 1
            else {
                const newItem = {
                    id: action.payload.id,
                    title: action.payload.title,
                    price: action.payload.price,
                    quantity: 1,
                    images: action.payload.images,
                }
                state.items.push(newItem);
            }
            setCart(state.items);
        },
        removeFromCart(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload),
                setCart(state.items);
        },
        incQuantity(state, action: PayloadAction<number>) {
            const item = state.items.find(i => i.id === action.payload)
            if (item) item.quantity++;
            setCart(state.items);
            console.log(item);

        },
        decQuantity(state, action: PayloadAction<Number>) {
            const item = state.items.find(i => i.id === action.payload)
            if (item && item.quantity > 1) item.quantity--
            else state.items = state.items.filter(item => item.id !== action.payload)
            setCart(state.items);
        },
        removeItem(state, action: PayloadAction<Number>) {
             state.items = state.items.filter(item => item.id !== action.payload)
            setCart(state.items);
        },
        clearCart(state) {
            state.items = []
            localStorage.removeItem('cart');
        }

    }

});
export const { addCart, removeFromCart, incQuantity,removeItem, decQuantity, clearCart } = CartSlice.actions;
export default CartSlice.reducer