import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import SideDropdown from "@/Components/SideDropdown";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import SideLink from "@/Components/SideLink";

export default function Layout({ user, header, back = true, refback, children }) {
    const [dropdDownMahasiswa, setDropDownMahasiswa] = useState(false);
    const [dropdDownInformasi, setDropDownInformasi] = useState(false);


    const toggleDropdownMahasiswa = () => {
        setDropDownMahasiswa(!dropdDownMahasiswa);
    }
    const toggleDropdownInformasi = () => {
        setDropDownInformasi(!dropdDownInformasi);
    }


    // console.log('dropdDownMahasiswa', dropdDownMahasiswa)
    // console.log('back', back)

    return (
        <div className="bg-slate-200 min-h-screen flex">

            <div className="bg-stone-800 flex-auto" style={{ flex: "0 0 20%" }}>
                <div className="px-24 py-9">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </div>
                <div onClick={toggleDropdownMahasiswa} className="px-4 py-4 text-white hover:bg-yellow-500 flex items-center">
                    Mahasiswa
                    <svg
                        className={"h-5 w-5 " + (dropdDownMahasiswa ? "transform rotate-180" : "")}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {dropdDownMahasiswa ?
                    <div className="px-3">
                        <SideLink href="/" active={false}>
                            Kelola Mahasiswa
                        </SideLink>
                        <SideLink href="/" active={false}>
                            Tambah Mahasiswa
                        </SideLink>
                    </div>
                    : null}
                <SideLink href="/" active={false} className="flex">
                    File
                </SideLink>
                <div onClick={toggleDropdownInformasi} className="px-4 py-4 text-white hover:bg-yellow-500 flex items-center">
                    Informasi
                    <svg
                        className={"h-5 w-5" + (dropdDownInformasi ? "transform rotate-180" : "")}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                {dropdDownInformasi ?
                    <div className="px-3">
                        <SideLink href="/" active={false}>
                            Kelola Informasi
                        </SideLink>
                        <SideLink href="/" active={false}>
                            Tambah Informasi
                        </SideLink>
                    </div>
                    : null}
                <SideLink href="/" active={true}>
                    Profil
                </SideLink>
                <SideLink href="/" active={false} className="text-red-400">
                    Keluar
                </SideLink>

            </div>
            <main className="flex-1">
                {back ?
                    <div className="flex py-2 mt-7 px-4 text-xl">
                        <svg width="26px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <a href={refback} className="hover:underline">
                            Kembali
                        </a>
                    </div>
                    : null
                }
                {
                    header &&   
                    <header className="bg-slate-100 mx-4 mt-2 rounded-t-xl border-b-2">
                    <h1 className="px-6 py-4 font-bold text-xl">
                        {header}
                    </h1>
                </header>
                }

                {children}
            </main>
        </div>
    );
}