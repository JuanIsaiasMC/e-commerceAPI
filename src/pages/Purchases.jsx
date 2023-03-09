import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getPurchaseThunk } from '../store/slices/purchase.slice';
import TotalPurchased from '../components/TotalPurchased';


const Purchases = () => {
    const dispatch = useDispatch()

    const purchase = useSelector(state => state.purchase)

    useEffect(() => {
        dispatch(getPurchaseThunk())
    }, [])


    // console.log(purchase);

    // const getTotal = product => {
    //     return product.productsInCart?.quantity * Number(product?.price)
    // }





    return (
        <article className='purchases'>
            <h2 className='purchases__title'> My purchases</h2>
            <ul className='purchases__items'>
                {purchase?.map(item => (
                    <TotalPurchased key={item.id} item={item} />
                ))}
                {/* <TotalPurchased purchase={purchase} /> */}
            </ul>

        </article>
    );
};

export default Purchases;