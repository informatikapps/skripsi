import { Link } from '@inertiajs/react';

export default function SideLink({ active = false, className = '', children, ...props }) {
    return (
        <Link 
            {...props}
            >
            <div>
                <ul className={"py-3 px-4 " + (active ? "text-slate-200 bg-amber-400 hover:bg-amber-500 rounded-r-2xl" : "bg-transparent hover:bg-amber-500 rounded-r-2xl text-white hover:text-slate-200") + " " +className}>{children}</ul>
            </div>
        </Link>
    );
}