import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cart.slice'
import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import purchaseSlice from './slices/purchase.slice'

export default configureStore({
    reducer: {
        isLoading: isLoadingSlice,
        products: productsSlice,
        purchase: purchaseSlice,
        cart: cartSlice,
    }
})
