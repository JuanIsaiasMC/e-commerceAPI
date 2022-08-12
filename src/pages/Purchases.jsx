import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getPurchaseThunk } from '../store/slices/purchase.slice';

const Purchases = () => {
    const dispatch = useDispatch()

    const purchase = useSelector(state => state.purchase)

    useEffect(() => {
        dispatch(getPurchaseThunk())
    }, [])

    const getTotal = product => {
        return product.productsInCart?.quantity * Number(product?.price)
    }



    // const getTotalCart = (purchase) => {
    //     let total = 0

    //     // purchase.map(product => {
    //     //     total += product.productsInCart?.quantity * Number(product?.price)
    //     // })

    //     return total

    // }

    // console.log(purchase.map(item => item))

    // console.log(purchase.map(item => item.cart.products.map(product => product.price)))

    // console.log(purchase.map(item => item.cart.products.map(product => product.productsInCart.quantity)))


    // console.log(getTotalCart)
    return (
        <article className='purchases'>
            <h2 className='purchases__title'> My purchases</h2>
            <ul className='purchases__items'>
                {purchase?.map(item => (
                    <li className='purchases__item' key={item.id}>
                        <h2 className='item__created'>{item.createdAt}</h2>
                        {item.cart.products.map(product => (
                            <div className='item__text'>
                                <h3 className='item__title' key={product.id}>{product.title}</h3>
                                <div className='item__info'>
                                    <p>${product.price}</p>
                                    <p>{product.productsInCart.quantity}</p>
                                    <p>${getTotal(product)}</p>
                                </div>
                            </div>
                        ))}
                        <h3>Total purchased</h3>
                    </li>
                ))}
            </ul>

        </article>
    );
};

export default Purchases;