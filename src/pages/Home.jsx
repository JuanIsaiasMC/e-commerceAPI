import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsThunk, productCategorythunk, productDetailThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';




const home = () => {


    const [categories, setCategories] = useState([])


    const [searchValue, setSearchValue] = useState('')

    const navigate = useNavigate()

    const products = useSelector(state => state.products)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    useEffect(() => {
        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories')
            .then(res => setCategories(res.data))
    }, [])

    // console.log(products)

    const viewDetails = (product) => {
        navigate(`/product/${product.id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // console.log(categories)


    return (
        <div className='home__container'>
            <h2 className='categories__title'>categories</h2>
            <ul className='home__categories'>
                {categories.map(category => (
                    <li className='categories__item' key={category.id} onClick={() => dispatch(productCategorythunk(category.id))}>{category.name}</li>
                ))}
            </ul>
            <form className='home__form'>
                <input className='form__input' type="text" onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue} />
                <button className='home__button' onClick={() => dispatch(productDetailThunk(searchValue))}><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>

            <ul className='home__products-container'>
                {
                    products.map(product => (
                        <li className='home__products' key={product.id} onClick={() => viewDetails(product)}>
                            {/* <div className='home__product-title'> */}
                            <h2>
                                {product.title}
                            </h2>
                            {/* </div> */}

                            <div className='product__container-info'>
                                <figure className='home__img'>
                                    <img className='product__img' src={product.images[0].url} alt="prodcutimg" />
                                </figure>
                                <div className='home__product-info'>
                                    <div>
                                        <p>${product.price}</p>
                                    </div>
                                    <p className='home__button'>view details</p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div >
    );
};

export default home;