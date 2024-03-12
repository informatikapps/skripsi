import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useState } from 'react';
import { set } from "lodash";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        judul_file: '',
        deskripsi: '',
        file: '',
    })
    const [hideFile, setHideFile] = useState(false)
    const [isDragOver, setIsDragOver] = useState(false)


    const handleCancelFile = () => {
        setData('file', '')
        setHideFile(true)
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
        setData('file', file)
        setHideFile(true)
        onUpload(file)  // this is the function that will handle the file upload
    }

    const handleFileUpload = (files) => {
        const file = files[0]
        if (file) {
            setData('file', file)
            setHideFile(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('file.store'))
    }

    // console.log('data', data)


    return (
        <AdminLayout
            header="Tambah File"
            refback={route('file.index')}
            back={true}
            desc="Halaman ini berisikan form untuk menambahkan file."
        >
            <Head title="Tambah File" />
            <form method="post" action={route('file.store')} className="bg-slate-100 shadow-md rounded items-center px-12 pt-6 pb-8 mb-4 mx-24" onSubmit={handleSubmit}>
                <div className="flex mb-4">
                    <InputLabel htmlFor="judul" value="Judul File" className="w-1/12 pt-4" />
                    <TextInput
                        id="judul_info"
                        type="text"
                        name="judul_info"
                        className="w-1/2"
                        placeholder="Judul"
                        onChange={(e) => setData('judul_file', e.target.value)}
                    />
                </div>
                <div className="flex">
                    <InputLabel htmlFor="deskripsi" value="Deskripsi" className="w-1/12 pt-4" />
                    <textarea
                        id="deskripsi"
                        name="deskripsi"
                        className="w-1/2 border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-zinc-300"
                        placeholder="Deskripsi"
                        onChange={(e) => setData('deskripsi', e.target.value)}
                    />
                </div>
                <div className="flex my-3">
                    <InputLabel htmlFor="file" value="Pilih File" className="w-1/12 pt-4" />
                    {!hideFile &&
                        <label htmlFor="dropzone-file"
                            className={"flex flex-col items-center justify-center w-3/4 h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" + (isDragOver ? ' border-indigo-500' : '')}
                            onDrop={handleFileDrop}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-6 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk memilih file</span> atau geser dan letakkan file</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" onChange={(e) => handleFileUpload(e.target.files)} />
                        </label>}
                    {hideFile &&
                        <div className="flex flex-col items-center justify-center w-3/4 h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 dark:border-gray-600 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                            <p className="text-base text-gray-500 dark:text-gray-400">File terpilih: {data.file.name}</p>
                            <button type="button" onClick={() => { handleCancelFile }} className="text-sm bg-rose-500 p-2 rounded-md my-1 text-indigo-100 hover:bg-rose-300">Batalkan</button>
                        </div>
                    }
                </div>

                <PrimaryButton
                    className=""
                    type="submit"
                    processing={processing}
                >
                    Tambah File
                </PrimaryButton>
            </form>



        </AdminLayout>
    )
}