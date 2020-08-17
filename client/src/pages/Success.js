import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Jumbotron from '../components/Jumbotron';
import { idbPromise } from '../utils/helpers';
import { ADD_ORDER } from '../utils/mutations';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map(item => item._id);

            if (products.length) {
                // add order to history
                const { data } = await addOrder({ variables: { products }});
                const productData = data.addOrder.products;

                // clear all data from the cart
                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item);
                });
            }
        }

        saveOrder();

        setTimeout(function(){window.location.assign('/')}, 3000);
    }, [addOrder]);

    return (
        <div>
            <Jumbotron>
                <h1>Success!</h1>
                <h2>
                    Thank you for your purchase!
                </h2>
                <h2>
                    You will now be redirected to the home page
                </h2>
            </Jumbotron>
        </div>
    );
};

export default Success;