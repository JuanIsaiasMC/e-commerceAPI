import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyCartThunk, cartThunk } from '../store/slices/cart.slice';




const Cart = ({ boton, menu, }) => {
    const dispatch = useDispatch()

    const cartProducts = useSelector(state => state.cart)

    const navigate = useNavigate()

    useEffect(() => {

        dispatch(cartThunk())

    }, [])


    const getTotal = product => {
        return product.quantity * Number(product.product.price)
    }

    const getTotalCart = (cartProducts) => {
        let total = 0
        cartProducts.map(product => {
            total += product.quantity * Number(product.product.price)
        })

        return total

    }

    console.log(cartProducts)
    return (
        <aside className={`cart ${menu}`}>
            <div className='close__cart-container'>

                <button className='close__cart' onClick={boton}><i className="fa-solid fa-cart-shopping close__cart-icon"></i></button>
            </div>
            <div className='cart__products-container'>

                <h2>My Cart</h2>
                <ul className='cart__products'>
                    {cartProducts.map(product => (
                        <li className='cart__product' key={product.product.id} onClick={() => navigate(`/product/${product.product.id}`)}>
                            <div className='cart__product-item'>
                                <h2 className='cart__product-title'>{product.product.title}</h2>
                                <div className='cart__product-info'>
                                    <p>${product.product.price}</p>
                                    <p>{product.quantity}</p>
                                    <p>${getTotal(product)}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='total__container'>

                    <h3 className='cart__product-total'>total cart</h3>
                    <h3> ${getTotalCart(cartProducts)}</h3>
                </div>
                <button className='cart__button' onClick={() => dispatch(buyCartThunk())}>buy all items</button>
            </div>
        </aside>
    );
};

export default Cart;