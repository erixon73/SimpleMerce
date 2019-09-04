import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class ProductItem extends Component {
    render() {
        let {id, name, price, picture} = this.props.barang

        return (
            <div className='card col-5 mx-4 my-3' >
                <img src={picture} className='card-img-top'/>
                <div className='card-body'>
                    <h5 className='card-title'>{name}</h5>
                    <p className='card-text'>Rp. {price}</p> 
                    <input text='text' placeholder='Quantity' className='form-control mb-2' type="number"/>
                    <Link to={`/productdetail/${id}`}>
                        <button className='btn btn-block btn-outline-primary'>Detail</button>
                    <button className='btn btn-block btn-outline-primary'>Add To Cart</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default ProductItem