import { useState } from 'react'
import { Tab } from '@headlessui/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import * as XLSX from 'xlsx';
// import XLSX from 'xlsx';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CreateDosen({ auth, errors, status, image }) {

    const { data, setData, post, processing, errors: formErrors } = useForm({
        name: '',
        nip: '',
        no_hp: '',
        keterangan: '',
    });

    // console.log('helo')
    // console.log(image)
    // console.log('data', data)

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('dosen.store'))
    }

    // console.log('data', data.file)
    return (
        <AdminLayout
            user={auth.user}
            header={'Tambah Dosen'}
            back={true}
            refback={route('dosen.index')}
            desc={'Halaman ini berisikan form untuk menambahkan dosen baru.'}
        >
            <Head title="Tambah Dosen" />
            <section className=' bg-slate-100 shadow rounded-b-xl mx-24 overflow-y-auto'>
                <div className="w-full ">
                    <form method="post" action={route('dosen.store')} className="items-center px-12 pt-6 pb-1 mb-4 " onSubmit={handleSubmit}>
                        <div className='flex mt-4'>
                            <InputLabel htmlFor='name' value='Nama Dosen' className='w-[18%] pt-4' />
                            <TextInput
                                id='name'
                                type='text'
                                name='name'
                                className='w-2/3'
                                placeholder='Nama Dosen'
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </div> 
                        <div className='flex mt-4'>
                            <InputLabel htmlFor='nip' value='NIP' className='w-[18%] pt-4' />
                            <TextInput
                                id='nip'
                                type='text'
                                name='nip'
                                className='w-2/3'
                                placeholder='NIP'
                                onChange={(e) => setData('nip', e.target.value)}
                            />
                        </div>
                        <div className='flex mt-4'>
                            <InputLabel htmlFor='no_hp' value='No. HP' className='w-[18%] pt-4' />
                            <TextInput
                                id='no_hp'
                                type='text'
                                name='no_hp'
                                className='w-2/3'
                                placeholder='No. HP'
                                onChange={(e) => setData('no_hp', e.target.value)}
                            />
                        </div>
                        <div className='flex mt-4'>
                            <InputLabel htmlFor='keterangan' value='Keterangan' className='w-[18%] pt-4' />
                            <textarea
                                id='keterangan'
                                type='text'
                                name='keterangan'
                                className='w-2/3 ring-1 ring-gray-300 rounded-md p-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                                placeholder='Keterangan'
                                onChange={(e) => setData('keterangan', e.target.value)}
                            />
                        </div>
                        <div className='flex mt-4'>
                            <PrimaryButton type='submit' disabled={processing}>
                                Tambahkan
                            </PrimaryButton>
                        </div>
                
                    </form>

                </div>
            </section>
        </AdminLayout>
    )
}
