import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import AdminLayout from '@/Layouts/AdminLayout';
import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Password({auth}){
    const { data, setData, put, processing, errors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('password.update'));
    }

    return(
        <div className="bg-slate-100 rounded-lg px-4 mx-4 my-2 py-2">
            <form onSubmit={handleSubmit} method='post'>
            <h1 className="text-lg mt-2 font-semibold">Ganti Kata Sandi</h1>
            <div className="flex">
                <InputLabel value="Password Lama" className="w-48 my-auto py-2" />
                <TextInput
                    className="mt-1 rounded-lg w-1/3"
                    name="password"
                    type="password"
                    autoComplete="old-password"
                    onChange={e => setData('current_password', e.target.value)}
                />
                <InputError message={errors.current_password} className="mt-2" />
            </div>
            <div className="flex">
                <InputLabel value="Password Baru" className="w-48 my-auto py-2" />
                <TextInput
                    className="mt-1 rounded-lg w-1/3"
                    name="password"
                    type="password"
                    autoComplete="password"
                    onChange={e => setData('password', e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />

            </div>
            <div className="flex">
                <InputLabel value="Konfirmasi Password Baru" className="w-48 my-auto py-2" />
                <TextInput
                    className="mt-1 rounded-lg w-1/3"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={e => setData('password_confirmation', e.target.value)}
                />                
                <InputError message={errors.password_confirmation} className="mt-2" />
            </div>
            <div className="flex-row-reverse">
                <PrimaryButton
                    className="mt-4"
                    processing={processing}
                    type="submit"
                >
                    Ganti Kata Sandi
                </PrimaryButton>
            </div>
            </form>
        </div>
    )
}