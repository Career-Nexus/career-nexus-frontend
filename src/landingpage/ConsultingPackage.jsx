import React from 'react'
const items = [
    {
        id: 1,
        title: "Premium Package (N1.5M)",
        text1: "3 Services",
        text2:"For organizations with 11-20 employees",
        text3:"2-3 workshops per year"
    },
    {
        id: 2,
        title: "All-Inclusive Package (N5M)",
        text1: "All Services",
        text2:"For organizations with 21-40 employees",
        text3:"2-3 workshops per year"
    },
    {
        id: 3,
        title: "Basic Package (N800k)",
        text1: "2 Services",
        text2:"For organizations with 1-10 employees",
        text3:"1-2 workshops per year"
    },
]
export default function ConsultingPackage() {

    return (
        <div className='py-16 bg-gray-50 '>
            <h1 className='text-3xl font-bold mb-8 text-center'>Flexible and Cost-Effective Consulting Packages</h1>
            <div className='md:flex gap-5 md:mx-20 mx-4'>
                {
                    items.map((item)=>(
                        <div key={item.id} className={`shadow rounded-lg w-full mb-5 object-cover px-5 py-10 border-2 border-[#5DA05D]
                            ${item.id === 2 ?('bg-[#5DA05D] text-white'):('')}
                        `}>
                            <h1 className='mb-6 font-bold text-lg '>{item.title}</h1>
                            <ul className='list-disc ml-5'>
                                <li>{item.text1}</li>
                                <li>{item.text2}</li>
                                <li>{item.text3}</li>
                            </ul>
                            <button className={`mt-5 w-full text-center py-2 px-6 rounded-lg border-2 border-gray-300
                                ${item.id === 2 ?('bg-white text-black'):('')}
                                `}>
                                GET STARTED
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
