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
                        <p
                            class="font-semibold text-2xl text-indigo-900 p-4">
                            Status Tugas Akhir
                        </p>
                        <div className="mt-1 flex h-36">

                            <div className="bg-green-100 overflow-hidden shadow-sm sm:rounded-lg w-1/3 mr-3">
                                <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800 text-center py-4">
                                    Sedang Mengerjakan Tugas Akhir
                                </span>
                                <p className="text-3xl text-green-800 text-center">
                                    21
                                </p>
                            </div>
                            <div className="bg-yellow-100 overflow-hidden shadow-sm sm:rounded-lg w-1/3 mx-3">
                                <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 text-center py-4">
                                    Belum Mendapat Dosen Pembimbing
                                </span>
                                <p className="text-3xl text-yellow-800 text-center">
                                    21
                                </p>
                            </div>
                            <div className="bg-red-100 overflow-hidden shadow-sm sm:rounded-lg w-1/3 ml-3 pb-4">
                                <span className="px-2 inline-flex text-xs font-semibold rounded-full bg-red-100 text-red-800 text-center py-4">
                                    Belum Mengisi Pesan dan Tema
                                </span>
                                <p className="text-3xl text-red-800 text-center">
                                    21
                                </p>
                            </div>
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
                        <div className="my-6 flex h-72 bg-slate-100 shadow-sm sm:rounded-lg flex-col">
                            <p
                                class="font-semibold text-2xl text-indigo-900 p-4">
                                Aktivitas
                            </p>
                                <p className="text-sm mx-4 my-1 px-2 py-2">
                                    Tidak ada aktivitas terbaru    
                                </p>
                            <div className="flex flex-col overflow-y-scroll max-h-[65%]">
                                {/* <div className="bg-gray-200 text-gray-800 shadow-sm sm:rounded-lg text-sm mx-4 my-1 px-2 py-2">
                                    <b>24060121130057</b> mengisi pesan pada 29 Agustus 2021
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AdminAuthenticated>
    );
}
