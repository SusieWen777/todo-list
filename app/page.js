"use client";
import Todo from "@/components/Todo";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [todoData, setTodoData] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error("Failed to add Todo!");
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api");
      if (response.data.success) {
        setTodoData(response.data.todos);
      }
    } catch (error) {
      toast.error("Failed to fetch Todos!");
    }
  };

  const deleteTodo = async (mongoId) => {
    try {
      const response = await axios.delete("/api", { params: { mongoId } });
      if (response.data.success) {
        toast.success(response.data.msg);
        await fetchTodos();
      }
    } catch (error) {
      toast.error("Failed to delete Todos!");
    }
  };

  const completeTodo = async (mongoId) => {
    try {
      const response = await axios.patch("/api", {}, { params: { mongoId } });
      if (response.data.success) {
        toast.success(response.data.msg);
        await fetchTodos();
      }
    } catch (error) {
      toast.error("Failed to complete Todos!");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleChange}
          className="px-3 py-2 border-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
          className="px-3 py-2 border-2 w-full"
          required
        ></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto my-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return (
                <Todo
                  key={index}
                  id={index}
                  item={item}
                  deleteTodo={deleteTodo}
                  completeTodo={completeTodo}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
