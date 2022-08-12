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
        return product.productsInCart?.quantity * Number(product?.price)
    }

    const getTotalCart = (cartProducts) => {
        let total = 0
        cartProducts.map(product => {
            total += product.productsInCart?.quantity * Number(product?.price)
        })

        return total

    }

    // console.log(cartProducts)
    return (
        <aside className={`cart ${menu}`}>
            <button className='close__cart' onClick={boton}><i className="fa-solid fa-cart-shopping close__cart-icon"></i></button>
            <h2>My Cart</h2>
            <ul className='cart__products'>
                {cartProducts.map(product => (
                    <li className='cart__product' key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                        <div className='cart__product-item'>

                            <h2 className='cart__product-title'>{product?.title}</h2>
                            <div className='cart__product-info'>
                                <p>${product?.price}</p>
                                <p>{product.productsInCart?.quantity}</p>
                                <p>${getTotal(product)}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div>

                <h3 className='cart__product-total'>total cart {getTotalCart(cartProducts)}</h3>
            </div>
            <button onClick={() => dispatch(buyCartThunk())}>buy all items</button>
        </aside>
    );
};

export default Cart;