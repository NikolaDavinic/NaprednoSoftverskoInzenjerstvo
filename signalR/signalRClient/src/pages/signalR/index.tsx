import React from 'react'
import UserTable from '../../components/userTable'
import { Button } from '@mui/material'
import Link from 'next/link'

type Props = {}

const SignalR = (props: Props) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className='text-5xl font-semibold'>USER TABLE</h1>
            <Link href="/" className='bg-[#29310]'><Button className='bg-[#a742f5] buttonAnimation m-6' variant='contained'>HOME</Button></Link>
            <UserTable />
        </div>
    )
}

export default SignalR