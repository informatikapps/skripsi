
import AdminAuthenticated from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { Link } from '@inertiajs/react';
import { Switch } from '@headlessui/react'

export default function Edit({ auth, errors, status, mahasiswa, dosen }) {

    const { data, setData, patch, processing, errors: formErrors } = useForm({
        name: mahasiswa.name,
        nim: mahasiswa.username,
        dosen_pembimbing_1: mahasiswa.mhs.dosen_pembimbing_1,
        dosen_pembimbing_2: mahasiswa.mhs.dosen_pembimbing_2,
    });
    // console.log('mahasiswa', mahasiswa.tugasakhir)
    console.log('mahasiswa', mahasiswa)
    // console.log('data', data)
    // console.log('dosen', dosen)


    const handleSubmit = (e) => {
        e.preventDefault()
        patch(route('admin.mahasiswaeditpost', mahasiswa.id))
    }

    return (

        <AdminAuthenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Mahasiswa</h2>}
            back={true}
            refback={route('admin.mahasiswa')}
        >
            <Head title="Edit Mahasiswa" />
            <div className='max-w-7xl mx-24 space-y-6'>
                <section className='sm:py-8 sm:px-16 bg-slate-100 shadow rounded-b-xl'>
                    <form onSubmit={handleSubmit} className=''>
                        <div className='flex text-justify'>

                            <InputLabel
                                htmlFor="nama"
                                value="Nama"
                                className='pr-2 py-2 mt-2 w-[18%]'
                            />
                            <TextInput
                                type="text"
                                name="nama"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-1/2"
                                autoComplete="nama"
                                isFocused={true}
                            />

                        </div>
                        <div className="flex">

                            <InputLabel
                                htmlFor="nim"
                                value="NIM"
                                className='pr-2 py-2 mt-2 w-[18%]'
                            />
                            <TextInput
                                type="text"
                                name="nim"
                                value={data.nim}
                                onChange={(e) => setData('nim', e.target.value)}
                                className="w-48"
                                autoComplete="nim"
                            />
                        </div>
                        {mahasiswa.mhs.tema !== null && mahasiswa.mhs.pesan !== null ? (
                            <div>
                                <div className="flex">

                                    <InputLabel
                                        htmlFor="dosbing"
                                        value="Dosen Pembimbing 1"
                                        className='mt-2 py-2 w-[18%]'
                                    />
                                    <select
                                        name="dosbing"
                                        id="dosbing"
                                        className="mt-2 block w-80 rounded-md border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500"
                                        onChange={(e) => setData('dosen_pembimbing_1', e.target.value)}
                                        defaultValue={data.dosen_pembimbing_1}
                                    >
                                        <option value="">Pilih Dosen Pembimbing...</option>
                                        {dosen.map((item, index) => (
                                            <option value={item.id}>{item.nama_dosen + " - " + item.nip}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='flex'>
                                    <InputLabel
                                        htmlFor="dosbing"
                                        value="Dosen Pembimbing 2"
                                        className='mt-2 py-2 w-[18%]'
                                    />
                                    <select
                                        name="dosbing"
                                        id="dosbing"
                                        className="mt-2 block w-80 rounded-md border-gray-300 text-gray-600 shadow-sm focus:ring-indigo-500"
                                        onChange={(e) => setData('dosen_pembimbing_2', e.target.value)}
                                        defaultValue={data.dosen_pembimbing_2}
                                    >
                                        <option value="">Pilih Dosen Pembimbing...</option>
                                        {dosen.map((item, index) => (
                                            <option value={item.id}>{item.nama_dosen + " - " + item.nip}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ) : null}
                        <div className='flex my-4'>
                            <InputLabel
                                htmlFor="tema"
                                value="Sudah Set Password?"
                                className='w-[18%]'
                            />
                            <p className={"w-fit px-2 pt-[0.1rem] text-sm rounded-lg shadow-sm " + (mahasiswa.has_set_password ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700") }>
                                {mahasiswa.has_set_password ? 'Sudah Set Password' : 'Belum Set Password'}
                            </p>
                        </div>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="tema"
                                value="Tema"
                                className='w-[18%] py-4'
                            />
                            <p className="font-black w-1/2 py-4">
                                {mahasiswa.mhs.tema !== null ? mahasiswa.mhs.tema : 'Belum ada tema'}
                            </p>
                        </div>

                        <InputLabel
                            htmlFor="pesan"
                            value="Pesan"
                            className='mt-4 block w-full'
                        />
                        <p className="text-lg mt-2 block w-full border rounded-lg border-white p-3">
                            {mahasiswa.mhs.pesan !== null ? mahasiswa.mhs.pesan : 'Belum ada pesan'}
                        </p>

                        {mahasiswa.tugasakhir ? (
                            <div className='flex-1 mt-2 text-indigo-500'>
                                <div className='flex-row-reverse'>
                                    <Link
                                        href={route('admin.taedit', mahasiswa.tugasakhir)}
                                        className='text-center hover:font-semibold hover:underline'
                                    >
                                        Link menuju tugas akhir
                                    </Link>
                                </div>
                            </div>) :
                            (mahasiswa.mhs.dosen_pembimbing_1 !== null && mahasiswa.mhs.dosen_pembimbing_2 !== null ?
                                <div className='flex-1 mt-3 text-red-500 bg-red-200 w-fit px-2 rounded-xl'>
                                    <div className='flex-row-reverse'>
                                        Belum Diisikan Tugas Akhir
                                    </div>
                                </div> : null
                            )}


                        <PrimaryButton
                            className='mt-4'
                            type='submit'
                        >
                            Simpan
                        </PrimaryButton>
                        <Link href={route('admin.reset', mahasiswa.id)} method='post' as='button'>
                        <SecondaryButton
                            className='ml-2 mt-4'
                            type='button'
                        >
                            Reset Password
                        </SecondaryButton>
                        </Link>
                    </form>

                </section>
            </div>
        </AdminAuthenticated>
    );
}
