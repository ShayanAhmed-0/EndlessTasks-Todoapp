import Image from 'next/image'
import TodoList from './TodoList'

export default function Home() {
  return (
   <main>
    {/* @ts-ignore */}
    <TodoList/>
   </main>
  )
}
