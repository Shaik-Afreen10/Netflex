import { useState } from "react";

export function useTodoManager(initialList = []) {
  const [cart, setCart] = useState(initialList);

  const addTask = (newTask) => {
    setCart((prev) => [...prev, newTask]);
  };

  const updateTask = (index, updatedTask) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index] = updatedTask;
      return updated;
    });
  };

  const deleteTask = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    cart,
    addTask,
    updateTask,
    deleteTask,
  };
}
