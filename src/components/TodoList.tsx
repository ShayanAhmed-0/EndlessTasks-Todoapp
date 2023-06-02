"use client";
import { Todo } from "../lib/drizzle";
import { useState, useEffect } from "react";
import { NewTodo } from "../lib/drizzle";
import delicon from "../../public/delete.png"
import Image from "next/image";
import PopupScreen from "./Popup";
import AddTodos from "./AddTodos";


async function getData() {
  try {
    const res = await fetch("https://endlesstasks.vercel.app/api/Todo", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json()
    return result;
  } catch (error) {
    console.log("error: " + error);
  }
};

const handleDel = async (todoId: number, refreshList: () => void) => {
  try {
    const res = await fetch(`/api/Todo/${todoId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    refreshList(); // Call the refreshList function to update the list
  } catch (error) {
    console.log("Delete handle");
  }
}



const TodoList = () => {
  const [data, setData] = useState<Todo[]>([]);


  const refreshList = async () => {
    const result = await getData();
    setData(result.data);
  }

  useEffect(() => {
    refreshList(); // Initial data fetching
  }, []);

  return (
    <>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

    {data.map((item) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg" key={item.id}>
      <h2 className="mb-4 text-xl font-bold">Card Title</h2>
      <p className="mb-4 text-gray-600">{item.task}</p>
      <div className="flex items-center justify-between">
        {/* edit button implementation */}
        <PopupScreen refresh={refreshList} comptask={item.task} compid={item.id} />

        <button onClick={() => handleDel(item.id, refreshList)}>
          <Image src={delicon} alt="delete icon" />
        </button>
      </div>
    </div>
  );
})}

          </div>
     <AddTodos refresh={refreshList}/>
    </>
  );
};

export default TodoList;
