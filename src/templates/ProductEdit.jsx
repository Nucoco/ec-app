import React, { useCallback, useState } from 'react'
import { TextInput } from '../assets/components/UIkit';

const ProductEdit = () => {
    const [name, setName] = useState(""),
            [description, setDescription] = useState(""),
            [category, setCategory] = useState(""),
            [gender, setGender] = useState(""),
            [price, setPrice] = useState("");

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName]);

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription]);

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice]);

    return (
        <section>
            <h2 className='u-text__headline u-text-center'>Resister an item.</h2>
            <div className='c-section-container'>
                <TextInput
                    fullWidth={true} label={'Item Name'} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={'text'}
                />
                <TextInput
                    fullWidth={true} label={'Item Description'} multiline={true} required={true}
                    onChange={inputDescription} rows={5} value={description} type={'text'}
                />
                <TextInput
                    fullWidth={true} label={'Item Price'} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={'number'}
                />
            </div>
        </section>
    )
}

export default ProductEdit