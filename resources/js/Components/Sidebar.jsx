import { Link } from "@inertiajs/react";

export default function SidebarProfil({ items }) {
    return (
        <div className="flex flex-col w-64 h-fit px-4 py-4 bg-white border-collapse border border-gray-200 mt-6 ml-36 rounded-lg">
            {items.map((item) => (
                <div className="flex flex-row items-center justify-start hover:bg-slate-200">
                    <Link href={route(item.route)}>
                        <ul className="p-2">
                            {item.name}
                        </ul>
                    </Link>
                </div>
            ))}

        </div>
    );
}