import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import Table from '@/Components/Table';
import PrimaryButton from '@/Components/PrimaryButton';
import {
    useState,
    useEffect,
    useRef,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import SecondaryButton from '@/Components/SecondaryButton';


export default function Dashboard({ auth, tugasAkhir, search }) {
    
    const [searchKeyword, setSearchKeyword] = useState(search ? search : '')
    const [isOpen, setIsOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null); // State to store the ID of the item to delete

    const openModal = (id) => {
        setDeleteItemId(tugasAkhir.data.filter((item) => item.id === id)); // Set the ID of the item to delete
        setIsOpen(true);
        console.log('deleteItemId', deleteItemId)
    };


    const Cancel = () => {
        setIsOpen(false)
    }

    // console.log('tugasakhir.data', tugasAkhir.data.filter((item)=> item.id === 9))


    const inputRef = useRef(null);

    // console.log('tugasakhir', tugasAkhir)


    useEffect(() => {
        if(searchKeyword.length !== 0 && search !== null){
            inputRef.current.focus();
        }
    }, []);

    
    useEffect(() => {
        if (searchKeyword.length > 0 && (search === null || searchKeyword !== search)) {
            router.get(route('tugasakhir.index'), {search: searchKeyword})
        }

        else if (searchKeyword.length === 0 && search !== null) {
            router.get(route('tugasakhir.index'))
        }

    }, [searchKeyword])
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={'Tugas Akhir'}
            back={false}
        >
            <Head title="Dashboard" />

            <div className="sm:px-6 lg:px-8 mt-1">
                <div className="bg-slate-100 overflow-hidden shadow-sm rounded-lg py-4">
                    <div className="py-1 px-6 text-gray-900">
                        <div className="flex flex-row-reverse" >
                            <TextInput
                                ref={inputRef}
                                className='w-1/4'
                                placeholder='Cari Judul Tugas Akhir..'
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                        <div className='overflow-y-auto px-8 drop-shadow-sm rounded-md my-6'>
                            <Table
                                colname={['NIM', 'Nama', 'Judul', 'Periode', 'Aksi']}
                                className='min-w-full divide-y divide-gray-200 text-base'
                            >
                                {
                                    tugasAkhir.data.map((item, index) => (
                                        <tr key={index} className='font-light text-sm'>
                                            <td className='flex items-center px-3'>
                                                <span className='mt-4 w-16'>{item.ni_mhs}</span>
                                            </td>
                                            <td className='text-wrap w-fit'>
                                                {item.nama_mhs}
                                            </td>
                                            <td className='text-wrap w-1/3'>
                                                {item.judul_ta}
                                            </td>
                                            <td className='px-3 text-wrap w-16'>
                                                {item.periode}
                                            </td>
                                            <td className='px-3'>
                                                <div className='flex w-12'>
                                                        <PrimaryButton
                                                            className='mr-1 my-2'
                                                            onClick={() => openModal(item.id)}
                                                        >
                                                            Detail
                                                        </PrimaryButton>
                                                </div>
                                            </td>
                                            <Transition appear show={isOpen} as={Fragment}>
                                                <Dialog as="div" className="relative z-10" onClose={Cancel}>
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter=""
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave=""
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
                                                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                                                    <Dialog.Title
                                                                        as="h3"
                                                                        className="text-lg font-medium leading-6 text-gray-900"
                                                                    >
                                                                        Detail Tugas Akhir
                                                                    </Dialog.Title>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            NIM
                                                                        </p>
                                                                        <h1
                                                                            className="text-lg font-semibold text-gray-900"
                                                                            id="modal-headline"
                                                                        >
                                                                            {deleteItemId && deleteItemId[0].ni_mhs}
                                                                        </h1>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            Nama
                                                                        </p>
                                                                        <h1
                                                                            className="text-lg font-semibold text-gray-900"
                                                                            id="modal-headline"
                                                                        >
                                                                            {deleteItemId && deleteItemId[0].nama_mhs}
                                                                        </h1>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            Judul
                                                                        </p>
                                                                        <h1
                                                                            className="text-lg font-semibold text-gray-900"
                                                                            id="modal-headline"
                                                                        >
                                                                            {deleteItemId && deleteItemId[0].judul_ta}
                                                                        </h1>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500">
                                                                            Periode
                                                                        </p>
                                                                        <h1
                                                                            className="text-lg font-semibold text-gray-900"
                                                                            id="modal-headline"
                                                                        >
                                                                            {deleteItemId && deleteItemId[0].periode}
                                                                        </h1>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <h1
                                                                            className="text-lg font-semibold text-gray-900"
                                                                            id="modal-headline"
                                                                            >
                                                                            Abstrak
                                                                        </h1>
                                                                        <p className="text-sm text-gray-500">
                                                                        {deleteItemId && deleteItemId[0].abstrak}
                                                                        </p>
                                                                    </div>



                                                                    <div className="mt-4">
                                                                        <SecondaryButton
                                                                            className='mr-1 my-2'
                                                                            onClick={Cancel}
                                                                        >
                                                                            Selesai
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
                        <Pagination
                            links={tugasAkhir.links}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
