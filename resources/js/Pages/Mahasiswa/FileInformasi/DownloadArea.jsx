import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import TextInput from "@/Components/TextInput";
// import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import SecondaryButton from '@/Components/SecondaryButton';
import Pagination from '@/Components/Pagination';
import Table from '@/Components/Table';
import { Head, Link, router } from '@inertiajs/react';

export default function DownloadArea({ files, search }) {
    
    const [searchKeyword, setSearchKeyword] = useState('')

    const handleSearch = (e) => {
        setSearchKeyword(e.target.value)
        console.log('searchKeyword', searchKeyword)
        console.log('e.target.value', e.target.value)
        if (searchKeyword.length > 0) {
            router.get(route('da.index'), {search: e.target.value}, {preserveState: true})
        } else {
            router.get(route('da.index'))
        }
    }
    
    return(
        <AuthenticatedLayout
            header={"Download Area"} >
            <Head title="Detail Informasi" />
            <div className='max-w-7xl mx-18 space-y-6 mt-2'>
                <section className='sm:py-8 sm:px-14 bg-slate-100 shadow rounded-xl mx-24'>
                    <div className="flex flex-row-reverse" >
                        <TextInput
                            className='w-1/3'
                            placeholder='Cari File..'
                            value = {searchKeyword}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className='overflow-y-auto px-8 drop-shadow-sm rounded-md my-6'>
                        <Table
                            colname={[ 'Judul', 'Terakhir Diubah', 'Aksi']}
                            className='min-w-full divide-y divide-gray-200 text-base'
                        >
                            {
                                files.data.map((item, index) => (
                                    <tr key={index} className='font-light text-sm'>
                                        <td className='px-3 w-[40%]'>
                                            {item.nama_file}
                                        </td>
                                        <td className='px-3'>
                                            {new Date(item.updated_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className='px-3'>
                                            <div className='flex'>
                                                <a
                                                    href={route('da.download', item.id)}
                                                    className='text-blue-600 hover:underline flex py-3'
                                                >
                                                    <ArrowDownTrayIcon className='h-5 w-5' />
                                                    Download
                                                </a>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </Table>
                    </div>
                    <Pagination links={files.links} />
                </section>
            </div>

        </AuthenticatedLayout>
    )

}