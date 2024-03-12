export default function SideDropdown({toggleDropdown, dropDownHook, children, className}){
    <div onClick={toggleDropdown} className={"px-4 py-4 text-white hover:bg-yellow-400 flex items-center " + className}>
        {children}
        <svg
            className={"h-5 w-5 ml-48 " + (dropDownHook ? "transform rotate-180" : "")}
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
}