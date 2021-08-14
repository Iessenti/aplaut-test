import React from 'react'
import { RateStar } from '../icons'
import '../styles/productHeader.css'

const ProductHeader = (props) => {
    return (
        <div className='product-header'>
            <div className='product-rating-container'>
                <div>
                    <span className='product-rating'>{props.rating}</span>
                    <div className='rate-star-row'>
                        <RateStar/>
                        <RateStar/>
                        <RateStar/>
                        <RateStar/>
                        <RateStar/>
                    </div>
                </div>
                <span className='product-recommendations-count'>На основе {props.recommended} оценок</span>
            </div>

            <button className='send-review-button'>Оставить отзыв</button>

        </div>
    )
}

export default ProductHeader