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

export default function CreateTA({ auth, errors, status, image, dosen }) {
    
    const this_date = new Date();
    
    // console.log('this_date', this_date)

    const { data, setData, post, processing, errors: formErrors } = useForm({
        name: '',
        nim: '',
        judul: '',
        abstrak: '',
        file: null,
        pembimbing_1: '',
        pembimbing_2: '',
        periode: (this_date.getMonth() >= 7 && this_date.getDate() > 17 ? 'Gasal ' + this_date.getFullYear() : 'Genap ' + this_date.getFullYear()),
    });

    const periodes = []
    for (let i = 2010; i <= this_date.getFullYear(); i++) {
        periodes.push('Gasal ' + i + '/' + (i + 1))
        periodes.push('Genap ' + i + '/' + (i + 1))
    }

    

    const [hideFile, setHideFile] = useState(false)



    // console.log('helo')
    // console.log(image)
    // console.log('data', data)

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('admin.tacreatepost'), {
            nim: data.nim,
            name: data.name,
            judul: data.judul,
        })
    }

    const handleSubmitBulk = (e) => {
        e.preventDefault()
        console.log('data.file', data.file)
        if (hideFile) {
            data.file.map((item, index) => {
                post(route('admin.tacreatepost'), {
                    nim: item.NIM,
                    name: item.Nama,
                })
            })
        }
    }

    const handleFileUpload = (files) => {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            // console.log('JSON Data:', jsonData.slice(1,5));
            setData('file', jsonData)
            setHideFile(!hideFile)
        };

        if (file) {
            reader.readAsArrayBuffer(file);
        }
    };

    // console.log('data', data.file)
    return (
        <AdminLayout
            user={auth.user}
            header={'Tambah Tugas Akhir'}
            back={true}
            refback={route('admin.ta')}
        >
            <Head title="Tambah Tugas Akhir" />
            <section className=' bg-slate-100 shadow rounded-b-xl mx-20 overflow-y-auto'>
                <div className="w-full ">
                    <Tab.Group>
                        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mx-6 mt-4">
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60 ring-offset-2 ring-offset-amber-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white text-amber-700 shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                                onClick={() => setData('file', null)}
                            >
                                Isi Tugas Akhir
                            </Tab>
                            <div className='text-sm py-3 mx-3 text-stone-100 font-light '>
                                /
                            </div>
                            <Tab
                                className={({ selected }) =>
                                    classNames(
                                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                                        'ring-white/60 ring-offset-2 ring-offset-amber-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white text-amber-700 shadow'
                                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                    )
                                }
                                onClick={() => { setData('name', ''); setData('nim', ''); setHideFile(false) }}
                            >
                                Tambahkan dari File
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-1 mx-1">
                            <Tab.Panel className="w-full rounded-lg py-2.5 text-sm font-medium leading-5">
                                <form onSubmit={handleSubmit}>

                                    <div className='px-8 py-3 bg-slate-100 rounded-lg'>
                                        <div className='flex'>
                                            <InputLabel value='NIM' className='w-1/12 my-auto' optional={false} />
                                            <TextInput
                                                className='mt-1 rounded-lg w-1/3'
                                                errors={formErrors.nim}
                                                name='nim'
                                                type='text'
                                                value={data.nim}
                                                onChange={e => setData('nim', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex'>
                                            <InputLabel value='Nama' className='w-1/12 my-auto' optional={false} />
                                            <TextInput
                                                className='mt-1 rounded-lg w-1/3'
                                                errors={formErrors.name}
                                                name='name'
                                                type='text'
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex'>
                                            <InputLabel value='Judul' className='w-1/12 my-auto' optional={false} />
                                            <TextInput
                                                className='mt-1 rounded-lg w-1/2'
                                                errors={formErrors.name}
                                                name='judul'
                                                type='text'
                                                value={data.judul}
                                                onChange={e => setData('judul', e.target.value)}
                                            />
                                        </div>
                                        <div className='flex'>
                                            <InputLabel value='Abstrak' className='w-1/12 my-auto' optional={false} />
                                            <textarea
                                                type="text"
                                                name="abstrak"
                                                value={data.abstrak}
                                                onChange={(e) => setData('abstrak', e.target.value)}
                                                className="w-full border-gray-300 mt-2 rounded-md disabled:opacity-50"
                                                autoComplete="abstrak"
                                                isFocused={true}
                                                maxLength={2500}
                                            />
                                        </div>
                                        <div className='flex'>
                                            <InputLabel value='Pembimbing 1' className='w-1/6 my-auto' optional={false} />
                                            <select
                                                name="dosbing"
                                                id="dosbing"
                                                className="mt-2 block w-80 rounded border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500"
                                                onChange={(e) => setData('pembimbing_1', e.target.value)}
                                                defaultValue={data.pembimbing_1}
                                            >
                                                <option value="">Pilih Dosen Pembimbing...</option>
                                                {dosen.map((item, index) => (
                                                    <option value={item.id}>{item.nama_dosen + " - " + item.nip}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex'>
                                            <InputLabel value='Pembimbing 2' className='w-1/6 my-auto' optional={false} />
                                            <select
                                                name="dosbing"
                                                id="dosbing"
                                                className="mt-2 block w-80 rounded border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500"
                                                onChange={(e) => setData('pembimbing_2', e.target.value)}
                                                defaultValue={data.pembimbing_2}
                                            >
                                                <option value="">Pilih Dosen Pembimbing...</option>
                                                {dosen.map((item, index) => (
                                                    <option value={item.id}>{item.nama_dosen + " - " + item.nip }</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex'>
                                            <InputLabel value='Periode' className='w-1/12 my-auto' optional={false} />
                                            <select
                                                name="periode"
                                                id="periode"
                                                className="mt-2 block w-80 rounded border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500"
                                                onChange={(e) => setData('periode', e.target.value)}
                                                defaultValue={data.periode}
                                            >
                                                { periodes.map((item, index) => (
                                                        <option value={item}>{item}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex-row-reverse'>
                                        <PrimaryButton
                                            type="submit"
                                            className="w-24 justify-start bg-amber-500 hover:bg-amber-600 mt-4 ml-8"
                                            disabled={processing || data.name.length < 1 || data.nim.length < 1 || data.judul.length < 1 || data.abstrak.length < 1 || data.pembimbing_1.length < 1 || data.pembimbing_2.length < 1}
                                        >
                                            Tambah
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </Tab.Panel>
                            <Tab.Panel className="w-full rounded-lg py-2.5 text-sm font-medium leading-5 px-8">
                                <form onSubmit={handleSubmitBulk}>
                                    <p className='flex w-full my-6 px-4 justify-left'>
                                        Masukkan file dalam bentuk .xslx dengan format spreadsheet sebagai berikut
                                    </p>
                                    <img src={`data:image/png;base64,${image}`} alt="" className='mx-auto my-4' />
                                    <p className='flex w-full my-6 px-4 justify-left font-semibold'>
                                        Pastikan JUDUL KOLOM (NIM, Nama) sudah sesuai serta NIM dimulai dari kolom A2 dan nama dimulai dari kolom B2 ke bawah
                                    </p>
                                    <div className='px-4 py-3 bg-slate-50 rounded-lg flex'>

                                        {!hideFile &&
                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg class="w-8 h-6 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                        </svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk memilih file</span> atau geser dan lepaskan</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">.XLSX</p>
                                                    </div>
                                                    <input id="dropzone-file" accept='.xlsx' type="file" class="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
                                                </label>
                                            </div>
                                        }
                                        {hideFile &&
                                            <div className='flex flex-col justify-center w-full'>
                                                <p className='text-left font-semibold'>Data yang terbaca:</p>
                                                <table className="table-auto w-full">
                                                    <thead>
                                                        <tr>
                                                            <th className="px-4 py-2 w-1/3 bg-slate-100">NIM</th>
                                                            <th className="px-4 py-2 bg-slate-100">Nama</th>
                                                            <th className="px-4 py-2 bg-slate-100">Dosen Pembimbing 1</th>
                                                            <th className="px-4 py-2 bg-slate-100">...</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.file &&
                                                            data.file.slice(0,4).map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className="border px-4 py-2">{item.NIM}</td>
                                                                    <td className="border px-4 py-2">{item.Nama}</td>
                                                                    <td className="border px-4 py-2">{item["Dosen Pembimbing 1"]}</td>
                                                                    <td className="border px-4 py-2 font-light text-gray-400">...</td>
                                                                </tr>
                                                            ))
                                                        }
                                                        <tr>
                                                            <td className="border px-4 py-2 font-light text-gray-400">...</td>
                                                            <td className="border px-4 py-2 font-light text-gray-400">...</td>
                                                            <td className="border px-4 py-2 font-light text-gray-400">...</td>
                                                            <td className="border px-4 py-2 font-light text-gray-400">...</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button onClick={() => setHideFile(!hideFile)} className='mx-auto mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded'>Ganti File</button>
                                            </div>
                                        }
                                    </div>
                                    <div className='flex-row-reverse'>
                                        <PrimaryButton
                                            type="submit"
                                            className="w-24 justify-start bg-amber-500 hover:bg-amber-600 mt-2 ml-1"
                                            disabled={processing || data.file == null}
                                        >
                                            Tambah
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </Tab.Panel>
                        </Tab.Panels>

                    </Tab.Group>

                </div>
            </section>
        </AdminLayout>
    )
}
