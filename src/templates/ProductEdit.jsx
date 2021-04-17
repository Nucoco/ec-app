import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { PrimaryButton, SelectBox, TextInput } from '../assets/components/UIkit';
import {saveProduct} from '../reducks/products/operations';

const ProductEdit = () => {
    const dispatch = useDispatch();

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

    const categories = [
        {id: 'tops',name: 'TOPS'},
        {id: 'shirts',name: 'SHIRTS'},
        {id: 'pants',name: 'PANTS'},
    ];
    
    const genders = [
        {id: 'all',name: 'ALL'},
        {id: 'male',name: 'Men'},
        {id: 'female',name: 'Women'},
    ];

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
                <SelectBox
                    label={'category'} required={true} options={categories} select={setCategory} value={category}
                />
                {/* ???????????????????????????????????????????????????????????????????????????????????????????? */}
                {/* ?????????? useDispatch() or useCallback() or directly throw a Method of useState() ????????? */}
                {/* ???????????????????????????????????????????????????????????????????????????????????????????? */}
                <SelectBox
                    label={'gender'} required={true} options={genders} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={'Item Price'} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={'number'}
                />
                <div className='module-spacer--medium'/>
                <div className='center'>
                    <PrimaryButton
                        label={'Add the item'}
                        onClick={() => dispatch(saveProduct(name, description, category, gender, price))}
                    />
                </div>

            </div>
        </section>
    )
}

export default ProductEdit