"use client"
import Image from 'next/image'
import TodoList from '../components/TodoList'


export default function Home() {
  return (
   <main>
<div className='flex justify-center'>
      <h1 className='text-3xl font-bold'>TODO APP</h1>
    </div>

<div className=''>
    {/* @ts-ignore */}
    <TodoList/>
</div>

   </main>
  )
}
