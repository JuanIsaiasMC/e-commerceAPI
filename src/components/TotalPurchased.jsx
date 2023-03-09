import React from 'react';

const TotalPurchased = ({ item }) => {



    // const getTotal = product => {
    //     return product.product.quantity * Number(product?.price)
    // }

    const getTotal = (item) => {
        const resultTotal = item.quantity * Number(item.product.price)
        return resultTotal

    }

    const getTotalPurchased = () => {
        let total = item.quantity * Number(item.product.price)
        return total
    }

    //     return total

    // }

    // console.log(item)

    // item.cart.products.



    return (
        <li className='purchases__item' key={item.id}>
            <h2 className='item__created'>Purchase date {new Date(item.createdAt).toLocaleDateString()}</h2>
            <div key={item.product.id} className='item__text'>
                <h3 className='item__title' key={item.product.id}>{item.product.title}</h3>
                <div className='item__info'>
                    <p>${item.product.price}</p>
                    <p>{item.quantity}</p>
                    <p>${getTotal(item)}</p>
                </div>
            </div>


            <div className='purchased__total'>
                <h3>Total purchased</h3>
                <h3>${getTotalPurchased()}</h3>
            </div>
        </li>

    );
};

export default TotalPurchased;