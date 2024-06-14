import {useState, useEffect} from 'react';


export default function Toast({ className='', disabled, children, ...props }) {

    const [show, setShow] = useState(children.length > 0);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            // Clear the timer if the component is unmounted or show state changes
            return () => clearTimeout(timer);
        }
    }, [show]);


    const closeDialog = () => {
        setShow(false);
    }

    return (
        <div id="toast-undo" class={"flex items-center w-full max-w-xl p-4 text-white bg-lime-400/90 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-20 top-3 right-3 absolute" + (!show ? " hidden" : " ")}>
            <div class="text-base font-normal">
                {children}
            </div>
            <div class="flex items-center ms-auto space-x-2 rtl:space-x-reverse">
                <button type="button" class="ms-auto -mx-1.5 -my-1.5  text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={closeDialog}>
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    );

}
