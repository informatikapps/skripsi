import AdminAuthenticated from '@/Layouts/AdminLayout';
import { Head, Link, usePage } from '@inertiajs/react';
// import {Inertia} from '@inertiajs/inertia';
import PrimaryButton from '@/Components/PrimaryButton';
import Table from '@/Components/Table';
import { Fragment, useState } from 'react';
import Pagination from '@/Components/Pagination';
import SearchBar from '@/Components/SearchBar';
import TextInput from '@/Components/TextInput';
import Toast from '@/Components/Toast'; 
// import Link from '@/Components/Link';

import SecondaryButton from '@/Components/SecondaryButton';

export default function IndexInfo({ auth, informasi, message }) {
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
            header={'Kelola Informasi'}
            back={false}
            desc='Informasi yang ditampilkan pada halaman utama'
        >
            {message && (
                <Toast className='top-3 right-3' onClose={() => setMessage('')}>
                    {message}
                </Toast>
            )}
            <Head title="Tugas Akhir" />
            <section className="bg-slate-100 mx-24 rounded-b-xl overflow-y-auto">
                <div className="px-2 py-4 text-lg">
                    <div className="flex justify-between">
                        <div className="flex-auto">
                            <div className="max-w-7xl mx-auto sm:px-4 lg:px-6">
                                <div className='flex justify-between'>

                                    <Link href={route('pengumuman.create')}>
                                        <PrimaryButton
                                            className='mr-1 my-2'
                                        >
                                            Tambah Informasi
                                        </PrimaryButton>
                                    </Link>
                                    
                                    <TextInput
                                        className='w-1/2'
                                        placeholder='Cari Informasi...'
                                    />
                                </div>
                                <div className='flex my-2'>
                                    <Table
                                        colname={['Judul', 'Tanggal Ditulis', 'Aksi']}
                                        className='min-w-full divide-y divide-gray-200 text-base'
                                    >
                                        {
                                            informasi.data.map((item, index) => (
                                                <tr key={index} className='font-light text-sm'>
                                                    <td className='px-3'>
                                                        {item.judul_info.length > 30 ? item.judul_info.substring(0, 30) + '...' : item.judul_info}
                                                    </td>
                                                    <td className='px-2'>
                                                        {new Date(item.created_at).toLocaleDateString('en-GB')}
                                                    </td>
                                                    <td className='px-1'>
                                                        <div className='flex'>
                                                            <Link href={route('pengumuman.edit', item.id)}>
                                                                <PrimaryButton
                                                                    className='mr-1 my-2'
                                                                >
                                                                    Edit
                                                                </PrimaryButton>
                                                            </Link>
                                                            <form method="POST" action={route('pengumuman.destroy', item.id)}>
                                                                <SecondaryButton
                                                                    className='mr-1 my-2'
                                                                    as="button"
                                                                    method="DELETE"
                                                                >
                                                                    Delete
                                                                </SecondaryButton>
                                                            </form>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))

                                        }
                                    </Table>
                                </div>
                                <Pagination links={informasi.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminAuthenticated>
    );
}
