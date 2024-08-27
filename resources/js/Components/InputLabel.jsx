export default function InputLabel({ value, className = '', children, optional=true, ...props }) {
    return (
        <label {...props} className={`block font-medium text-base text-gray-700 ` + className}>
            {value ? value : children}
            {optional ? "": <b className="text-red-500 text-2xl">*</b>}
        </label>
    );
}
