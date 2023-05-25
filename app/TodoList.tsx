import { Todo } from "./lib/drizzle";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Todo",{
      method: "GET",
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
    console.log(error);
  }
};

const TodoList = async() => {

    const re:{data:Todo[]} = await getData()
    console.log(re)

  return (
    <>
    {re.data.map((item)=>{
      return(
        <div>
          <p>{item.task}</p>
        </div>
        )
    })}
    </>
  );
};

export default TodoList;
