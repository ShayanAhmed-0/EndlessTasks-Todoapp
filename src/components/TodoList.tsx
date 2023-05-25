"use client"
import { Todo } from "../lib/drizzle";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Todo",{
      method: "GET",
      cache:"no-store",
      headers:{
        "Content-Type":"applocation/json"
      }
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await res.json()
    return result;
  } catch (error) {
    console.log("error: "+error);
  }
};

const TodoList = async() => {

const handleSubmit=async(todoId:number)=>{
  const res=await fetch(`/api/Todo/${todoId}`,{
    method:'DELETE'
  })
  const data = await res.json()
  getData()
}

    const res:{data:Todo[]} = await getData()

  return (
    <>
    {res.data.map((item)=>{
      return(
        <div className="flex justify-center p-2 m-10 font-bold bg-blue-300 border border-blue-500 rounded">
          <p>{item.task}</p>
          <button type='button' onClick={()=>{handleSubmit(item.id)}}>del</button>
        </div>
        )
    })}
    </>
  );
};

export default TodoList;
