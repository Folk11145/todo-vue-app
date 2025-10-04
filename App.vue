<template>
  <div>
    <h1>Todo List</h1>

    
    <div class="input-container">
      <input v-model="newTodo" placeholder="เพิ่ม todo ใหม่" />
      <button class="add-btn" @click="addTodo">เพิ่ม</button>
    </div>

    
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" v-model="todo.completed" @change="toggleCompleted(todo)" />
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <button class="delete-button" @click="deleteTodo(todo.id)">ลบ</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const todos = ref([]);
    const newTodo = ref("");

    const backendUrl = "https://252130ee-edc5-4f72-b567-0c14ca8ac913-00-14z0373j8s5ul.sisko.replit.dev";

    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/todos`);
        todos.value = res.data;
      } catch (error) {
        console.error(error);
      }
    };

    const addTodo = async () => {
      if (!newTodo.value) return;
      try {
        await axios.post(`${backendUrl}/api/todos`, { title: newTodo.value });
        newTodo.value = "";
        await fetchTodos();
      } catch (error) {
        console.error(error);
      }
    };

    const deleteTodo = async (id) => {
      try {
        await axios.delete(`${backendUrl}/api/todos/${id}`);
        await fetchTodos();
      } catch (error) {
        console.error(error);
      }
    };

    const toggleCompleted = async (todo) => {
      try {
        await axios.put(`${backendUrl}/api/todos/${todo.id}`, { completed: todo.completed ? 1 : 0 });
        await fetchTodos();
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(fetchTodos);

    return { todos, newTodo, addTodo, deleteTodo, toggleCompleted };
  },
};
</script>

<style>

body {
  margin: 0;
  font-family: Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ffe0f0, #fff0e0); 
}

#app {
  width: 100%;
  max-width: 500px;
  padding: 40px 30px;
  text-align: center;
  background: linear-gradient(135deg, #ffe0e9, #d0f0ff);
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.12);
}


h1 {
  color: #5b2c6f;
  font-size: 2.5em;
  margin-bottom: 25px;
}


.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

input {
  flex: 1;
  padding: 12px 15px;
  font-size: 1em;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
}

input:focus {
  border-color: #7e57c2;
  box-shadow: 0 0 8px #7e57c2;
}

button.add-btn {
  padding: 10px 20px;
  font-size: 1em;
  background-color: #7e57c2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

button.add-btn:hover {
  background-color: #6a42a0;
  transform: scale(1.05);
}


.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.todo-list li:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0,0,0,0.12);
}

.todo-list li span {
  flex: 1;
  text-align: left;
  margin-left: 10px;
  font-size: 1.1em;
}

.todo-list li span.completed {
  text-decoration: line-through;
  color: gray;
}

.delete-button {
  padding: 10px 20px;
  font-size: 0.9em;
  background-color: #e64a4a;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 20px;
  transition: all 0.3s;
}

.delete-button:hover {
  background-color: #d32f2f;
  transform: scale(1.1);
}


input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #7e57c2;
}
</style>
