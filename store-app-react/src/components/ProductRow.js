import React from 'react';

const productRow = (props)=> {
    return(
        <tr className="productRow">
            <td>{props.name}</td>
            <td>{props.price}$</td>
        </tr>
    );
};

export default productRow;