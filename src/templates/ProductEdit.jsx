import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ImageArea, SetSizeArea } from '../components/Products';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { db } from '../firebase';
import {saveProduct} from '../reducks/products/operations';

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];
    // console.log('Before / ', id)

    if(id !== ''){
        id = id.split('/')[1];
        // console.log('After  / ', id)
    }

    const   [categories, setCategories] = useState([]),
            [category, setCategory] = useState(""),
            [description, setDescription] = useState(""),
            [gender, setGender] = useState(""),
            [images, setImages] = useState([]),
            [name, setName] = useState(""),
            [price, setPrice] = useState(""),
            [sizes, setSizes] = useState([]);

    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName]);

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    }, [setDescription]);

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice]);

    // const categories = [
    //     {id: 'tops',name: 'TOPS'},
    //     {id: 'shirts',name: 'SHIRTS'},
    //     {id: 'pants',name: 'PANTS'},
    // ];
    
    const genders = [
        {id: 'all',name: 'ALL'},
        {id: 'male',name: 'Men'},
        {id: 'female',name: 'Women'},
    ];

    //ComponentDidMount()
    useEffect(() => {
        if(id !== ''){
            db.collection('products').doc(id).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    // console.log(data)
                    setImages(data.images);
                    setName(data.name);
                    setDescription(data.description);
                    setCategory(data.category);
                    setGender(data.gender);
                    setPrice(data.price);
                    setSizes(data.sizes);
                })
        }
    }, [id])

    //ComponentDidMount()
    useEffect(() => {
        db.collection('categories').orderBy('order', 'asc').get()
            .then(snapshots => {
                const list = [];
                snapshots.forEach(snapshot => {
                    const data = snapshot.data();
                    list.push({
                        id: data.id,
                        name: data.name
                    });
                });
                setCategories(list);
            });
    }, []);

    return (
        <section>
            <h2 className='u-text__headline u-text-center'>Resister an item.</h2>
            <div className='c-section-container'>
                <ImageArea images={images} setImages={setImages}/>
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
                <SelectBox
                    label={'gender'} required={true} options={genders} select={setGender} value={gender}
                />
                <TextInput
                    fullWidth={true} label={'Item Price'} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={'number'}
                />
                <div className='module-spacer--small'/>
                <SetSizeArea sizes={sizes} setSizes={setSizes} />
                <div className='module-spacer--small'/>
                <div className='center'>
                    <PrimaryButton
                        label={'Add the item'}
                        onClick={() => dispatch(saveProduct(id, name, description, category, gender, price, images, sizes))}
                    />
                </div>

            </div>
        </section>
    )
}

export default ProductEdit