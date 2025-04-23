import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {  useAppSelector } from '../store'
import {  setData } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'


const URL = 'https://dummyjson.com'

export const useAuthLogin = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.get('token')
        if (!token) return;

        axios.get('https://dummyjson.com/auth/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(setData(res.data));
            })
            .catch(err => {
                console.log(err);
            });
    }, [dispatch])
}

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ username, password }: { username: string, password: string }) =>
            axios.post(`${URL}/auth/login`, {
                username,
                password,
                expiresInMins: 30
            }).then(res => res.data),
    })
}

export const useCart = () => {
    const cartId = localStorage.getItem('id')
    console.log(cartId);
    return useQuery(['cart', cartId], async () => {
        const res = await axios.get(`${URL}/carts/${cartId}`)
        return res.data
    })
}

export const useAddToCart = () => {
    const cartId = localStorage.getItem('id')
    console.log(cartId);
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, quantity }: { id: number, quantity: number }) =>
            axios.put(`${URL}/carts/${cartId}`, {
                merge: true,
                products: [{ id, quantity }],
            }).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', cartId])
        }
    })
}

export const useUpdateCartItem = () => {
    const cartId = localStorage.getItem('id')
    console.log(cartId);
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, quantity }: { id: number, quantity: number }) =>
            axios.put(`${URL}/carts/${cartId}`, {
                merge: true,
                products: [{ id, quantity }],
            }).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', cartId])
        }
    })
}

export const useDeleteCartItem = () => {
    const cartId = useAppSelector((state) => state.auth.id)
    console.log(cartId);
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id: number) =>
            axios.put(`${URL}/carts/${cartId}`, {
                merge: true,
                products: [{ id, quantity: 0 }],
            }).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', cartId])
        }
    })
}
