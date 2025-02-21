import React from 'react'
import { Bars } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className='flex justify-center items-center h-screen bg-transparent'>
            <Bars
                height="80"
                width="80"
                color="#FEFFFE"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
