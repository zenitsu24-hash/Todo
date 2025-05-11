import React from "react";

const Todo = ({id,title,description,complete, mongoId, deleteTodo, updateTodo}) => {
    
  return (
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {id+1}
        </th>
        <td className="px-6 py-4">{title}</td>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">{complete? "Completed": "Pending"}</td>
        <td className="px-6 py-4 flex gap-4">
            <button onClick={() => deleteTodo(mongoId)} className="py-2 px-4 bg-red-500 text-white">Delete</button>
            <button onClick={() => updateTodo(mongoId)} className="py-2 px-4 bg-green-500 text-white">Complete</button>
        </td>
      </tr>
    </tbody>
  );
};

export default Todo;
