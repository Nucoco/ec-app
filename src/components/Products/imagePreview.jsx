import React from 'react'

const ImagePreview = (props) => {
    return (
        <div className='p-media__thumb'>
            <img alt='Preview' src={props.path} onClick={() => props.delete(props.id)} />
        </div>
    )
}

export default ImagePreview;