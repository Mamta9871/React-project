import React, { useEffect, useState } from 'react';

const Seller = () => {
    const [seller, setSeller] = useState({
        productInput: "",
        sellingInput: "",
        productNameInput: ""
    });

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        const storedProducts = localStorage.getItem('productList');
        if (storedProducts) {
            setProductList(JSON.parse(storedProducts));
        }
    }, []);

    const handlerInput = (e) => {
        const{name,value} =e.target
        setSeller({
            ...seller,
            [name]: value
        });
    };

    const addProduct = () => {
        const newProduct = {
            Id: seller.productInput,
            Selling: seller.sellingInput,
            Name: seller.productNameInput
        };

        const updatedProductList = [...productList, newProduct];
        setProductList(updatedProductList);
        setSeller({
            productInput: "",
            sellingInput: "",
            productNameInput: ""
        });

        localStorage.setItem("productList", JSON.stringify(updatedProductList));
        console.log(updatedProductList);
    };

    const deleteProduct = (index) => {
        const updatedProductList = productList.filter((_, i) => i !== index);
        setProductList(updatedProductList);
        localStorage.setItem("productList", JSON.stringify(updatedProductList));
    };

    return (
        <>
            <div>
                <label className='productId'>Product ID:</label>
                <input 
                    type="text" 
                    name='productInput' 
                    value={seller.productInput} 
                    onChange={handlerInput} 
                    required />
                <label className='sellingPrice'>Selling Price:</label>
                <input 
                    type="number" 
                    name='sellingInput' 
                    value={seller.sellingInput} 
                    onChange={handlerInput} 
                    required />
                <label className='productName'>Product Name:</label>
                <input 
                    type="text" 
                    name='productNameInput' 
                    value={seller.productNameInput} 
                    onChange={handlerInput} 
                    required />
                <button onClick={addProduct}>Add Product</button>
            </div>
            <div>
                <h2>Products</h2>
                {productList.map((product, index) => (
                    <ul key={index}>
                        <li>
                            {product.Selling} - {product.Name}
                            <button onClick={() => deleteProduct(index)}>Delete Product</button>
                        </li>
                    </ul>
                ))}
                <h3>Total Value Worth of Product: Rs {productList.reduce((total, product) => total + parseFloat(product.Selling), 0)}</h3>
            </div>
        </>
    );
};

export default Seller;
