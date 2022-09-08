import React from 'react';

const TotalPurchased = ({ item, }) => {



    const getTotal = product => {
        return product.productsInCart?.quantity * Number(product?.price)
    }

    const getTotalPurchased = () => {
        let total = 0
        item.cart.products.map(product => {
            total += product.productsInCart?.quantity * Number(product?.price)
        })

        return total

    }

    console.log(item)

    // item.cart.products.



    return (
        <li className='purchases__item' key={item.id}>
            <h2 className='item__created'>Purchase date {new Date(item.createdAt).toLocaleDateString()}</h2>
            {item.cart.products.map(product => (
                <div key={product.id} className='item__text'>
                    <h3 className='item__title' key={product.id}>{product.title}</h3>
                    <div className='item__info'>
                        <p>${product.price}</p>
                        <p>{product.productsInCart.quantity}</p>
                        <p>${getTotal(product)}</p>
                    </div>
                </div>

            ))}
            <div className='purchased__total'>
                <h3>Total purchased</h3>
                <h3>${getTotalPurchased()}</h3>
            </div>
        </li>

    );
};

export default TotalPurchased;