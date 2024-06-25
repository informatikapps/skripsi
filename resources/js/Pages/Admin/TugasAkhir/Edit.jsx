import { useState } from 'react'
import { Tab } from '@headlessui/react'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import * as XLSX from 'xlsx';
import SecondaryButton from '@/Components/SecondaryButton'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
// import XLSX from 'xlsx';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function EditTA({ auth, errors, status, tugasakhir, dosen }) {

    const editable = tugasakhir.user_id == auth.user.id || tugasakhir.status_acc
    const this_date = new Date();

    // console.log('this_date', this_date)
    // console.log('editable', editable)

    const { data, setData, patch, processing, errors: formErrors } = useForm({
        name: tugasakhir.nama_mhs,
        nim: tugasakhir.ni_mhs,
        judul: tugasakhir.judul_ta,
        abstrak: tugasakhir.abstrak,
        pembimbing_1: (dosen.find(item => item.nip == tugasakhir.ni_pembimbing_1) ? dosen.find(item => item.nip == tugasakhir.ni_pembimbing_1).id : ''),
        pembimbing_2: (dosen.find(item => item.nip == tugasakhir.ni_pembimbing_2) ? dosen.find(item => item.nip == tugasakhir.ni_pembimbing_2).id : ''),
        periode: (this_date.getMonth() >= 7 && this_date.getDate() > 17 ? 'Gasal ' + this_date.getFullYear() + '/' + (this_date.getFullYear() + 1) : 'Genap ' + (this_date.getFullYear() - 1) + '/' + this_date.getFullYear()),
    });

    const periodes = []
    for (let i = 2010; i <= this_date.getFullYear(); i++) {
        periodes.push('Gasal ' + i + '/' + (i + 1))
        periodes.push('Genap ' + i + '/' + (i + 1))
    }

    // console.log('ta', tugasakhir)
    // console.log('helo')
    // console.log(image)
    // console.log('data', data)
    // console.log('dosen', dosen.find(item => item.nip == tugasakhir.ni_pembimbing_1))

    // console.log('route', route('admin.taacc', tugasakhir.id))

    const handleSubmit = (e) => {
        e.preventDefault()
        patch(route('admin.taupdate', tugasakhir.id), {
            nim: data.nim,
            name: data.name,
            judul: data.judul,
        })
    }
    const handleLulus = (e) => {
        e.preventDefault()
        patch(route('admin.taacc', tugasakhir.id))
    }

    const handleReject = (e) => {
        e.preventDefault()
        patch(route('admin.tarej', tugasakhir.id))
    }


    // console.log('data', data.file)
    return (
        <AdminLayout
            user={auth.user}
            header={'Edit Tugas Akhir'}
            back={true}
            refback={route('admin.ta')}
        >
            <Head title="Edit Tugas Akhir" />
            <section className=' bg-slate-100 shadow rounded-b-xl mx-24 overflow-y-auto'>
                <div className="w-full ">
                    <form onSubmit={handleSubmit}>
                        <div className='px-14 py-8 bg-slate-50 rounded-lg'>
                            {!tugasakhir.status_acc ?
                                <>
                                    <div className='flex mb-3 bg-cyan-100 text-sky-500 px-4 rounded-xl py-5 w-11/12'>
                                        <ExclamationCircleIcon className='w-12 h-12 mr-2' />
                                        Mahasiswa ini belum menyelesaikan tugas akhirnya, data di bawah belum bisa diubah kecuali mahasiswa telah dinyatakan lulus
                                    </div>
                                    <Link href={route('admin.taacc', tugasakhir.id)} method="patch" as="button">
                                        <SecondaryButton
                                            onClick={handleLulus}
                                            className="justify-start flex bg-amber-500 hover:bg-amber-600 my-4 ml-4"
                                        >
                                            Nyatakan Lulus
                                        </SecondaryButton>
                                    </Link>
                                </> : null
                            }
                            <div className='flex'>
                                <InputLabel value='NIM' className='w-[18%] my-auto' />
                                <TextInput
                                    className='mt-1 rounded-lg w-1/3'
                                    errors={formErrors.nim}
                                    name='nim'
                                    type='text'
                                    value={data.nim}
                                    onChange={e => setData('nim', e.target.value)}
                                    disabled={!editable}
                                />
                            </div>
                            <div className='flex'>
                                <InputLabel value='Nama' className='w-[18%] my-auto' />
                                <TextInput
                                    className='mt-1 rounded-lg w-1/3'
                                    errors={formErrors.name}
                                    name='name'
                                    type='text'
                                    value={data.name}
                                    onChange={e => setData('name', e.target)}
                                    disabled={!editable}
                                />
                            </div>
                            <div className='flex'>
                                <InputLabel value='Judul' className='w-[18%] my-auto' />
                                <TextInput
                                    className='mt-1 rounded-lg w-9/12'
                                    errors={formErrors.name}
                                    name='judul'
                                    type='text'
                                    value={data.judul}
                                    onChange={e => setData('judul', e.target.value)}
                                    disabled={!editable}
                                />
                            </div>
                            <div className='flex'>
                                <InputLabel value='Abstrak' className='w-[18%] my-auto' />
                                <textarea
                                    type="text"
                                    name="abstrak"
                                    value={data.abstrak}
                                    onChange={(e) => setData('abstrak', e.target.value)}
                                    className="w-9/12 h-full border-gray-300 mt-2 rounded-md disabled:opacity-50"
                                    autoComplete="abstrak"
                                    isFocused={true}
                                    maxLength={2500}
                                    disabled={!editable}
                                />
                            </div>
                            <div className='flex'>
                                <InputLabel value='Dosen Pembimbing 1' className='w-[18%] my-auto' />
                                <select
                                    name="dosbing"
                                    id="dosbing"
                                    className="mt-2 block w-1/2 rounded border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500 disabled:opacity-50"
                                    onChange={(e) => setData('pembimbing_1', e.target.value)}
                                    disabled={!editable}
                                >
                                    <option value="">Pilih Dosen Pembimbing...</option>
                                    {dosen.map((item, index) => (
                                        tugasakhir.ni_pembimbing_1 == item.nip ?
                                            <option value={item.id} selected={true}>{item.nama_dosen + " - " + item.nip}</option>
                                            :
                                            <option value={item.id}>{item.nama_dosen + " - " + item.nip}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex'>
                                <InputLabel value='Dosen Pembimbing 2' className='w-[18%] my-auto' />
                                <select
                                    name="dosbing"
                                    id="dosbing"
                                    className="mt-2 block w-1/2 rounded border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500 disabled:opacity-50"
                                    onChange={(e) => setData('pembimbing_2', e.target.value)}
                                    defaultValue={data.pembimbing_2}
                                    disabled={!editable}
                                >
                                    <option value="">Pilih Dosen Pembimbing...</option>
                                    {dosen.map((item, index) => (
                                        tugasakhir.ni_pembimbing_1 == item.nip ?
                                            <option value={item.id} selected={true}>{item.nama_dosen + " - " + item.nip}</option>
                                            :
                                            <option value={item.id}>{item.nama_dosen + " - " + item.nip}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex'>
                                <InputLabel value='Periode' className='w-[18%] my-auto' />
                                <select
                                    name="periode"
                                    id="periode"
                                    className="mt-2 block w-3/12 rounded border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500"
                                    onChange={(e) => setData('periode', e.target.value)}
                                    defaultValue={data.periode}
                                >
                                    {periodes.map((item, index) => (
                                        <option value={item}>{item}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="flex">
                                <a
                                    href={tugasakhir.file ? route('admin.tashow', tugasakhir.id) : '#'}
                                    target="_blank"
                                    className='my-4 ml-4 hover:underline focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-full'
                                >
                                    {tugasakhir.file ? 'Lihat File' : 'Belum ada file'}
                                </a>
                            </div>
                        </div>
                        <div className='flex-row-reverse'>
                            <PrimaryButton
                                type="submit"
                                className="justify-start bg-amber-500 hover:bg-amber-600 my-4 ml-4"
                            >
                                Simpan
                            </PrimaryButton>
                            {tugasakhir.status_acc && tugasakhir.user_id != auth.user.id ?
                                <Link href={route('admin.tarej', tugasakhir.id)} method="patch" as="button">
                                    <SecondaryButton
                                        onClick={handleReject}
                                        className="justify-start flex rounded-xl bg-red-500 hover:bg-red-500 hover:text-neutral-50 ml-2"
                                    >
                                        Batalkan Kelulusan
                                    </SecondaryButton>
                                </Link>
                                : null
                            }
                        </div>
                    </form>


                </div>
            </section>
        </AdminLayout>
    )
}
