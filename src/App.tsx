import { useEffect, useReducer } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Form from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { initialState, todoReducer } from "./reducer/todoReducer";
import type { Todo } from "./types";

function App() {
  const init = (): { todos: Todo[] } => {
    try {
      const almacenados = localStorage.getItem("todos");
      return {
        todos: almacenados ? JSON.parse(almacenados) : [],
      };
    } catch (error) {
      console.warn("Error leyendo localStorage:", error);
      return { todos: [] };
    }
  };

  // con useReducer
  const [state, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const addTodo = (tarea: string) => {
    dispatch({ type: "ADD_TODO", payload: tarea });
  };

  const onDelete = (id: Todo["id"]) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const onToggle = (id: Todo["id"]) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const updateTodo = (id: Todo["id"], newText: string) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, text: newText } });
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className=" flex-grow w-full md:w-4/5 lg:w-3/5 mx-auto p-5 space-y-10">
          <Form addTodo={addTodo} />
          <Stats todos={state.todos} />
          <TodoList
            todos={state.todos}
            onToggle={onToggle}
            updateTodo={updateTodo}
            onDelete={onDelete}
          />
        </main>
        <Footer todos={state.todos} />
      </div>
    </>
  );
}

export default App;
