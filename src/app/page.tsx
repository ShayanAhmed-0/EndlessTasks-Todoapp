import Image from 'next/image'
import TodoList from '../components/TodoList'
import AddTodo from '../components/AddTodo'

export default function Home() {
  return (
   <main>
    {/* @ts-ignore */}
    <TodoList/>
    <AddTodo/>
   </main>
  )
}
