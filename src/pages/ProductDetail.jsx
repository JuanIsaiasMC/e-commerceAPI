import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductsInCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';



const ProductDetail = () => {
    const dispatch = useDispatch()
    const allProducts = useSelector(state => state.products)
    const [productDetail, setProductDetail] = useState({})
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)

    const { id } = useParams()

    useEffect(() => {
        const findProduct = allProducts.find(newProduct => newProduct.id === Number(id))
        setProductDetail(findProduct)

        const filteredProducts = allProducts.filter(newFilter => newFilter?.category.id === findProduct?.category.id)

        setSuggestedProducts(filteredProducts)
    }, [allProducts, id])

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    const addToCart = (e) => {
        e.preventDefault()
        const toCart = {
            id: productDetail.id,
            quantity: Number(quantity)
        }
        // console.log(toCart)
        dispatch(getProductsInCartThunk(toCart))
        cleanInput()
    }
    const cleanInput = () => {
        setQuantity(1)
    }

    //creamos el el slice y el thunk 




    console.log(suggestedProducts)

    return (
        <div className='detail__container'>
            <h1 className='detail__title'> Product detail </h1>
            <div className='detail__product'>
                <h2 className='detail__subtitle'>{productDetail?.title}</h2>
                <img className='detail__img' src={productDetail?.productImgs?.[0]} alt="" />
                <p className='detail__description'>{productDetail?.description}</p>
                <div>
                    <form className='form__container' onSubmit={addToCart}>
                        <p className='form__price'>${productDetail?.price}</p>
                        <div className='input__container'>
                            <input value={quantity} onChange={e => setQuantity(e.target.value)} className='form__input' type="number" min={1} />
                            <button className='form__button'><i class=" form__icon fa-solid fa-cart-plus"></i></button>
                        </div>
                    </form>
                </div>
            </div>

            <ul className='suggested__container'>
                {suggestedProducts.map(product => (
                    <li
                        // checar el scroll smoth
                        className='suggested__product' key={product.id} onClick={() => navigate(`/product/${product.id}`)} >
                        {/* checar si es necessario poner la img en dentro de un figure */}
                        <img className='suggested__img' src={product.productImgs[0]} alt="" />
                        <h2>
                            {product.title}
                        </h2>
                        {/* <p>
                            {product.description}
                        </p> */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetail;