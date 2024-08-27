// import { Editor } from '@tinymce/tinymce-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';



export default function CreateInfo({auth, informasi, formErrors}){


    
    const { data, setData, post, processing, errors, reset } = useForm({
        judul: '',
        konten: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pengumuman.store'));
    }
    
    // console.log('data ', data)


    return (
        <AdminLayout header={'Create Informasi'}>
            <Head title={'Create Informasi'} /> 
            <div className='mx-24 mt-3 bg-slate-100 px-24 py-5 rounded-lg'>
                <form onSubmit={handleSubmit}>
                <div className='flex'>
                    <InputLabel value='Judul' className='w-1/12 my-auto' optional={false} />
                    <TextInput
                        className='mt-1 rounded-lg w-full'
                        name='judul'
                        type='text'
                        value={data.judul}
                        onChange={e => setData('judul', e.target.value)}
                    />
                </div>
                <div className="flex mt-3">
                    <InputLabel value='Konten' className='w-[12%] my-auto mt-1' optional={false}/>
                </div>
                <div className="flex mt-3">
                    <ReactQuill
                        className='w-full bg-white h-fit'
                        name='konten'
                        type='text'
                        value={data.konten}
                        onChange={e => setData('konten', e)}
                    />
                </div>

                <div className="flex mt-3">
                    <PrimaryButton 
                        className='mt-1' 
                        disabled={processing || data.judul.length < 1 || data.konten.length < 1}
                        type='submit'
                        >
                        Buat
                    </PrimaryButton>
                </div>
                </form>
            </div> 
        </AdminLayout>
    )
}