'use client'
import { updateMessageAction } from '@/actions'
import React, { useState } from 'react'

function Update({ m }) {
    const [s, ss] = useState(false)
    const updateMessage = async (getId) => {
        await updateMessageAction(getId, true, '/update')
    }
    return (
        <div className='flex flex-col gap-5 items-baseline px-8 py-5 mt-10 mb-10 border-2 border-purple-200 rounded-lg'>
            {
                m && m.length > 0 ?
                    m.map((mm, i) => <div key={i} id={`m${i}`} onClick={() => updateMessage(mm._id)}
                        className={`flex flex-col gap-3 ${mm?.t ? 'font-normal bg-gray-50' : 'font-bold bg-gray-100'} cursor-pointer w-full shadow-sm shadow-purple-200 px-5 py-3 transition duration-300 hover:shadow-lg hover:shadow-purple-600 rounded-xl`}>
                        <h1 className='text-3xl text-gray-900'>
                            {'Job Title ' + mm?.jobTitle}
                        </h1>
                        <p className='text-xl text-gray-700'>
                            {'Status ' + mm?.m}
                        </p>
                        <span className='text-xs text-red-500'>{'Date ' + mm?.dateStart}</span>
                    </div>)
                    : null
            }
        </div>
    )
}

export default Update