import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import SideDropdown from "@/Components/SideDropdown";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import SideLink from "@/Components/SideLink";
import { ChartPieIcon, 
        UserCircleIcon, 
        BuildingOffice2Icon, 
        FolderIcon, 
        InformationCircleIcon, 
        ArchiveBoxIcon, 
        ArrowRightStartOnRectangleIcon, 
        Cog6ToothIcon, 
        ArrowLeftIcon,
        AcademicCapIcon } from "@heroicons/react/20/solid";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import { initFlowbite } from "flowbite";


export default function AdminLayout({ user, header, back = true, refback, children, desc }) {

    // initFlowbite()
    const [dropdDownMahasiswa, setdropdDownMahasiswa] = useState(false)
    const [dropdDownDosen, setdropdDownDosen] = useState(false)
    const [dropDownInformasi, setdropDownInformasi] = useState(false)
    const [dropDownTugasAkhir, setdropDownTugasAkhir] = useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [deskripsi, setDeskripsi] = useState(false)

    // console.log('dropdDownMahasiswa', dropdDownMahasiswa)
    // console.log('back', back)
    // console.log('dropdDownMahasiswa', dropdDownMahasiswa)

    const handleDropdownMahasiswa = () => {
        setdropdDownMahasiswa(!dropdDownMahasiswa)
    }

    const handleDropdownDosen = () => {
        setdropdDownDosen(!dropdDownDosen)
    }

    const handleDropdownInformasi = () => {
        setdropDownInformasi(!dropDownInformasi)
    }

    const handleDropdownTugasAkhir = () => {
        setdropDownTugasAkhir(!dropDownTugasAkhir)
    }

    const handleSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    }



    return (
        <div>

            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-neutral-50 rounded-lg sm:hidden hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-neutral-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={handleSidebarOpen}>
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
                    <ul class="space-y-2 my-3 font-medium text flex justify-center">
                        <ApplicationLogo className="w-36 h-36" />
                    </ul>
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link 
                                href={route('pengumumanindex')} 
                                className={"flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-500 dark:hover:bg-gray-700 group " + (route().current() == 'pengumumanindex' ? 'bg-amber-400' : '')}>
                                <InformationCircleIcon className="w-6 fill-zinc-100" />
                                <span class="ms-3">Beranda</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={route('da.index')} 
                                className={"flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-500 dark:hover:bg-gray-700 group " + (route().current() == 'da.index' ? 'bg-amber-400' : '')}>
                                <FolderIcon className="w-6 fill-zinc-100" />
                                <span class="ms-3">Download Area</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={route('tugasakhir.index')} 
                                className={"flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-500 dark:hover:bg-gray-700 group "  + (route().current() == 'tugasakhir.index' ? 'bg-amber-400' : '')}>
                                <ArchiveBoxIcon className="w-6" />
                                <span class="ms-3">Daftar Tugas Akhir</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={route('tugasakhir.create')} 
                                className={"flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-500 dark:hover:bg-gray-700 group " + (route().current() == 'tugasakhir.create' ? 'bg-amber-400' : '')}>
                                <AcademicCapIcon className="w-6" />
                                <span class="ms-3">Tugas Akhir Saya</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={route('profile.edit')} 
                                className={"flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-500 dark:hover:bg-gray-700 group " + (route().current() == 'profile.edit' ? 'bg-amber-400' : '')}>
                                <UserCircleIcon className="w-6" />
                                <span class="ms-3">Profil</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href={route('logout')} 
                                className="flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-500 dark:hover:bg-gray-700 group" method="post">
                                <ArrowRightStartOnRectangleIcon className="w-8 fill-red-500" />
                                <span class="ms-3 text-red-500">Keluar</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64">
                <div className="flex flex-col px-24">
                    <div className="group flex relative">
                        {back && refback ? (
                            <Link href={refback} className="flex">
                            <button className="flex items-center text-indigo-950 dark:text-white">
                                <ArrowLeftIcon className="w-6 pb-[7px]" />
                                <span></span>
                            </button>
                            </Link>
                        ) : null
                        }
                        <h2 class="text-2xl py-2 ml-3 mb-2 font-semibold text-indigo-950 dark:text-white">{header}</h2>
                    </div>
                        <h1 className="text-gray-500 font-thin ml-4 my-2">{desc}</h1>
                </div>
                {children}
            </div>

        </div>
    );
}