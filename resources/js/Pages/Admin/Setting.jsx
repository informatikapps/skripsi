import InputLabel from "@/Components/InputLabel";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, useForm } from "@inertiajs/react";   
import TextInput from "@/Components/TextInput";
import Password from "@/Components/Password";
import PrimaryButton from "@/Components/PrimaryButton";



export default function Setting({ auth, errors, status }) {
    // console.log('test')
    const { data, setData, patch, processing, errors: formErrors } = useForm({
        username: auth.user.username,
    });

    const { data2, setData2, patch2, processing2, errors: formErrors2 } = useForm({
        old_password: '',
        new_password: '',
        password_confirmation: '',
    });

    // console.log('data', auth.user)

    return(
        <AdminLayout
            user={auth.user}
            header={'Pengaturan'}
            back={false}
        >
            <Head title="Pengaturan" />
            <div className="bg-slate-100 px-4 mx-12 my-2 rounded-lg py-2">
                <h1 className="text-lg font-semibold mx-8">Ganti Username</h1>
                <form onSubmit={e => {
                    e.preventDefault()
                    patch(route('admin.update'))
                }
                }>
                <div className="flex mx-8">
                <InputLabel value="Username" className="w-[18%] my-auto py-2" />
                <TextInput
                    defaultValue={auth.user.username}
                    className="mt-1 rounded-lg w-1/4 px-2 py-1"
                    name="username"
                    type="text"
                    onChange={e => setData('username', e.target.value)}
                    />
                </div>
            <PrimaryButton
                processing={processing}
                className="mx-8 my-2"
            >
                Simpan
            </PrimaryButton>
                </form>
        
                <Password
                    auth={auth}
                    errors={formErrors2}
                    status={status}
                />
            </div>
            
            </AdminLayout>
    )

}