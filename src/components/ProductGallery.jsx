import React, { useState } from 'react'
import { ArrowForward, ArrowBack, AddPhoto } from '../icons'
import '../styles/productGallery.css'

const ProductGallery = (props) => {

    const [offset, setOffset] = useState(0)

    const nextPhotos = () => {
        if ( offset  <= ((props.photos.length - 3) * 114)) {
            setOffset(offset + 342)
        } else {
            setOffset( props.photos.length * 114 - 7)
        }
    }

    const prevPhotos = () => {
        if ( offset > 342 ) {
            setOffset(offset - 342)
        } else {
            setOffset(0)
        }
    }

    return (
        <div className='main-photos-container'>

            {
                (offset !== 0)
                &&
                <div className='change-photo prev' onClick={() => prevPhotos()}><ArrowBack/></div>    
            }

            <div className='photos-carousel'>
                <div style={{marginLeft: `-${offset}px`}}>
                    <div className='image add-photo-panel'><AddPhoto/></div> 
                    {
                        props.photos.map( (elem, index) => (
                            <img src={elem.url_large} alt='ph' className='image'/> 
                        ))
                    }
                    {
                        props.photos.map( (elem, index) => (
                            <img src={elem.url_large} alt='ph' className='image'/> 
                        ))
                    }
                </div>
            </div>

            <div className='change-photo next' onClick={ () => nextPhotos()}><ArrowForward/></div>
        </div>

    )
}

export default ProductGallery