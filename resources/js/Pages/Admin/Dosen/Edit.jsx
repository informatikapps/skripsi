import AdminLayout from '@/Layouts/AdminLayout'
import { Head, useForm, Link } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'

export default function Edit({dosen}) {

    const { data, setData, put, processing, errors } = useForm({
        nip: dosen.nip,
        nama: dosen.nama_dosen,
        no_hp: dosen.no_hp,
        keterangan: dosen.keterangan,
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        put(route('dosen.update', dosen.id))
    }

    return(
        <AdminLayout
            header="Edit Dosen"
            refback={route('dosen.index')}
        >
            <Head title="Edit Dosen" />
            <section className='px-8 bg-slate-100 shadow rounded-xl mx-24 overflow-y-auto py-6'>
                <form onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <InputLabel htmlFor="judul" value="NIP" className="w-[12rem] pt-4" />
                        <TextInput
                            id="nip"
                            value={data.nip}
                            className="w-1/2"
                            onChange={(e) => setData('nip', e.target.value)}
                        />
                    </div>

                    <div className="flex mb-4">
                        <InputLabel htmlFor="nama" value="Nama Dosen" className="w-[12rem] pt-4" />
                        <TextInput
                            id="nama"
                            value={data.nama}
                            className="w-1/2"
                            onChange={(e) => setData('nama', e.target.value)}
                        />
                    </div>

                    <div className="flex mb-4">
                        <InputLabel htmlFor="no_hp" value="No. HP" className="w-[12rem] pt-4" />
                        <TextInput
                            id="no_hp"
                            value={data.no_hp}
                            className="w-1/2"
                            onChange={(e) => setData('no_hp', e.target.value)}
                        />
                    </div>

                    <div className="flex mb-4">
                        <InputLabel htmlFor="keterangan" value="Keterangan" className="w-[12rem] pt-4" />
                        <textarea
                            className='mt-1 rounded-lg w-1/2'
                            errors={errors.keterangan}
                            name='keterangan'
                            type='text'
                            value={data.keterangan}
                            onChange={e => setData('keterangan', e.target.value)}
                        />
                    </div>
                    <div className="flex mb-4">
                        <PrimaryButton
                            className=''
                            processing={processing}
                            type='submit'
                        >
                            Simpan
                        </PrimaryButton>
                    </div>

                </form>
            </section>
        </AdminLayout>
    )




}