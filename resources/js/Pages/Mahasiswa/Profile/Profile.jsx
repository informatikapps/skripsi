import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { ExclamationCircleIcon, PlusCircleIcon } from '@heroicons/react/20/solid';
import Password from '@/Components/Password';
import { useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function Edit({ auth, errors, status, mahasiswa, dosbing1, dosbing2 }) {

    const { data, setData, patch, processing, errors: formErrors } = useForm({
        name: auth.user.name,
        nim: auth.user.username,
        no_hp: mahasiswa.no_hp,
        tema: mahasiswa.tema,
        pesan: mahasiswa.pesan,
        email: mahasiswa.email,
        irs: '',
        khs: '',
    });

    const [irs, setIrs] = useState(false);
    const [khs, setKhs] = useState(false);


    const handleIrsChange = (e) => {
        setData('irs', e.target.files[0]);
    }

    const handleKhsChange = (e) => {
        setData('khs', e.target.files[0]);
    }


    // console.log('data', data)
    // console.log('mahasiswa.tema', mahasiswa.tema)
    console.log('data.irs', data)

    const updated_at = new Date(mahasiswa.updated_at)


    // // console.log('auth', auth.user)
    // console.log('mahasiswa', mahasiswa)
    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            onSuccess: () => {
                // form.reset();
                setIsDataChanged(false);
            },
        });
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={'Profile'}

        >
            <Head title="Profile" />
            <div className='max-w-7xl mx-18 space-y-6'>
                <section className='sm:py-8 sm:px-14 bg-slate-100 shadow rounded-xl mx-24'>
                    <h1 className='font-bold text-xl'>Profil Lengkap Mahasiswa</h1>
                    <form className='mt-3' onSubmit={handleSubmit}>
                        <div className='flex text-justify'>

                            <InputLabel
                                htmlFor="nama"
                                value="Nama"
                                className='pr-3 py-2 mt-2 w-24'
                            />
                            <TextInput
                                type="text"
                                name="nama"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-80 disabled:opacity-50"
                                autoComplete="nama"
                                isFocused={true}
                                disabled={true}
                            />

                        </div>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="nim"
                                value="NIM"
                                className='py-2 mt-2 w-24'
                            />
                            <TextInput
                                type="text"
                                name="nim"
                                value={data.nim}
                                onChange={(e) => setData('nim', e.target.value)}
                                className="w-48 disabled:opacity-50"
                                autoComplete="nim"
                                isFocused={true}
                                disabled={true}
                            />

                        </div>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="no_hp"
                                value="No. HP"
                                className='mt-2 py-2 w-24'
                            />
                            <TextInput
                                type="text"
                                name="no_hp"
                                value={data.no_hp}
                                onChange={(e) => setData('no_hp', e.target.value)}
                                className="w-48 disabled:opacity-50"
                                isFocused={true}
                                disabled={mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ? true : false}
                            />
                        </div>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className='mt-2 w-24 py-2'
                            />
                            <TextInput
                                type="text"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-96 disabled:opacity-50"
                                isFocused={true}
                                disabled={mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ? true : false}
                            />
                        </div>

                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="tema"
                                value="Tema"
                                className='mt-2 pr-3 py-2 w-24'
                            />
                            <TextInput
                                type="text"
                                name="tema"
                                value={data.tema}
                                onChange={(e) => setData('tema', e.target.value)}
                                className="sm:w-10/12 disabled:opacity-50"
                                autoComplete="tema"
                                isFocused={true}
                                disabled={mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ? true : false}
                            />
                        </div>

                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="pesan"
                                value="Pesan"
                                className='mt-2 pr-3 py-2 w-24'
                            />
                            <textarea
                                type="text"
                                name="pesan"
                                value={data.pesan}
                                onChange={(e) => setData('pesan', e.target.value)}
                                className="w-10/12 border-gray-300 mt-2 rounded-md disabled:opacity-50"
                                autoComplete="pesan"
                                isFocused={true}
                                disabled={mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ? true : false}
                            />
                        </div>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="dosen_pembimbing_1"
                                value="Dosen Pembimbing 1"
                                className={'mt-2 pr-3 py-2 w-48' + (mahasiswa.dosen_pembimbing_1 === null && mahasiswa.dosen_pembimbing_2 === null ? ' hidden' : '')}
                            />
                            <TextInput
                                type="text"
                                name="dosen_pembimbing_1"
                                value={(dosbing1 !== null ? dosbing1.nama_dosen + ' - ' + dosbing1.nip : "")}
                                onChange={(e) => setData('dosen_pembimbing_1', e.target.value)}
                                className={"w-96 disabled:opacity-50" + (mahasiswa.dosen_pembimbing_1 === null && mahasiswa.dosen_pembimbing_2 === null ? ' hidden' : '')}
                                autoComplete="dosen_pembimbing_1"
                                isFocused={true}
                                disabled={true}
                            />
                        </div>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="dosen_pembimbing_2"
                                value="Dosen Pembimbing 2"
                                className={'mt-2 pr-3 py-2 w-48' + (mahasiswa.dosen_pembimbing_1 === null && mahasiswa.dosen_pembimbing_2 === null ? ' hidden' : '')}
                            />
                            <TextInput
                                type="text"
                                name="dosen_pembimbing_2"
                                value={(dosbing1 !== null ? dosbing2.nama_dosen + ' - ' + dosbing2.nip : "")}
                                onChange={(e) => setData('dosen_pembimbing_2', e.target.value)}
                                className={"w-96 disabled:opacity-50" + (mahasiswa.dosen_pembimbing_1 === null && mahasiswa.dosen_pembimbing_2 === null ? ' hidden' : '')}
                                autoComplete="dosen_pembimbing_2"
                                isFocused={true}
                                disabled={true}
                            />
                        </div>
                        {/* <h3 className='text-xl font-semibold mt-2'>Berkas</h3>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="irs"
                                value="IRS"
                                className='mt-2 pr-3 py-2 w-24'
                            />
                            {!irs ? 
                            <input
                                type="file"
                                name="irs"
                                onChange={handleIrsChange}
                                className="w-96 h-full mt-3 bg-neutral-100 border-gray-300 disabled:opacity-50"
                                autoComplete="irs"
                                isFocused={true}
                                disabled={mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ? true : false}
                            />
                                :
                                <>
                                <a href={data.irs} target="_blank" className="text-blue-500 underline mt-4" rel="noreferrer">Lihat Berkas</a>
                                    <PrimaryButton
                                        className='mt-4 ml-3 disabled:opacity-50 disabled:hover:bg-indigo-950'
                                        onClick={() => setIrs(false)}
                                    >
                                        Edit
                                    </PrimaryButton>
                                </>
}
                        </div>
                        <div className='flex mt-2'>
                            <InputLabel
                                htmlFor="khs"
                                value="KHS"
                                className='mt-2 pr-3 py-2 w-24'
                            />
                            {!khs ?
                                <input
                                    type="file"
                                    name="khs"
                                    onChange={handleKhsChange}
                                    className="w-96 h-full mt-3 disabled:opacity-50"
                                    autoComplete="khs"
                                    isFocused={true}
                                    disabled={mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ? true : false}
                                />
                                :
                                <>
                                <a href={data.khs} target="_blank" className="text-blue-500 underline mt-4" rel="noreferrer">Lihat Berkas</a>
                                <PrimaryButton
                                className='mt-4 ml-3 disabled:opacity-50 disabled:hover:bg-indigo-950'
                                onClick={() => setKhs(false)}
                                >
                                        Edit
                                    </PrimaryButton>
                                        </>
                            }
                        </div>
 */}


                        <PrimaryButton
                            className={'mt-4 disabled:opacity-50 disabled:hover:bg-indigo-950 ' + (mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2 ? 'hidden' : '')}
                            type='submit'
                            disabled={ processing}
                        >
                            Edit Profil
                        </PrimaryButton>


                    </form>
                    {!(mahasiswa.dosen_pembimbing_1 && mahasiswa.dosen_pembimbing_2) &&
                        <div className='flex bg-teal-400 text-white px-3 py-2 mt-2 rounded-lg w-full'>
                            <ExclamationCircleIcon className='w-10 h-10 text-white mr-2' />
                            Perhatian!
                            <br />Silakan tunggu Admin melakukan distribusi dosen pembimbing
                        </div>}
                </section>
                <section className='sm:py-8 sm:px-8 mx-24 bg-slate-100 shadow rounded-xl'>
                    <Password
                        auth={auth}
                        errors={errors}
                        status={status}
                    />
                </section>
            </div>
        </AuthenticatedLayout>
    );
}