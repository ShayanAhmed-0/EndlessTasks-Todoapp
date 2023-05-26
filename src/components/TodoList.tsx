"use client";
import { Todo } from "../lib/drizzle";
import { useState, useEffect } from "react";
import { NewTodo } from "../lib/drizzle";
import delicon from "../../public/delete.png"

import Image from "next/image";
import PopupScreen from "./Popup";


const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Todo", {
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

const handlePUT = async (todoId: number, refreshList: () => void) => {
  try {
    const res = await fetch(`/api/Todo/${todoId}`, {
      method: 'PUT',
      cache: "no-store",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    refreshList(); // Call the refreshList function to update the list
  } catch (error) {
    console.log("Delete handle");
  }
}

const TodoList = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
  const [data, setData] = useState<Todo[]>([]);


  const AddTodo = async () => {
    try {
      if (task) {
        const res = await fetch("/api/Todo", {
          method: "POST",
          body: JSON.stringify({
            task: task.task
          }),
        });
        await refreshList(); 
      }
    } catch (error) {
      console.log("Error AddTODO");
    }
  };

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
          <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Card Title</h2>
          <p className="mb-4 text-gray-600">{item.task}</p>
          <div className="flex items-center justify-between">
           
           {/*edit button implementation */}
           <PopupScreen/>

          <button onClick={() => handleDel(item.id, refreshList)}>
          <Image src={delicon} alt="delete icon"/>
          </button>
          </div>
        </div>
        );
      })}
          </div>
      <div className="flex justify-center">
        <form className="w-4/5">
          <input
            onChange={(e) =>
              setTask({
                task: e.target.value
              })
            }
            className="w-full border border-blue-300 rounded focus:outline-blue-400"
            type="text"
          />
          <div className="flex justify-center">
          <button type="button" className="p-2 pl-4 pr-4 m-2 bg-blue-400 rounded" onClick={AddTodo}>
            Submit
          </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TodoList;
