document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
  
    // Load todos from local storage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    function saveTodos() {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    function renderTodos() {
      todoList.innerHTML = '';
      todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.toggle('completed', todo.completed);
        todoItem.innerHTML = `
          <span>${todo.text}</span>
          <div>
            <button onclick="toggleComplete(${index})">Complete</button>
            <button onclick="deleteTodo(${index})">Delete</button>
          </div>
        `;
        todoList.appendChild(todoItem);
      });
    }
  
    function addTodo(text) {
      todos.push({ text, completed: false });
      saveTodos();
      renderTodos();
    }
  
    function toggleComplete(index) {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    }
  
    function deleteTodo(index) {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    }
  
    window.toggleComplete = toggleComplete;
    window.deleteTodo = deleteTodo;
  
    todoForm.addEventListener('submit', event => {
      event.preventDefault();
      const text = todoInput.value.trim();
      if (text !== '') {
        addTodo(text);
        todoInput.value = '';
      }
    });
  
    renderTodos();
  });
  