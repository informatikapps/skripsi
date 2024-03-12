export default function Table({ className='', colname, children, ...props}){
    return (
        <table {...props} className={"divide-y divide-gray-200 " + className}>
            <thead>
                <tr>
                    {colname.map((item, index) => {
                        return <th key={index} scope="col" className="pl-2 py-2 text-left text-sm  font-medium text-stone-50 uppercase tracking-wider bg-indigo-950">{item}</th>
                    })}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" >   
                {children}
                </tbody>
        </table>
    );
}