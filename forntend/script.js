const apiUrl = 'http://localhost:3000/api/tasks';

// Function to delete a task
async function deleteTask(id) {
  await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

// Function to show update form
function showUpdateForm(id, title, description) {
  const titleInput = document.getElementById('taskTitle');
  const descriptionInput = document.getElementById('taskDescription');
  titleInput.value = title;
  descriptionInput.value = description;

  const updateButton = document.createElement('button');
  updateButton.innerText = 'Update Task';
  updateButton.onclick = () => updateTask(id);
  document.getElementById('addTaskForm').appendChild(updateButton);
}

// Function to update a task
async function updateTask(id) {
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;

  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  fetchTasks();
}

// Function to display tasks
function displayTasks(tasks) {
  const tasksContainer = document.getElementById('tasksContainer');
  tasksContainer.innerHTML = '';

  tasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <button onclick="deleteTask('${task.id}')">Delete</button>
      <button onclick="showUpdateForm('${task.id}', '${task.title}', '${task.description}')">Update</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
}

// Function to fetch tasks from the API
async function fetchTasks() {
  const response = await fetch(apiUrl);
  const tasks = await response.json();
  displayTasks(tasks);
}

// Function to handle adding a task
document.getElementById('addTaskForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = document.getElementById('taskTitle').value;
  const description = document.getElementById('taskDescription').value;

  await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDescription').value = '';
  fetchTasks();
});

// Initial fetch of tasks
fetchTasks();
