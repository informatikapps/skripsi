import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {Link} from '@inertiajs/react'
import { useState } from 'react'


export default function Pagination({links}) {

    // const [active, setActive] = useState(links.filter((link) => link.active)[0].label)
    const active = links.filter((link) => link.active)[0].label
    // console.log('links', links)
    const className = "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    const className_active = "relative z-10 inline-flex items-center bg-amber-400 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
    
    // console.log('active', active)
    // console.log('active', active)
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-none px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a
                    href={links[0].url}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </a>
                <a
                    href={links[links.length - 1].url}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{active}</span> to <span className="font-medium">{links.length-2}</span> of{' '}
                        <span className="font-medium">{links.length - 2}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            href={links[0].url}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                        <Link
                            href={links[1].url}
                            aria-current="page"
                            className= { active == links[1].label ? className_active : className}
                        >
                            1
                        </Link>
                        {links.slice(2, links.length - 1).map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={link.active ? className_active : className}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href={links[links.length - 1].url}  
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
