import AdminAuthenticated from '@/Layouts/AdminLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
// import {Link as LinkInertia} from '@inertiajs/inertia-react';
// import {Inertia} from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import { Fragment, useState } from 'react';
import Pagination from '@/Components/Pagination';
import { ArrowDownTrayIcon, PlusIcon } from '@heroicons/react/20/solid';
import TextInput from '@/Components/TextInput';
import { Dialog, Transition } from '@headlessui/react'

// import Link from '@/Components/Link';

import SecondaryButton from '@/Components/SecondaryButton';

export default function IndexFile({ auth, files }) {

    // const { route } = usePage().props
    // Inertia.get(route('admin.tugasakhir'))
    // console.log('tugasakhir', tugasakhir)
    // Inertia.get('/admin/tugasakhir', { page: 1 })
    // console.log('informasi', informasi)

    const [isOpen, setIsOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to delete

    const openModal = (id) => {
        setDeleteItemId(id); // Set the ID of the item to delete
        setIsOpen(true);
    };

    const closeModal = () => {
        if (deleteItemId) {
            // Execute the deletion and refresh actions
            router.delete(route('file.destroy', deleteItemId)).then(() => {
                router.reload(); // Refresh the page after deletion
            });
        }
        setIsOpen(false);
    };

    const Cancel = () => {
        setIsOpen(false)
    }
    




    return (

        <AdminAuthenticated
            user={auth.user}
            header={'Kelola File'}
            back={false}
        >
            <Head title="Kelola File" />
            <section className="bg-slate-100 mx-24 rounded-b-xl overflow-y-auto">
                <div className="px-2 py-4 text-lg">
                    <div className="flex justify-between">
                        <div className="flex-auto">
                            <div className="max-w-7xl mx-auto sm:px-4 lg:px-6">
                                <div className='flex justify-between mb-3'>
                                    <Link href={route('file.create')}>
                                        <PrimaryButton
                                            className='mr-1 my-2'
                                        >
                                        <PlusIcon className='h-5 ml-1 mr-2 text-white' />
                                            Tambah File
                                        </PrimaryButton>
                                    </Link>
                                    <div className="flex" >
                                        <TextInput
                                            className='w-[25rem]'
                                            placeholder='Cari File...'
                                        />
                                    </div>
                                </div>
                                <div className='flex my-2'>
                                    <Table
                                        colname={['Judul', 'Tanggal Dibuat','Lihat File', 'Aksi']}
                                        className='min-w-full divide-y divide-gray-200 text-base'
                                    >
                                        {
                                            files.data.map((item, index) => (
                                                <tr key={index} className='font-light text-sm'>
                                                    <td className='px-3'>
                                                        {item.nama_file.length > 30 ? item.nama_file.substring(0, 30) + '...' : item.nama_file}
                                                    </td>
                                                    <td className='px-2'>
                                                        {new Date(item.created_at).toLocaleDateString('en-GB')}
                                                    </td>
                                                    <td className='px-2 flex'>
                                                        <Link href={route('file.show', item.id)}>
                                                            <SecondaryButton
                                                                className='mr-1 my-2'
                                                            >
                                                            <ArrowDownTrayIcon className='h-5 w-5 ml-1 mr-2  text-neutral-500' />
                                                                Download
                                                            </SecondaryButton>
                                                        </Link>

                                                    </td>
                                                    <td className='px-1'>
                                                        <div className='flex'>
                                                            <Link href={route('file.edit', item.id)}>
                                                                <PrimaryButton
                                                                    className='mr-1 my-2'
                                                                >
                                                                    Edit
                                                                </PrimaryButton>
                                                            </Link>
                                                                <SecondaryButton
                                                                    className='mr-1 my-2'
                                                                    as="button"
                                                                    onClick={() => openModal(item.id)}
                                                                >
                                                                    Delete
                                                                </SecondaryButton>

                                                        </div>
                                                    </td>
                                                    <Transition appear show={isOpen} as={Fragment}>
                                                        <Dialog as="div" className="relative z-10" onClose={Cancel}>
                                                            <Transition.Child
                                                                as={Fragment}
                                                                enter="ease-out duration-300"
                                                                enterFrom="opacity-0"
                                                                enterTo="opacity-100"
                                                                leave="ease-in duration-200"
                                                                leaveFrom="opacity-100"
                                                                leaveTo="opacity-0"
                                                            >
                                                                <div className="fixed inset-0 bg-black/25" />
                                                            </Transition.Child>

                                                            <div className="fixed inset-0 overflow-y-auto">
                                                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                                    <Transition.Child
                                                                        as={Fragment}
                                                                        enter="ease-out duration-300"
                                                                        enterFrom="opacity-0 scale-95"
                                                                        enterTo="opacity-100 scale-100"
                                                                        leave="ease-in duration-200"
                                                                        leaveFrom="opacity-100 scale-100"
                                                                        leaveTo="opacity-0 scale-95"
                                                                    >
                                                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                                            <Dialog.Title
                                                                                as="h3"
                                                                                className="text-lg font-medium leading-6 text-gray-900"
                                                                            >
                                                                                Konfirmasi penghapusan
                                                                            </Dialog.Title>
                                                                            <div className="mt-2">
                                                                                <p className="text-sm text-gray-500">
                                                                                    Apakah anda yakin ingin menghapus file ini?
                                                                                </p>
                                                                            </div>

                                                                            <div className="mt-4">
                                                                                <button
                                                                                    type="button"
                                                                                    className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-950 px-4 py-2 text-xs font-medium capitalize text-neutral-100 hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                                    onClick={closeModal}
                                                                                >
                                                                                    Ya
                                                                                </button>
                                                                                <SecondaryButton
                                                                                    className='ml-2'
                                                                                    onClick={Cancel}
                                                                                >
                                                                                    Tidak
                                                                                </SecondaryButton>
                                                                            </div>
                                                                        </Dialog.Panel>
                                                                    </Transition.Child>
                                                                </div>
                                                            </div>
                                                        </Dialog>
                                                    </Transition>
                                                </tr>
                                            ))

                                        }
                                    </Table>
                                </div>
                                <Pagination links={files.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminAuthenticated>
    );
}
