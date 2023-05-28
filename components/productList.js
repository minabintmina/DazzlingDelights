"use client";
import React, { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import Link from 'next/link';
import { useSession } from "next-auth/react";
const ProductList = ({ product }) => {
    const{session} =useSession()
    const { addItem } = useShoppingCart();

    const [quantity, setQuantity] = useState(1);
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };
    const addToCart = () => {

            addItem(product, { count: quantity });
            setQuantity(1);

        
    };
    return (

        <article className="flex flex-col bg-white rounded-xl shadow-md text-center mb-6">
            <div className="text-8xl cursor-default">
                <img
                    src={product?.images}
                    className="card-img-top p-3"
                    alt={product?.title}
                />
            </div>
            <div className="text-black">
                <p className="small">{product?.categorie.name}</p>
            </div>
            <Link href={`/products/${product?._id}`}>
                <div className="text-black text-lg">{product?.title}</div>
            </Link>
            <div className="text-black text-2xl font-semibold mt-auto">{product?.price} $ </div>
            <div className="flex justify-around items-center mt-4 mb-2 ">
                <button
                    onClick={decreaseQuantity}
                    className="hover:text-emerald-500 text-black hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500"
                >
                    -
                </button>
                <span className="w-10 text-center text-black rounded-md mx-3">{quantity}</span>
                <button
                    onClick={increaseQuantity}
                    className="hover:text-emerald-500 text-black hover:bg-emerald-50 w-8 h-8 rounded-full transition-colors duration-500">
                    +
                </button>
            </div>
            <button onClick={() => addToCart()}
                className="bg-orange-200 hover:bg-black hover:text-white transition-colors duration-500 text-orange-500 rounded-md px-5 py-2">
                Add to cart
            </button>
        </article>

    );
}
export default ProductList;