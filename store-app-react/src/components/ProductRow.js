import React from 'react';
import '../styles/ProductRow.css';

const productRow = (props)=> {
    return(
        <tr className="productRow">
            <td>{props.name}</td>
            <td>{props.price}$</td>
        </tr>
    );
};

export default productRow;