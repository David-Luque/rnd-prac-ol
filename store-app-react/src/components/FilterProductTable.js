import React, { Component } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import productsData from '../data.json';

class filterProductTable extends Component {
    
    state = {
        products: {...productsData},
        searchValue: "",
        onlyStockProducts: false
    };

    searchProducts = (value)=>{
        this.setState({ searchValue: value });
    };

    checkInStock = ()=>{
        this.setState({ onlyStockProducts: !this.state.onlyStockProducts });
    };

    filterProducts = ()=>{
        const productsCopy = {...this.state.products};
        if(this.state.onlyStockProducts){
            return productsCopy.data.filter(product => {
                return product.name.toLocaleLowerCase().includes(this.state.searchValue.toLocaleLowerCase()) && product.stocked === true
            });
        }
        return productsCopy.data.filter(product =>{
            return product.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        });
    };

    render(){
        return(
            <section className="filterProductsTable">
                <h2>Store</h2>
                <SearchBar searchProducts={this.searchProducts} checkInStock={this.checkInStock} />
                <ProductTable products={this.filterProducts()} /> 
            </section>
        );
    };
};

export default filterProductTable;