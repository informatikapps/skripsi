import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 absolute inset-0 h-full w-full bg-neutral-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            <div>
                <Link href="/" className='flex justify-center'>
                    <ApplicationLogo className="w-36 h-36 fill-current text-gray-500" />
                </Link>
                <div className='flex justify-center mt-10'>
                    <h1 className="text-xl font-bold text-gray-800">APLIKASI TUGAS AKHIR</h1>
               </div>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
