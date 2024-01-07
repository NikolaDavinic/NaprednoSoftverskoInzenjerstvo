import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserTable from '../components/userTable'
import { Button } from '@mui/material'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='flex flex-col justify-center '>
      <h1 className='text-2xl font-black'>Welcome to application for demontrating how SignalR works</h1>
      <div className='flex flex-col items-center'>
        <h3>Press button to see page where is table with users</h3>
        <Link href="/signalR" className='bg-[#29310]'><Button className='bg-[#a742f5] buttonAnimation' variant='contained'>User Table</Button></Link>
      </div>
    </div>
  )
}
