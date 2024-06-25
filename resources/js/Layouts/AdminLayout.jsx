import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import SideDropdown from "@/Components/SideDropdown";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import SideLink from "@/Components/SideLink";
import { ChartPieIcon, UserGroupIcon, BuildingOffice2Icon, FolderIcon, InformationCircleIcon, ArchiveBoxIcon, ArrowRightStartOnRectangleIcon, Cog6ToothIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from "react";


export default function AdminLayout({ user, header, back = true, refback, children, desc }) {

    // initFlowbite()
    // console.log('desc', desc)
    // console.log('current', route().current())
    const [dropdDownMahasiswa, setdropdDownMahasiswa] = useState(route().current() == 'admin.mahasiswa' || route().current() == 'admin.mahasiswacreate' || route().current() == 'admin.mahasiswaedit')
    const [dropdDownDosen, setdropdDownDosen] = useState(route().current() == 'dosen.index' || route().current() == 'dosen.create' || route().current() == 'dosen.edit')
    const [dropDownInformasi, setdropDownInformasi] = useState(route().current() == 'pengumuman.index' || route().current() == 'pengumuman.create' || route().current() == 'pengumuman.edit')
    const [dropDownTugasAkhir, setdropDownTugasAkhir] = useState(route().current() == 'admin.ta' || route().current() == 'admin.tacreate' || route().current() == 'admin.taedit')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [dropDownFile, setdropDownFile] = useState(route().current() == 'file.index' || route().current() == 'file.create' || route().current() == 'file.edit')
    const [deskripsi, setDeskripsi] = useState(route().current() == 'admin.mahasiswa' || route().current() == 'admin.mahasiswacreate' || route().current() == 'admin.mahasiswaedit')

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

    const handleDropdownFile = () => {
        setdropDownFile(!dropDownFile)
    }

    const handleDropdownTugasAkhir = () => {
        setdropDownTugasAkhir(!dropDownTugasAkhir)
    }

    const handleSidebarOpen = () => {
        setSidebarOpen(!sidebarOpen)
    }



    return (
        <div>

            <button data-drawer-target="sidebar-multi-level-sidebar" data-drawer-toggle="sidebar-multi-level-sidebar" aria-controls="sidebar-multi-level-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-neutral-50 rounded-lg sm:hidden hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-neutral-50 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={handleSidebarOpen}>
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="sidebar-multi-level-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <Link
                                href={route('admin')}
                                className={"flex items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-300 dark:hover:bg-gray-700 group " + (route().current() == 'admin' ? "bg-amber-500 dark:bg-gray-700" : "")}
                            >
                                <ChartPieIcon className="w-6 fill-zinc-100" />
                                <span class="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <button type="button" class="flex items-center w-full p-2 text-base text-neutral-50 transition duration-75 rounded-lg group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700" onClick={handleDropdownMahasiswa}>
                                <UserGroupIcon className="w-6" />
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Mahasiswa</span>
                                <svg className={"w-3 h-3" + (dropdDownMahasiswa ? " rotate-180" : "")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-mahasiswa" class={"py-2 space-y-2" + (!dropdDownMahasiswa ? " hidden" : " ")}>
                                <li>
                                    <Link href={route('admin.mahasiswa')}
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'admin.mahasiswa' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                        Kelola Mahasiswa
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('admin.mahasiswacreate')}
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'admin.mahasiswacreate' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                        Tambah Mahasiswa
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'admin.mahasiswaedit' ? "bg-amber-500 dark:bg-gray-700" : "hidden")}>
                                        Edit Mahasiswa
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button type="button" class="flex items-center w-full p-2 text-base text-neutral-50 transition duration-75 rounded-lg group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700" onClick={handleDropdownDosen}>
                                <BuildingOffice2Icon className="w-6" />
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Dosen</span>
                                <svg className={"w-3 h-3 " + (dropdDownDosen ? " rotate-180" : "")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-dosen" class={"py-2 space-y-2" + (!dropdDownDosen ? " hidden" : " ")}>
                                <li>
                                    <Link
                                        href={route('dosen.index')}
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'dosen.index' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                        Kelola Dosen
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('dosen.create')}
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'dosen.create' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                        Tambah Dosen
                                    </Link>
                                </li>
                                <li>
                                    <Link className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'dosen.edit' ? "bg-amber-500 dark:bg-gray-700" : "hidden")}>
                                        Edit Dosen
                                        </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button type="button" class="flex items-center w-full p-2 text-base text-neutral-50 transition duration-75 rounded-lg group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700" onClick={handleDropdownFile}>
                                <FolderIcon className="w-6" />
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Download Area</span>
                                <svg className={"w-3 h-3 " + (dropDownFile ? " rotate-180" : "")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-file" class={"py-2 space-y-2" + (!dropDownFile ? " hidden" : " ")}>
                                <li>
                                    <Link href={route('file.index')}
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'file.index' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                        Kelola File
                                        </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('file.create')}
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'file.create' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                        Tambah File
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'file.edit' ? "bg-amber-400 dark:bg-gray-700" : "hidden")}>
                                        Edit File
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button type="button" class="flex items-center w-full p-2 text-base text-neutral-50 transition duration-75 rounded-lg group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700" onClick={handleDropdownInformasi}>
                                <InformationCircleIcon className="w-6" />
                                <span class={"flex-1 ms-3 text-left rtl:text-right whitespace-nowrap"}>Informasi</span>
                                <svg class={"w-3 h-3 " + (dropDownInformasi ? "rotate-180" : "")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" class={"py-2 space-y-2" + (!dropDownInformasi ? " hidden" : " ")}>
                                <li>
                                    <Link 
                                    href={route('pengumuman.index')} 
                                    className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'pengumuman.index' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                        Kelola Informasi
                                        </Link>
                                </li>
                                <li>
                                    <Link 
                                    href={route('pengumuman.create')} 
                                    className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'pengumuman.create' ? "bg-amber-500 dark:bg-gray-700" : "") }>
                                        Tambah Informasi
                                        </Link>
                                </li>
                                <li>
                                    <Link 
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'pengumuman.edit' ? "bg-amber-500 dark:bg-gray-700" : "hidden")}>
                                            Edit Informasi
                                            </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <button type="button" class={"flex items-center w-full p-2 text-base text-neutral-50 transition duration-75 rounded-lg group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " } onClick={handleDropdownTugasAkhir}>
                                <ArchiveBoxIcon className="w-6" />
                                <span class="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Tugas Akhir</span>
                                <svg class={"w-3 h-3 " + (dropDownTugasAkhir ? "rotate-180" : "")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <ul id="dropdown-example" class={"py-2 space-y-2" + (!dropDownTugasAkhir ? " hidden" : " ")}>
                                <li>
                                    <Link href={route('admin.ta')} 
                                        className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'admin.ta' ? "bg-amber-500 dark:bg-gray-700" : "")}>Kelola Tugas Akhir</Link>
                                </li>
                                <li>
                                    <Link href={route('admin.tacreate')} className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'admin.tacreate' ? "bg-amber-500 dark:bg-gray-700" : "")}>Tambah Tugas Akhir</Link>
                                </li>
                                <li>
                                    <Link href="#" className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg pl-11 group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'admin.taedit' ? "bg-amber-500 dark:bg-gray-700" : "hidden")}>Edit Tugas Akhir</Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link href={route('admin.profile')} className={"flex items-center w-full p-2 text-neutral-50 transition duration-75 rounded-lg group hover:bg-amber-300 dark:text-white dark:hover:bg-gray-700 " + (route().current() == 'admin.profile' ? "bg-amber-500 dark:bg-gray-700" : "")}>
                                <Cog6ToothIcon className="w-6" />
                                <span class="ms-3">Pengaturan</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('admin.logout')} class="flex w-full items-center p-2 text-neutral-50 rounded-lg dark:text-white hover:bg-amber-300 dark:hover:bg-gray-700 group" method="post" as="button">
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
                            <Link href={refback} className="flex items-center text-indigo-950 dark:text-white ">
                                <ArrowLeftIcon className="w-6 pb-[0px] hover:bg-indigo-200 rounded-xl" />
                                <span></span>
                            </Link>
                        ) : null
                        }
                        <h2 class="text-3xl py-2 ml-3 font-black bg-gradient-to-r from-indigo-900 from-10% to-blue-900 to-35% bg-clip-text text-transparent">{header}</h2>
                    </div>
                <h1 className="text-gray-500 font-thin ml-4 mb-4">{desc}</h1>
                </div>
                {children}
            </div>

        </div>
    );
}