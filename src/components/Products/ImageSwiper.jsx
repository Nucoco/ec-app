import React, { useState } from 'react'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import NoImage from '../../assets/img/src/no_image.png'

const ImageSwiper = (props) => {
    const [params] = useState({
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        loop: true
    });

    const images = props.images;
    console.log('ImageSwiper will rendered')

    return (
        <Swiper {...params}>
            {images.length === 0 ? (
                <div className='p-media__thumb'>
                    <img src={NoImage} alt="no image" />
                </div>
            ) : (
                images.map((image) => (
                    <div className='p-media__thumb' key={image.id}>
                        <img src={image.path} alt='Item Image' />
                    </div>
                ))
            )}
        </Swiper>
    )
}

export default ImageSwiper;