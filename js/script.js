// Global List
let tasks = [];
let filter = 'all'; // all, completed, pending

// Function to add a task
function addTask() {
  const taskInput = document.getElementById('task-input');
  const dueDateInput = document.getElementById('due-date-input');

  if (taskInput.value === '' || dueDateInput.value === '') {
    alert('Please fill in both task and due date.');
  } else {
    const newTask = {
      id: Date.now(),
      task: taskInput.value,
      dueDate: dueDateInput.value,
      completed: false,
    };

    tasks.push(newTask);
    taskInput.value = '';
    dueDateInput.value = '';
    displayTasks();
  }
}

// Function to display tasks
function displayTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<p>No tasks found.</p>';
    return;
  }

  filteredTasks.forEach((element) => {
    const taskItem = `
      <div class="flex justify-between items-center p-[8px] border-b">
        <div class="flex flex-col">
          <span class="text-lg ${element.completed ? 'line-through text-gray-400' : ''}">${element.task}</span>
          <span class="text-sm text-gray-500">${element.dueDate}</span>
        </div>
        <button class="bg-green-500 text-white p-[4px] rounded" onclick="toggleTaskCompletion(${element.id})">${element.completed ? 'Undo' : 'Complete'}</button>
        <button class="bg-red-500 text-white p-[4px] rounded" onclick="deleteTask(${element.id})">Delete</button>
      </div>
    `;
    taskList.innerHTML += taskItem;
  });
}

// Delete specific task
function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    displayTasks();
  }
}

// Delete all tasks
function deleteAllTasks() {
  tasks = [];
  displayTasks();
}

// Toggle completion status
function toggleTaskCompletion(id) {
  const task = tasks.find((task) => task.id === id);
  if (task) {
    task.completed = !task.completed;
    displayTasks();
  }
}

// Set filter value
function setFilter(value) {
  filter = value;
  displayTasks();
}
