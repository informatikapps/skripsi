import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";

export default function FirstLogin({ auth, errors, status }) {

    const { data, setData, post, processing, errors: formErrors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('mahasiswa.firstloginpost'))
    }

    return (
        <GuestLayout>
            <Head title="Ganti Password" />

            <div className="mb-4 text-sm text-gray-600">
                Sebelum melanjutkan, silahkan ganti password anda. Password baru tidak boleh sama dengan password default.
            </div>

            <form onSubmit={handleSubmit}>
                <div>
                    <InputLabel htmlFor="password" value="Password Baru" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        isFocused={true}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={formErrors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className={processing ? 'opacity-25' : ''} disabled={processing}>
                        Konfirmasi
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}