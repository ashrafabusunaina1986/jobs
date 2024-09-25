import React from 'react'
import { Form } from '../ui/form'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { clnbtn } from '@/utils'
import { Card, CardContent } from '../ui/card'

function CommonForm({ ac, df, sdf, bd, bt, btt, hoc, fcs, cln, af, message }) {
    const ei = c => {
        const text = <div className='flex flex-col gap-2'>
            <Label htmlFor={c.n}>{c.l}</Label>
            <Input
                className="rounded-lg focus:bg-gray-200 border-2 border-gray-700 focus-visible:ring-0 focus-visible:opacity-65"
                type={c.t} placeholder={c.ph} name={c.n} id={c.n} disabled={c.d || false}
                value={df[c.n]}
                onChange={(e) => sdf({ ...df, [e.target.name]: e.target.value })} >

            </Input>
        </div>
        const file = <div className='flex flex-col gap-2'>
            <Label htmlFor={c.n}>{c.l}</Label>
            <Input
                className="rounded-lg focus:bg-gray-200 border-2 border-gray-700 focus-visible:ring-0 focus-visible:opacity-65"
                type={c.t} onChange={hoc} name={c.n} id={c.n} accept={af} ></Input>
        </div>
        let content = null
        switch (c.ct) {
            case 'input':
                if (c.t === 'text') {
                    content = text
                }
                if (c.t === 'file') {
                    content = file
                }
                break;

            default:
                content = text
                break;
        }
        return content
    }
    return (
        <form action={ac} className={cln}>
            {
                fcs.map(ci => <div className='mb-6'
                    key={ci.n} >{ei(ci)}</div>)
            }
            <div className='mt-6' >
                <Button disabled={bd} type={btt || 'submit'} className={"disabled:opacity-55 px-3 py-1 rounded-md hover:shadow-md hover:shadow-gray-700"}>
                    {bt}
                </Button>
            </div>
            {message ? <div className='flex w-full fixed left-0 top-0 items-center justify-center py-10 mx-auto'>
                <span className='w-max rounded-lg px-5 py-5 bg-gray-950 text-gray-200 shadow-md shadow-purple-600 font-extrabold text-2xl tracking-tight' >{message}</span>
            </div> : null}
        </form>
    )
}

export default CommonForm