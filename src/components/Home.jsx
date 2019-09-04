import React, { Component } from 'react'
import axios from 'axios'

import ProductItem from './ProductItem'

class Home extends Component {

    state = {
        products: [],
        searchProducts: []
    }

    componentDidMount() {
        axios.get(
            'http://localhost:2019/products'

        ).then(res => {
            this.setState(
                {
                    products: res.data,
                    searchProducts: res.data
                }
            )

        })
    }

    // Membuat list, akan menggunakan map
    renderList = () => {
        // products = [{}, {}, {}]
        // product = {id, name, description, price, picture}
        return this.state.searchProducts.map((product) => {
            return <ProductItem barang={product} key={product.id}/>
        })

    }

    // Search / Filter
    onSearchClick = (cari) => {
        let name = this.name.value
        let min = parseInt(this.minimum.value)
        let max = parseInt(this.maximum.value)

        if(isNaN(min)){
            min = 0
        }

        if(isNaN(max)){
            max = Infinity
        }

        let hasilFilter = this.state.products.filter((product) => {
                return (product.name.toLowerCase().includes(name.toLowerCase()) && min <= product.price && max >= product.price)   
        })

        this.setState({searchProducts: hasilFilter})
    }
    // Reset
    onResetClick = () => {
        // prevState = state saat ini
        this.setState((prevState) => {
            return {
                searchProducts: prevState.products
            }
        })
    }

    // Clean
    onCleanClick = () => {
        this.setState({searchProducts: []})
    }
    
    render() {
        return (
            <div className='container'>
                <div className='row'>
                {/* div untuk search */}
                <div className='col-3 mt-3'>
                    <div className='card p-3'>
                        <div className='border-bottom border-secondary card-title'>
                            <h1>Search</h1>
                        </div>
                        <form className='form-group mb-5'>
                            <h4>Name</h4>
                            <input ref={(input) => {this.name =input}} type='text' className='form-control'/>

                            <h4>Price</h4>
                            <input ref={(input) => {this.minimum =input}} type='text' placeholder='Minimum' className='form-control mb-2'/>
                            <input ref={(input) => {this.maximum =input}} type='text' placeholder='Maximum' className='form-control'/>
                        </form>
                        {/* <button onClick={this.onCleanClick} className='btn btn-block btn-outline-primary'>Clean</button> */}
                        <button onClick={this.onSearchClick} className='btn btn-block btn-outline-danger'>Search</button>
                        <button onClick={this.onResetClick} className='btn btn-block btn-outline-success'>Reset</button>
                    </div>
                </div>

                {/* div untuk list */}
                <div className='row col-9'>
                    {this.renderList()}
                </div>
            </div>
            </div>
        )
    }
}

export default Home