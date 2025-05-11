"use client";
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [formdata, setFormdata] = useState({
    title: "",
    description: "",
  });

  const [todoData, setTodoData] = useState([]);

  const setDataHandler = async() => {
    const response = await axios('/api/todo')
    setTodoData(response.data.todos)
  }

  useEffect(() => {
    setDataHandler()
  }, [])

  const DeleteTodo = async(mongoId) => {
    if (!mongoId) {
      toast.error("Invalid ID");
      return;
    }

    try {
      const response = await axios.delete('/api/todo', {
        params: {
          mongoId: mongoId
        }
      });
      toast.success(response.data.msg);
      setDataHandler();
    } catch (error) {
      toast.error("Failed to delete the todo");
    }
  }

  const UpdateTodo = async(mongoID) => {
    const response = await axios.put('/api/todo',{},{
      params: {
        mongoID: mongoID
      }
    })
    toast.success(response.data.msg)
    setDataHandler()
  }

  const formDataHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormdata((form) => ({ ...form, [name]: value }));
    console.log(formdata);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/todo", formdata);
      toast.success(response.data.msg);
      setFormdata({
        title: "",
        description: "",
      });
      setDataHandler()
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={handleSubmit}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          value={formdata.title}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
          onChange={formDataHandler}
        />
        <textarea
          value={formdata.description}
          name="description"
          placeholder="Enter description"
          className="px-3 py-2 border-2 w-full"
          onChange={formDataHandler}
        />
        <button type="submit" className="bg-orange-500 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Desctiption
              </th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {
            todoData.map((item, index) => {
              return <Todo key={index} id={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={DeleteTodo} updateTodo={UpdateTodo}/>
            })
          }
        </table>
      </div>
    </>
  );
}
