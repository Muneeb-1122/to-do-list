// const body = document.querySelector('body');
const createtaskWrapper = document.querySelector('.create-task-wrapper')
const addTask = document.querySelector('.add-task');
const heroSection = document.querySelector('.hero-section');
const createTaskDiv = document.createElement('div');

// Call on page load
window.addEventListener('DOMContentLoaded', () => {
    createTaskBox();
});

// Create Task Box function
function createTaskBox() {
    createTaskDiv.innerHTML = `
        <h3>Create Task</h3>
        <input class="input-title" type="text" placeholder="Title" id="task-title">
        <input class="input-description" type="text" placeholder="Description" id="task-desc">
        <button class="primary-btn">add Now</button>
    `;
    createTaskDiv.classList.add('create-task');
    createTaskDiv.style.display = 'none'; // Initially hidden
    createtaskWrapper.append(createTaskDiv);
}

// Show Task Box on click
addTask.addEventListener('click', (e) => {
    e.preventDefault();
    heroSection.style.display = 'none';
    createTaskDiv.style.display = 'flex';
});
