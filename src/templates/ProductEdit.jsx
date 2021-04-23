import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ImageArea, SetSizeArea } from '../components/Products';
import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit';
import { db } from '../firebase';
import {saveProduct} from '../reducks/products/operations';

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = window.location.pathname.split('/product/edit')[1];

    if(id !== ''){
        id = id.split('/')[1];
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
    //     const path = (
    //         document.currentScript
    //             ? document.currentScript.src
    //             : document.getElementsByTagName('script')[document.getElementsByTagName('script').length-1].src
    //         )
    //         .replace(new RegExp('^'+window.location.origin), '')
    //         .replace(/[^\/]+$/, '')
    //     ;
    //     const filename = path.split("/").reverse()[0].split('.')[0];
    //     console.log("Filename: " + path)
    //     const e = new Error('Could not parse input');// Error object has the path of an error occurred file.
    //     console.log(e);// e.filename can show filename, but it's supported only FireFox.
        console.log("CDM, CDU: ProductEdit triggered by Product ID in URL")
        if(id !== ''){
            db.collection('products').doc(id).get()
                .then(snapshot => {
                    const data = snapshot.data()
                    console.log(`FireStore-products-id(${id}).data: ` + data)
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
        console.log('CDM: ProductEdit(setCategories)');
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