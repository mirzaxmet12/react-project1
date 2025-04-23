// hooks/useAddToCart.ts
import { useMutation } from 'react-query';
// api/cartApi.ts
const addToCart = async (cartData: {
    userId: number;
    products: { id: number; quantity: number }[];
}) => {
    const res = await fetch('https://dummyjson.com/carts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
    });

    if (!res.ok) {
        throw new Error('Savatga qo‘shishda xatolik');
    }

    return res.json();
};

export const useAddToCart = () => {
    return useMutation(addToCart, {
        onSuccess: (data) => {
            console.log('Savatga qo‘shildi:', data);
            alert('Mahsulot(lar) savatga qo‘shildi!');
        },
        onError: (error) => {
            console.error('Xatolik:', error);
            alert('Mahsulotni savatga qo‘shib bo‘lmadi.');
        },
    });
};
// components/AddToCartForm.tsx
import React from 'react';

const AddToCartForm = () => {
    const addToCart = useAddToCart();

    const handleAddToCart = () => {
        addToCart.mutate({
            userId: 5,
            products: [
                { id: 144, quantity: 4 },
                { id: 98, quantity: 1 },
            ],
        });
    };

    return <button onClick={handleAddToCart}>Savatga qo‘shish</button>;
};

export default AddToCartForm;

