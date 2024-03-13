import AdminAuthenticated from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

export default function Dashboard({ auth }) {
    return (
        <AdminAuthenticated
            user={auth.user}
            header={"Dashboard"}
            back={false}
            refback={null}
        >
            <Head title="Dashboard" />

                <section className="max-w-7xl mx-24">
                    <div className="flex mt-8">
                        <div className="w-1/2 mr-4">
                            <div className="bg-slate-100 overflow-hidden shadow-sm sm:rounded-lg">
                                <p
                                    class="font-semibold text-2xl text-indigo-900 p-4">
                                    Mahasiswa dan Tugas Akhir
                                </p>
                                <Link href={route('admin.mahasiswa')}>
                                   <p
                                        class="font-thin text-base text-indigo-900 px-4 pb-2 hover:underline">
                                        Kelola Mahasiswa
                                        <ArrowTopRightOnSquareIcon className="h-4 w-4 inline-block" />
                                    </p> 
                                </Link>
                            <Link href={route('admin.ta')}>
                                <p
                                    class="font-thin text-base text-indigo-900 px-4 pb-2 hover:underline">
                                    Kelola Tugas Akhir
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 inline-block" />
                                </p>
                            </Link>
                            </div>
                        </div>
                        <div className="w-1/2 ml-4">
                            <div className="bg-slate-100 overflow-hidden shadow-sm sm:rounded-lg">
                                <p
                                class="font-semibold text-2xl text-indigo-900 p-4">
                                    Lain-lain
                                </p>
                            <Link href={route('dosen.index')}>
                                <p
                                    class="font-thin text-base text-indigo-900 px-4 pb-2 hover:underline">
                                    Kelola Dosen
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 inline-block" />
                                </p>
                            </Link>
                            <Link href={route('file.index')}>
                                <p
                                    class="font-thin text-base text-indigo-900 px-4 pb-2 hover:underline">
                                    Kelola Download Area
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 inline-block" />
                                </p>
                            </Link>
                            <Link href={route('pengumuman.index')}>
                                <p
                                    class="font-thin text-base text-indigo-900 px-4 pb-2 hover:underline">
                                    Kelola Informasi
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 inline-block" />
                                </p>
                            </Link>

                            </div>
                        </div>
                    </div>
                </section>
        </AdminAuthenticated>
    );
}
