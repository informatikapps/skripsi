import AdminAuthenticated from '@/Layouts/AdminLayout';
import { useState, Fragment, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import Table from '@/Components/Table';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Pagination from '@/Components/Pagination';
import { Dialog, Popover, Transition, Switch } from '@headlessui/react';
import { usePrevious } from 'react-use';
import TextInput from '@/Components/TextInput';
import {PlusIcon} from '@heroicons/react/20/solid';
import Toast from '@/Components/Toast';


export default function Dashboard({ auth, mahasiswa, where, message }) {
    const [enabled, setEnabled] = useState(where); // this is actually a VERY BAD practice, but I'm too lazy to change the variable name
    const [searchKeyword, setSearchKeyword] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to delete


    console.log('message', message)

    const openModal = (id) => {
        setDeleteItemId(id); // Set the ID of the item to delete
        setIsOpen(true);
    };

    const closeModal = () => {
        if (deleteItemId) {
            // Execute the deletion and refresh actions
            router.delete(route('admin.mahasiswadelete', deleteItemId)).then(() => {
                router.reload(); // Refresh the page after deletion
            });
        }
        setIsOpen(false);
    };

    const Cancel = () => {
        setIsOpen(false)
    }

    const handleFilter = () => {
        setEnabled(!enabled)
        if (!enabled) {
            router.get(route('admin.mahasiswa'), { where: 'dosbing', search: searchKeyword }, { preserveState: true })
        } else {
            router.get(route('admin.mahasiswa'), {}, { preserveState: true })
        }
    }

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value)
        if (e.target.value.length > 0) {
            router.get(route('admin.mahasiswa'), { where: (enabled ? 'dosbing' : null), search: e.target.value }, { preserveState: true })
        } else {
            router.get(route('admin.mahasiswa'), {where: (enabled ? 'dosbing' : null)}, { preserveState: true })
        }
    }



    // console.log(mahasiswa, 'mahasiswa')
    return (
        <AdminAuthenticated
            user={auth.user}
            header={'Kelola Mahasiswa'}
            back={false}
        >
            {message &&
                <Toast>
                {message}
            </Toast>
            }
            <Head title="Dashboard" />
            <section className="bg-slate-100 mx-24 rounded-b-xl overflow-x-auto">
                <div className="px-1 py-4 text-lg">
                    <div className="flex justify-between">
                        <div className="flex-auto">
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 overflow">
                                <div className="flex justify-between">

                                <Link href={route('admin.mahasiswacreate')}>
                                    <PrimaryButton
                                        className='mr-1 my-2'
                                        >
                                        <PlusIcon className='h-5 w-5 ml-1 mr-2  text-white' />
                                        Tambah Mahasiswa
                                    </PrimaryButton>
                                </Link>
                                <div className="flex z-10">
                                    <Popover className="relative">
                                        {({ open }) => (
                                            <>
                                                <Popover.Button
                                                    className={`
                                                    ${open ? '' : 'text-opacity-90'}
                                                    text-gray-500 hover:text-opacity-100 hover:ring-2 hover:ring-sky-900 hover:ring-opacity-50 px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-[0.8rem]
                                                    `}
                                                    >
                                                    <div className="flex">
                                                        Filter
                                                        <AdjustmentsHorizontalIcon className="ml-2 mt-[0.3rem] h-5 w-5 text-gray-500 group-hover:text-gray-400" aria-hidden="true" />
                                                    </div>
                                                </Popover.Button>

                                                <Transition
                                                    show={open}
                                                    as={Fragment}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="opacity-0 translate-y-1"
                                                    enterTo="opacity-100 translate-y-0"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="opacity-100 translate-y-0"
                                                    leaveTo="opacity-0 translate-y-1"
                                                    >
                                                    <Popover.Panel
                                                        static
                                                        className="absolute z-100 ml-36 w-screen max-w-xs px-4 mt-3 transform -translate-x-1/2 sm:px-0"
                                                        >
                                                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                                <div className="flex items-start">
                                                                    <span className='text-sm'>
                                                                        Tampilkan Mahasiswa yang belum mendapat dosen pembimbing
                                                                    </span>
                                                                    <Switch
                                                                        checked={enabled}
                                                                        onChange={handleFilter}
                                                                        className={`${enabled ? 'bg-sky-700' : 'bg-sky-200'}
                                                                        relative inline-flex h-[19px] w-[37px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75 mt-[0.3rem] ml-3`}
                                                                        >
                                                                        <span className="sr-only">Use setting</span>
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={`${enabled ? 'translate-x-[1.125rem]' : 'translate-x-0'}
                                                                            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                                                            />
                                                                    </Switch>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Popover.Panel>
                                                </Transition>
                                            </>
                                        )}
                                    </Popover>
                                    <div className="flex flex-row-reverse" >
                                        <TextInput
                                            className='w-full'
                                            placeholder='Cari Mahasiswa..'
                                            value={searchKeyword}
                                            onChange={handleSearch}
                                            />
                                    </div>
                                            </div>

                                </div>
                                <div className="my-4 bg-white shadow-sm sm:rounded-lg">
                                    <Table
                                        colname={['NIM', 'Nama', 'Status', 'Aksi']}
                                        className='min-w-full divide-y divide-gray-200 text-sm'
                                    >
                                        {
                                            mahasiswa.data.map((item, index) => (
                                                <tr key={index} className='text-sm'>
                                                    <td className='px-3 w-1/6 whitespace-nowrap'>
                                                        {item.user.username}
                                                    </td>
                                                    <td className='px-3 w-1/3'>
                                                        {item.user.name}
                                                    </td>
                                                    <td className='px-3 whitespace-nowrap'>
                                                        {item.user.sudah_lulus ?
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-sky-100 text-sky-800">
                                                                Lulus
                                                            </span>
                                                            :
                                                            (item.dosen_pembimbing_1 !== null && item.dosen_pembimbing_2 !== null ?
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    Sedang Mengerjakan Tugas Akhir
                                                                </span>
                                                                :
                                                                (item.pesan && item.tema ?
                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                                        Belum Mendapat Dosen Pembimbing
                                                                    </span>
                                                                    :
                                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                        Belum Ada Pesan
                                                                    </span>
                                                                )
                                                            )
                                                        }
                                                    </td>
                                                    <td className='px-3 whitespace-nowrap text-sm'>
                                                        <Link href={route('admin.mahasiswaedit', item.user.id)}>
                                                            <PrimaryButton
                                                                className='mr-1 text-sm'
                                                            >
                                                                Edit
                                                            </PrimaryButton>
                                                        </Link>
                                                        <SecondaryButton
                                                            className='mr-1 my-1'
                                                            onClick={() => openModal(item.user.id)}
                                                        >
                                                            Hapus
                                                        </SecondaryButton>
                                                        <Transition appear show={isOpen} as={Fragment}>
                                                            <Dialog as="div" className="relative z-10" onClose={Cancel}>
                                                                <Transition.Child
                                                                    as={Fragment}
                                                                    enter="ease-out duration-50"
                                                                    enterFrom="opacity-0"
                                                                    enterTo="opacity-100"
                                                                    leave="ease-in duration-50"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <div className="fixed inset-0 bg-gray-500/10" />
                                                                </Transition.Child>

                                                                <div className="fixed inset-0 overflow-y-auto">
                                                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                                        <Transition.Child
                                                                            as={Fragment}
                                                                            enter="ease-out duration-50"
                                                                            enterFrom="opacity-0 scale-95"
                                                                            enterTo="opacity-100 scale-100"
                                                                            leave="ease-in duration-50"
                                                                            leaveFrom="opacity-100 scale-100"
                                                                            leaveTo="opacity-0 scale-95"
                                                                        >
                                                                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                                                <Dialog.Title
                                                                                    as="h3"
                                                                                    className="text-lg font-medium leading-6 text-gray-900"
                                                                                >
                                                                                    Konfirmasi Penghapusan
                                                                                </Dialog.Title>
                                                                                <div className="mt-2">
                                                                                    <p className="text-sm text-gray-500">
                                                                                        Anda yakin ingin menghapus data ini?
                                                                                    </p>
                                                                                </div>



                                                                                <div className="mt-4">
                                                                                        <PrimaryButton
                                                                                            className='mr-1 my-2'
                                                                                            onClick={closeModal}
                                                                                        >
                                                                                            Hapus
                                                                                        </PrimaryButton>
                                                                                    <SecondaryButton
                                                                                        className='mr-1 my-2'
                                                                                        onClick={Cancel}
                                                                                    >
                                                                                        Batal
                                                                                    </SecondaryButton>
                                                                                </div>
                                                                            </Dialog.Panel>
                                                                        </Transition.Child>
                                                                    </div>
                                                                </div>
                                                            </Dialog>
                                                        </Transition>
                                                    </td>

                                                </tr>

                                            ))
                                        }
                                    </Table>
                                </div>
                            </div>
                                    <Pagination
                                        links={mahasiswa.links}
                                         />
                        </div>
                    </div>
                </div>
            </section>
        </AdminAuthenticated>
    );
}


// export default function Switches() {
//     const [enabled, setEnabled] = useState(false)

//     return (

//     )
// }