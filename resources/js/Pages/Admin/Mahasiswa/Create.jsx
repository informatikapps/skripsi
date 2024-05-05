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

export default function Example({ auth, errors, status, image }) {

    const { data, setData, post, processing, errors: formErrors } = useForm({
        name: '',
        nim: '',
        mhsJson: null,
    });
    // console.log('data', data)
    const [hideFile, setHideFile] = useState(true)
    const [isDragOver, setIsDragOver] = useState(false)

    // console.log('helo')
    // console.log(image)
    // console.log('data', data)
    // console.log('file', tempFile)

    const handleCancelFile = () => {
        setData('mhsJson', '')
        setHideFile(!hideFile)
    }

    const handleDragEnter = () => {
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    const handleFileDrop = (e) => {
        e.preventDefault()
        setIsDragOver(false)
        const file = e.dataTransfer.files[0]
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            // console.log('JSON Data:', jsonData);
            setData('mhsJson', jsonData.stringify())
            setHideFile(!hideFile)
        }

        if (file) {
            reader.readAsArrayBuffer(file);
        }
        onUpload(mhsJson)  // this is the function that will handle the file upload
    }


    const handleSubmit = (e) => {
        // console.log('submit')
        e.preventDefault()
        post(route('admin.mahasiswacreatepost'), {
            nim: data.nim,
            name: data.name,
        })
    }

    const handleSubmitBulk = (e) => {
        //console.log('submit bulk')
        e.preventDefault()
        if (!hideFile) {
            console.log('hideFile', hideFile)
            post(route('admin.mahasiswaimport'),
                {
                    file: data.mhsJson
                }
            )
        }
    }

    const handleFileUpload = (files) => {
        const file = files[0];
        // console.log('file', file)
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Assuming the data is in the first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            // Convert sheet data to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setData('mhsJson', JSON.stringify(jsonData))
            //console.log('mhsJson', data.name)
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
            header={'Tambah Mahasiswa'}
            back={true}
            refback={route('admin.mahasiswa')}
        >
            <Head title="Tambah Mahasiswa" />
            <section className='8 bg-slate-100 shadow rounded-b-xl mx-24 overflow-y-auto'>
                <div className="w-full ">
                    <Tab.Group>
                        <Tab.List className="flex space-x-2 rounded-xl bg-blue-900/20 p-1 mx-3 mt-1">
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
                                onClick={() => setData('mhsJson', null)}
                            >
                                Isi Nama dan NIM
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
                                onClick={() => {setData('name', ''); setData('nim', ''); setHideFile(true)}}
                            >
                                Tambahkan dari File
                            </Tab>
                        </Tab.List>
                        <Tab.Panels className="mt-1 mx-1">
                            <Tab.Panel className="w-full rounded-lg py-2.5 text-sm font-medium leading-5">
                                <form onSubmit={handleSubmit}>

                                    <div className='px-16 py-3 bg-slate-50 rounded-lg'>
                                        <div className='flex'>
                                            <InputLabel
                                                htmlFor="nama"
                                                value="Nama"
                                                className='pr-3 py-2 mt-2'
                                            />
                                            <TextInput
                                                type="text"
                                                name="nama"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-96"
                                                autoComplete="nama"
                                                isFocused={true}
                                            />
                                        </div>
                                        <div className='flex mt-3'>
                                            <InputLabel
                                                htmlFor="NIM"
                                                value="NIM"
                                                className='px-3 py-2 mt-2'
                                            />
                                            <TextInput
                                                type="text"
                                                name="nim"
                                                value={data.nim}
                                                onChange={(e) => setData('nim', e.target.value)}
                                                className="w-56"
                                                autoComplete="nim"
                                                isFocused={true}
                                            />
                                        </div>

                                    </div>
                                    <div className='flex-row-reverse'>
                                        <PrimaryButton
                                            type="submit"
                                            className="w-24 justify-start bg-amber-500 hover:bg-amber-600 mt-4 ml-4"
                                            processing={processing}
                                        >
                                            Tambah
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </Tab.Panel>
                            <Tab.Panel className="w-full rounded-lg py-2.5 text-sm font-medium leading-5">
                                <form onSubmit={handleSubmitBulk}>
                                    <p className='flex w-full my-6 px-4 justify-left'>
                                        Masukkan file dalam bentuk .xslx dengan format spreadsheet sebagai berikut
                                    </p>
                                    <img src={`data:image/png;base64,${image}`} alt="" className='mx-auto my-4' />
                                    <p className='flex w-full my-6 px-4 justify-left font-semibold'>
                                        Pastikan JUDUL KOLOM (NIM, Nama) sudah sesuai serta NIM dimulai dari kolom A2 dan nama dimulai dari kolom B2 ke bawah
                                    </p>
                                    <div className='justify-center py-3 bg-slate-50 rounded-lg flex'>

                                        {hideFile &&
                                            <div className="flex items-center justify-center w-full">
                                                <label 
                                                    htmlFor="dropzone-file" 
                                                    onDrop={handleFileDrop}
                                                    onDragEnter={handleDragEnter}
                                                    onDragLeave={handleDragLeave}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                    >
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
                                        {!hideFile &&
                                            <div className='flex flex-col justify-center w-2/3'>
                                                <p className='text-left font-semibold'>Data yang terbaca:</p>
                                                <table className="table-auto w-full">
                                                    <thead>
                                                        <tr>
                                                            <th className="px-4 py-2 w-1/3 bg-slate-100">NIM</th>
                                                            <th className="px-4 py-2 bg-slate-100">Nama</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.file &&
                                                            data.file.slice(0, 3).map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className="border px-4 py-2">{item.NIM}</td>
                                                                    <td className="border px-4 py-2">{item.Nama}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                        {data.file &&
                                                            <tr>
                                                                <td className="border px-4 py-2">...</td>
                                                                <td className="border px-4 py-2">...</td>
                                                            </tr>
                                                        }
                                                        {data.file &&
                                                            data.file.slice(-1).map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className="border px-4 py-2">{item.NIM}</td>
                                                                    <td className="border px-4 py-2">{item.Nama}</td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                                <button onClick={handleCancelFile} className='mx-auto mt-4 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded'>Ganti File</button>
                                            </div>
                                        }
                                    </div>
                                    <div className='flex-row-reverse'>
                                        <PrimaryButton
                                            type="submit"
                                            className="w-24 justify-start bg-amber-500 hover:bg-amber-600 mt-2 ml-2"
                                            processing={processing}
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
