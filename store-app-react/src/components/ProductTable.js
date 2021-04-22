import React from 'react';
import ProductRow from './ProductRow';
import '../styles/ProductTable.css';

const productTable = (props)=>{
    
    const displayProducts = ()=>{
        return props.products.map((product, index) => {
            return <ProductRow key={index} {...product}/>
        });
    };
    
    return (
        <table className="productTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {displayProducts()}
            </tbody>
        </table>
    );
};

export default productTable;