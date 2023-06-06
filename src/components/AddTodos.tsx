import { NewTodo, Todo } from '@/lib/drizzle';
import React, { useEffect, useState } from 'react';

interface Refunc {
  refresh: () => void;
}

const AddTodos = ({ refresh }: Refunc) => {
  const [task, setTask] = useState<string>('');

  const addTodo = async () => {
    try {
      if (task) {
        const res = await fetch('/api/Todo', {
          method: 'POST',
          body: JSON.stringify({
            title: task,
            task: task
          }),
        });
        await refresh();
        setTask('');
      }
    } catch (error) {
      console.log('Error AddTODO');
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <form className="w-4/5">
          <input
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            className="w-full border border-blue-300 rounded focus:outline-blue-400"
            type="text"
          />
          <div className="flex justify-center">
            <button
              type="button"
              className="p-2 pl-4 pr-4 m-2 bg-blue-400 rounded"
              onClick={addTodo}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodos;
