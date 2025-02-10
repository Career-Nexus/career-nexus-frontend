import React from 'react'

const Educationgap = () => {
    return (
        <div className='py-10'>
            <div className='grid grid-cols-12 gap-5 mx-5 my-16'>
                <div className='col-span-6 p-4'>
                    <h1 className='font-semibold text-3xl'>The Gap Between Education and Employment is Wider Than Ever.</h1>
                    <p className='text-xl my-5 text-black-50'>67% of employers say graduates lack the skills needed for entry-level roles.</p>
                    <p className='text-xl'>83% of professionals feel their education didn't prepare them for their careers.</p>
                </div>
                <div className='col-span-6'>
                    <img src="/images/animate1.png" alt="Education gap" className=''/>
                </div>
            </div>
        </div>
    )
}

export default Educationgap