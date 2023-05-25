"use client"
import Image from 'next/image'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'

export default function Home() {
  return (
   <main>
<div className='flex justify-center'>
      <h1 className='text-3xl font-bold'>TODO APP</h1>
    </div>

<div className='grid grid-cols-2 sm:grid-cols-4'>
    {/* @ts-ignore */}
    <TodoList/>
</div>
  {/* @ts-ignore */}
    <AddTodo/>
   </main>
  )
}
