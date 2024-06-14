import AdminAuthenticated from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
// import {Inertia} from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import { Fragment, useState, useEffect, useRef } from 'react';
import Pagination from '@/Components/Pagination';
import { UserCircleIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import { Popover, Transition, Switch, Dialog } from '@headlessui/react';
import { usePrevious } from 'react-use';
import TextInput from '@/Components/TextInput';
import { PlusIcon } from '@heroicons/react/20/solid';
import SecondaryButton from '@/Components/SecondaryButton';
// import Link from '@/Components/Link';


export default function IndexTA({ auth, tugasakhir, status_acc, search }) {

    const [enabled, setEnabled] = useState(false); // this is actually a VERY BAD practice, but I'm too lazy to change the variable name
    const [searchKeyword, setSearchKeyword] = useState(''); // this is actually a VERY BAD practice, but I'm too lazy to change the variable name
    const [isOpen, setIsOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to delete

    const inputRef = useRef(null);
    const openModal = (id) => {
        setDeleteItemId(id); // Set the ID of the item to delete
        setIsOpen(true);
    };

    const closeModal = () => {
        if (deleteItemId) {
            // Execute the deletion and refresh actions
            router.delete(route('admin.tadelete', deleteItemId)).then(() => {
                router.reload() // Refresh the page after deletion
            });
        }
        setIsOpen(false);
    };

    const Cancel = () => {
        setIsOpen(false)
    }

    console.log('enabled', enabled)

    const handleFilter = () => {
        setEnabled(!enabled)
        if (!enabled) {
            router.get(route('admin.ta'), { status_acc: 0, search: (searchKeyword) }, { preserveState: true })
        } else {
            router.get(route('admin.ta'), { search: (searchKeyword) }, { preserveState: true })
        }
    }

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value)
        if (e.target.value.length > 0) {
            router.get(route('admin.ta'), { status_acc: (enabled ? 0 : null), search: e.target.value }, { preserveState: true })
        } else {
            router.get(route('admin.ta'), {}, { preserveState: true })
        }
    }

    // console.log('status_acc', status_acc)

    // const { route } = usePage().props
    // Inertia.get(route('admin.tugasakhir'))
    // console.log('tugasakhir', tugasakhir)
    // Inertia.get('/admin/tugasakhir', { page: 1 })

    return (

        <AdminAuthenticated
            user={auth.user}
            header={'Kelola Tugas Akhir'}
            back={false}
        >
            <Head title="Tugas Akhir" />
            <section className="bg-slate-100 mx-24 rounded-b-xl overflow-y-auto">
                <div className="px-2 py-4 text-lg">
                    <div className="flex justify-between">
                        <div className="flex-auto">
                            <div className="max-w-7xl mx-auto sm:px-4 lg:px-6">
                                <div className="flex justify-between">

                                    <div className='flex'>

                                        <Link href={route('admin.tacreate')}>
                                            <PrimaryButton
                                                className='mr-1 my-2'
                                            >
                                                <PlusIcon className='h-5 w-5 ml-1 mr-2  text-white' />
                                                Tambah Tugas Akhir
                                            </PrimaryButton>
                                        </Link>
                                    </div>
                                    <div className="flex z-10">
                                        <Popover className="relative">
                                            {({ open }) => (
                                                <>
                                                    <Popover.Button
                                                        className={`
                                                        ${open ? '' : 'text-opacity-90'}
                                                        text-gray-500 hover:text-opacity-100 hover:ring-2 hover:ring-sky-900 hover:ring-opacity-50 px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 mt-[0.7rem]
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
                                                                            Tampilkan TA yang belum disetujui
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
                                                ref={inputRef}
                                                className='w-full'
                                                placeholder='Cari Judul Tugas Akhir..'
                                                value={searchKeyword}
                                                onChange={handleSearch}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="my-3 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                    <Table
                                        colname={['NIM', 'Nama', 'Judul', 'Periode', 'Aksi']}
                                        className='min-w-full divide-y divide-gray-200 text-base'
                                    >
                                        {
                                            tugasakhir.data.map((item, index) => (
                                                <tr key={index} className='font-light text-sm'>
                                                    <td className='flex items-center px-3'>
                                                        <span className='mr-2 mt-3'>{item.ni_mhs}</span>
                                                        <UserCircleIcon className={'w-5 pt-[12px]' + (item.user_id == auth.user.id ? " hidden" : " ") + (item.status_acc ? " fill-rose-500" : " fill-emerald-500")} />
                                                    </td>
                                                    <td className='px-3'>
                                                        {item.nama_mhs.length > 30 ? item.nama_mhs.substring(0, 30) + '...' : item.nama_mhs}
                                                    </td>
                                                    <td className='px-3'>
                                                        {item.judul_ta.length > 30 ? item.judul_ta.substring(0, 30) + '...' : item.judul_ta}
                                                    </td>
                                                    <td className='px-3'>
                                                        {item.periode}
                                                    </td>
                                                    <td className='px-3 whitespace-nowrap'>
                                                        <Link href={route('admin.taedit', item.id)}>
                                                            <PrimaryButton
                                                                className='mr-1 my-1'
                                                            >
                                                                Edit
                                                            </PrimaryButton>
                                                        </Link>
                                                        <SecondaryButton
                                                            className='mr-1 my-1'
                                                            onClick={() => openModal(item.id)}
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
                                    <Pagination
                                        links={tugasakhir.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminAuthenticated>
    );
}
