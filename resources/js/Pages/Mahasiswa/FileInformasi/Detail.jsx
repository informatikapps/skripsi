import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function Detail({ informasi }){

    // console.log('refback', route('pengumumanindex'))
    return(
        <AuthenticatedLayout
            header={informasi.judul_info}
            back={true}
            refback={route('pengumumanindex')} >
            <Head title="Detail Informasi" />
            <div className='max-w-7xl mx-18 space-y-6'>
                <section className='sm:py-8 sm:px-14 bg-slate-100 shadow rounded-xl mx-24'>
                    <div className="text-indigo-950 mt-3" dangerouslySetInnerHTML={{ __html: informasi.isi_info }}></div>
                    <div className="text-indigo-400 mt-6">Terakhir diubah {new Date(informasi.updated_at).toLocaleDateString('en-GB')}</div>
                </section>
            </div>
        
        </AuthenticatedLayout>
    )
}