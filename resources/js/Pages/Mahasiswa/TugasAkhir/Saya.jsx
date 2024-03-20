import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

export default function Saya({ auth, mahasiswa, tugasAkhir, periode }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        judul: (tugasAkhir ? tugasAkhir.judul_ta : ''),
        abstrak: (tugasAkhir  ? tugasAkhir.abstrak : ''),
        periode: (tugasAkhir ? tugasAkhir.periode : periode),
        file: (tugasAkhir ? tugasAkhir.file : ''),
    });

    const [hideUploader, setHideUploader] = useState(tugasAkhir.file ? true : false)


    // console.log('mahasiswa', mahasiswa)
    // console.log('tugasAkhir', tugasAkhir)
    // console.log('data', data)
    // console.log('periode', periode)

    const periodes = []
    for (let i = new Date().getFullYear() - 3; i <= new Date().getFullYear(); i++) {
        periodes.push('Ganjil ' + i + '/' + (i + 1))
        periodes.push('Genap ' + i + '/' + (i + 1))
    }

    // console.log('data', data)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={'Tugas Akhir Saya'}
            back={false}
        >
            <Head title="Tugas Akhir Saya" />

            <section className="sm:px-6 lg:px-8 mt-1 mx-24 rounded-lg">
                <div className="bg-slate-100 max-h-[87vh] overflow-y-auto shadow-sm rounded-lg">
                    {mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ?
                        <form
                            action=""
                            onSubmit={(e) => {
                                e.preventDefault()
                                post(route('tugasakhir.store'))

                            }}

                        >
                            <div className="p-4 pl-12 bg-slate-100 border-b border-gray-200">



                                <div className='flex'>
                                    <InputLabel
                                        value="NIM"
                                        className='w-[18%] py-4 mr-2'
                                    />

                                    <TextInput
                                        className="block py-2 mb-2 w-7/12 disabled:opacity-50"
                                        type="text"
                                        name="nim"
                                        value={auth.user.username}
                                        disabled={true}
                                    />
                                </div>


                                <div className='flex'>
                                    <InputLabel
                                        value="Nama"
                                        className='w-[18%] py-4 mr-2'
                                    />

                                    <TextInput
                                        className="block py-2 mb-2 w-7/12 disabled:opacity-50"
                                        type="text"
                                        name="nama"
                                        value={auth.user.name}
                                        disabled={true}
                                    />
                                </div>

                                <div className='flex'>
                                    <InputLabel
                                        value="Dosen Pembimbing 1"
                                        className='w-[18%] py-4 mr-2'
                                    />
                                    <TextInput
                                        className="block py-2 mb-2 w-7/12 disabled:opacity-50"
                                        type="text"
                                        name="nama_dosen_1"
                                        value={mahasiswa.dosen_pembimbing_1.nama_dosen + " - " + mahasiswa.dosen_pembimbing_1.nip}
                                        disabled={true}
                                    />
                                </div>

                                <div className='flex'>
                                    <InputLabel
                                        value="Dosen Pembimbing 2"
                                        className='w-[18%] py-4 mr-2'
                                    />
                                    <TextInput
                                        className="block py-2 mb-2 w-7/12 disabled:opacity-50"
                                        type="text"
                                        name="nama_dosen_2"
                                        value={mahasiswa.dosen_pembimbing_2.nama_dosen + " - " + mahasiswa.dosen_pembimbing_2.nip}
                                        disabled={true}
                                    />
                                </div>

                                <div className='flex'>
                                    <InputLabel value='Periode' className='w-[18%] mr-2 my-auto' />
                                    <select
                                        name="periode"
                                        id="periode"
                                        className="mt-2 block w-80 rounded border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500 disabled:opacity-75"
                                        onChange={(e) => setData('periode', e.target.value)}
                                        defaultValue={data.periode}
                                        disabled={true}
                                    >
                                        {periodes.map((item, index) => (
                                            (item == periode ? <option value={item} selected>{item}</option> : <option value={item}>{item}</option>)
                                        ))
                                        }
                                    </select>
                                </div>


                                <div className='flex mt-2'>
                                    <InputLabel
                                        value="Judul Tugas Akhir"
                                        className='w-[18%] py-4 mr-2'
                                    />

                                    <TextInput
                                        className="block py-2 mb-2 w-9/12"
                                        type="text"
                                        name="judul"
                                        value={data.judul}
                                        onChange={(event) => { setData('judul', event.target.value) }}
                                        autoComplete="judul"
                                    />

                                </div>
                                <div className='flex'>
                                    <InputLabel
                                        value="Abstrak"
                                        className='w-[18%] py-4 mr-2'
                                    />

                                    <textarea
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-2 block py-2 mb-2 w-9/12"
                                        type="text"
                                        name="abstrak"
                                        value={data.abstrak}
                                        onChange={(event) => { setData('abstrak', event.target.value) }}
                                        autoComplete="abstrak"
                                    />
                                </div>
                            <div className="flex my-4">
                                <InputLabel
                                    value="File"
                                    className='w-36 py-4 mr-2'
                                    />
                                    {hideUploader ?
                                    <>
                                    <a
                                    href={tugasAkhir.file ? route('tugasakhir.show', tugasAkhir.id) : '#'}
                                    target="_blank"
                                    className='my-4 ml-4 hover:underline focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-full'
                                    >
                                    {tugasAkhir.file ? 'Lihat File' : 'Belum ada file'}
                                    </a>
                                    <PrimaryButton
                                    onClick={() => {
                                        setHideUploader(!hideUploader)
                                    }}
                                    className='my-2 ml-4'
                                    >
                                    Ganti File
                                    </PrimaryButton>
                                    </>
                                    :         
                                    <input 
                                    type='file'
                                    name='file'
                                    className='w-80 my-4  ml-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm h-full'
                                    onChange={(e) => setData('file', e.target.files[0])}
                                    />
                                }
                                    </div>
                            </div>
                            <PrimaryButton
                                type="submit"
                                className='float-right mr-4 mb-4 mt-4'
                            >
                                Simpan
                            </PrimaryButton>
                        </form>
                        :
                        <div className="p-4 pl-12 bg-slate-100 border-b border-gray-200">
                            <div className='flex'>
                                <InputLabel
                                    value="NIM"
                                    className='w-36 py-4 mr-2'
                                />

                                <TextInput
                                    className="block py-2 mb-2 w-7/12 disabled:opacity-50"
                                    type="text"
                                    name="nim"
                                    value={auth.user.username}
                                    disabled={true}
                                />
                            </div>
                            <div className='flex'>
                                <InputLabel
                                    value="Nama"
                                    className='w-36 py-4 mr-2'
                                />

                                <TextInput
                                    className="block py-2 mb-2 w-7/12 disabled:opacity-50"
                                    type="text"
                                    name="nama"
                                    value={auth.user.name}
                                    disabled={true}
                                />
                            </div>
                            <div className='flex bg-red-500 opacity-80 text-white px-3 py-2 mt-2 rounded-lg w-full'>
                                <ExclamationCircleIcon className='w-10 h-10 text-white mr-2' />
                                Perhatian!
                                <br />Anda belum memiliki dosen pembimbing. Silakan isi pesan dan tema untuk mengajukan dosen pembimbing kepada Admin.
                                <br /> 
                            </div>
                            <div className="my-4">
                            <Link className='hover:underline' href={route('profile.edit')}>
                                Ubah Profil
                            </Link>
                            </div>

                        </div>}
                </div>
            </section>
        </AuthenticatedLayout>
    );
}