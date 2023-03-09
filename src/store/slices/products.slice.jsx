import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';


export const prodcutsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            const products = action.payload
            return products
        }
    }
})


export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const productDetailThunk = (searchValue) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${searchValue}`)
        .then((res) => dispatch(setProducts(res.data)))
        .catch((error) => console.log(error))
        .finally(() => dispatch(setIsLoading(false)));
}

export const productCategorythunk = (categoryId) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${categoryId}`)
        .then((res) => dispatch(setProducts(res.data)))
        .finally(() => dispatch(setIsLoading(false)));
}
export const { setProducts } = prodcutsSlice.actions;

export default prodcutsSlice.reducer;

