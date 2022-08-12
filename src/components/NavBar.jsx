import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {
    const token = localStorage.getItem('token')

    //hacer una validacion del token para que abra el carrito si esta logeado


    const [menu, setMenu] = useState(false)
    const [body, setBody] = useState('')

    // window.reload

    const showCart = () => {
        if (token) {
            setMenu(!menu)

            if (!menu) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'scroll'
            }

        } else {
            navigate('/login')
        }



    }

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.setItem('token', '')
        navigate('/login')
    }


    return (
        <>
            <nav className='nav'>
                <h2 className='nav__title'>e-commerce</h2>

                <div className='nav__links'>
                    <Link className='nav__link' to='/'><i className="fa-solid fa-store"></i></Link>
                    <Link className='nav__link' to='/purchases'><i className="fa-solid fa-list-check"></i></Link>
                    {token ? (
                        <Link className='nav__link' to='' onClick={logOut}>
                            <i className="fa-solid fa-user-check"></i>
                        </Link>
                    ) : (
                        <Link className='nav__link' to='/login'><i className="fa-solid fa-user-xmark"></i></Link>
                    )}
                    <Link className='nav__link' to='' onClick={showCart}><i className="fa-solid fa-cart-shopping"></i></Link>
                </div>

            </nav>
            <Cart boton={showCart} menu={` ${menu ? 'aside-show' : ''}`} />
        </>

    )
};

export default NavBar;