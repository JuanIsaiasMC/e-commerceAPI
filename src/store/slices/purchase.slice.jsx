import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig'

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => {
            const purchases = action.payload
            return purchases
        }

    }
})

export const getPurchaseThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getConfig())
        .then((res) => dispatch(setPurchases(res.data)))
        .finally(() => dispatch(setIsLoading(false)));

    // toca hacerle un map depues de ese purchases para tomar todos los productos que agregue el usuario
}
export const { setPurchases } = purchaseSlice.actions;

export default purchaseSlice.reducer;
