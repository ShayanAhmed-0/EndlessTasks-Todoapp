// "use client";
// import React, { useState } from "react";
// import { NewTodo } from "../lib/drizzle";
// import { useRouter } from "next/navigation";


// const AddTodo = () => {
//   const [task, setTask] = useState<NewTodo | null>(null);
//   const { refresh } = useRouter();
//   const handleSubmit = async () => {
//     try {
//       if (task) {
//         const res = await fetch("/api/Todo", {
//           method: "POST",
//           body: JSON.stringify({
//             task: task.task
//           }),
//         });
//         refresh();
//       }
//     } catch (error) {
//       console.log("Error AddTODO");
//     }
//   };

//   return (
//     <div>
//       <form className="w-full">
//         <input
//           onChange={(e) =>
//             setTask({
//               task: e.target.value
//             })
//           }
//           className="w-full border rounded focus:outline-blue-400"
//           type="text"
//         />
//         <button type="button" onClick={handleSubmit}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddTodo;
