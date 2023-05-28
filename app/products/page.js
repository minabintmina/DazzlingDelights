"use client";
import React, { useState, useEffect, Suspense } from "react";
import ProductList from "@/components/productList";
import CategoryList from "@/components/categoryList";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/articles");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/categories");
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.categorie.name === selectedCategory)
        : products;


    return (
        <>
            <Suspense fallback={<p>Loading Categories...</p>}>
                <CategoryList
                    categories={categories}
                    onSelectCategory={handleCategorySelect}
                />
            </Suspense>
            <Suspense fallback={<p>Loading Products...</p>}>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 justify-center mx-auto gap-4 place-center flex-wrap w-100 md:max-w-[900px]">
                    {filteredProducts?.map((product) => (
                        <ProductList key={product._id} product={product} />
                    ))}

                </div>
            </Suspense>
        </>
    );
};

export default ProductsPage;
