import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import TextInput from '@/Components/TextInput';
import {
        useState,
        useEffect,
        useRef} from 'react';
import { usePrevious } from 'react-use';

export default function Dashboard({ auth, informasi, has_set_profile, search }) {

    const [searchKeyword, setSearchKeyword] = useState(search ? search : '')
    const inputRef = useRef(null);

    // what the hell is this?
    useEffect(() => {
        // Set focus on the input element when the component mounts
        if(searchKeyword.length !== 0 && search !== null){
            inputRef.current.focus();}
    }, []);
    
    useEffect(() => {
        if (searchKeyword.length > 0 && (search === null || searchKeyword !== search)) {
            router.get(route('pengumumanindex'), {search: searchKeyword})
            // console.log('searchKeyword', searchKeyword)
        }

        else if (searchKeyword.length === 0 && search !== null) {
            router.get(route('pengumumanindex'))
        }

    }, [searchKeyword])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={'Beranda'}
            back={false}
            desc={'Halaman ini berisikan informasi yang diberikan oleh Admin :)'}
        >
            <Head title="Beranda" />

            <div className="sm:px-6 lg:px-8 mt-2">
                {!has_set_profile && <div className="bg-slate-100 overflow-hidden shadow-sm mx-20 rounded-lg py-3">
                    <h2 className='font-extrabold text-indigo-950 text-2xl px-6 pt-3'>Perubahan Profil</h2>

                    <div className='flex'>
                        <ExclamationCircleIcon className="h-12 w-12 text-yellow-500 mx-3" />
                        <div className="py-3 text-gray-900">Anda belum mengisikan data diri, pesan, dan tema. Silakan ubah Profil anda</div>
                    </div>
                    <Link href={route('profile.edit')}>
                        <div className="px-6 pb-3 text-gray-900 text-sm hover:underline">Ubah Profil</div>
                    </Link>
                </div>}
                <div className=" bg-slate-100 overflow-hidden shadow-sm mx-20 rounded-lg mt-4 py-3 px-6">
                        <div className="flex flex-row-reverse mr-5" >
                            <TextInput
                            ref={inputRef}
                                className='w-1/3'
                                placeholder='Cari Pengumuman..'
                                value = {searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                        </div>
                    <div className="py-3 text-gray-900 overflow-y-auto h-[75vh] p-3">
                        {
                            informasi.data.map((info, index) => (
                                <div key={index} className="py-4 px-3 bg-slate-50 my-3 rounded-lg shadow-sm">
                                    <h3 className="text-lg font-sans font-semibold text-indigo-950">{info.judul_info}</h3>
                                    <div className="text-gray-400" dangerouslySetInnerHTML={{ __html: info.isi_info.length > 60 ? info.isi_info.slice(0, 60) + '. . .' : info.isi_info }}></div>
                                    
                                    <div className="flex-initial">
                                    <Link href={route('pengumumandetail', info.id)}>
                                        <div
                                            className="text-sm text-indigo-950 hover:underline"
                                            >Baca Selengkapnya</div>
                                    </Link>
                                        <div className="text-sm text-indigo-300">Terakhir diubah {new Date(info.updated_at).toLocaleDateString('en-GB')}</div>
                                    </div>
                                </div>
                            ))   
                        }

                    </div>
                    <Pagination links={informasi.links} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
