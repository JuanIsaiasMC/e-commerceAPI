
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

    // images slider
    const [currentImg, setCurrentImg] = useState(0)

    const imgLength = productDetail?.images?.length
        // console.log(imgLength)
        ;
    const nextImg = () => {
        setCurrentImg(currentImg === imgLength - 1 ? 0 : currentImg + 1)
    }

    const prevImg = () => {
        setCurrentImg(currentImg === 0 ? imgLength - 1 : currentImg - 1)
    }



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
            quantity: Number(quantity),
            productId: Number(productDetail.id)

            // "{\"productId\":2,\"quantity\":1}"
        }
        // console.log(toCart)
        dispatch(getProductsInCartThunk(toCart))
        cleanInput()
    }
    const cleanInput = () => {
        setQuantity(1)
    }

    const viewDetails = (product) => {
        navigate(`/product/${product.id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }



    // console.log(suggestedProducts) 
    // console.log(productDetail.images)
    return (
        <div className='detail__container'>
            <h1 className='detail__title'> Product detail </h1>
            <div className='detail__product'>
                <div className="detail__slide">


                    <div className='img__container'>

                        {productDetail?.images?.map((imagen, index) => {
                            return (
                                <div key={index} className={currentImg === index ? 'slide active' : 'slide'}>{
                                    index === currentImg && (
                                        <img key={index} className='detail__img' src={imagen.url} alt="product image" />
                                    )
                                }

                                </div>
                            )
                        }
                        )}
                    </div>
                    <div className='slide__buttons'>
                        <button className='slide__button' onClick={prevImg}>prev</button>

                        <button className='slide__button' onClick={nextImg}>next</button>
                    </div>
                </div>
                <div className="detail__text">

                    <h2 className='detail__subtitle'>{productDetail?.title}</h2>
                    <p className='detail__description'>{productDetail?.description}</p>


                    <form className='form__container' onSubmit={addToCart}>
                        <p className='form__price'>${productDetail?.price}</p>
                        <div className='input__container'>
                            <input value={quantity} onChange={e => setQuantity(e.target.value)} className='form__input' type="number" min={1} />
                            <button className='form__button'><i className=" form__icon fa-solid fa-cart-plus"></i></button>
                        </div>
                    </form>
                </div>
            </div >

            <h2>View similar products</h2>
            <ul className='suggested__container'>
                {suggestedProducts.map(product => (
                    <li
                        className='suggested__product' key={product.id} onClick={() => viewDetails(product)} >
                        <h2>
                            {product.title}
                        </h2>
                        <img className='suggested__img' src={product.images?.[0].url} alt="" />
                        <p className='suggested__text'>view detail</p>
                        {/* </div> */}
                        {/* <p>
                            {product.description}
                        </p> */}
                    </li>
                ))}
            </ul>
        </div >
    );
};

export default ProductDetail;