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
    const [quantity, setQuantity] = useState('')

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




    // console.log(productDetail)

    return (
        <div>
            <h1>hola product detail </h1>
            <h1>{productDetail?.title}</h1>
            <img className='productDetail__img' src={productDetail?.productImgs?.[0]} alt="" />
            <p>{productDetail?.description}</p>
            <p>{productDetail?.price}</p>


            <div>
                <h3>add to cart</h3>
                <form onSubmit={addToCart}>
                    <input value={quantity} onChange={e => setQuantity(e.target.value)} className='input' type="number" min={1} />
                    <button>add</button>
                </form>
            </div>

            <ul>
                {suggestedProducts.map(product => (
                    <li key={product.id} onClick={() => navigate(`/product/${product.id}`)} ><h2>{product.title}</h2>
                        <p>{product.description}</p></li>
                ))}
            </ul>
        </div>
    );
};

export default ProductDetail;