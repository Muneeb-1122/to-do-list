const createTaskWrapper = document.querySelector('.create-task-wrapper');
const addTaskBtn = document.querySelector('.add-task');
const heroSection = document.querySelector('.hero-section');
const taskCards = document.querySelector('.task-cards');

window.addEventListener('DOMContentLoaded', () => {
    setupCreateTaskBox();
    loadTasksFromLocalStorage();
    addTaskBtn.addEventListener('click', showTaskBox);
});

function setupCreateTaskBox() {
    createTaskWrapper.innerHTML = `
        <div class="create-task" style="display:none;">
            <h3>Create Task</h3>
            <input type="text" placeholder="Title" id="task-title">
            <input type="text" placeholder="Description" id="task-desc">
            <button class="primary-btn secondary-btn">Add Now</button>
        </div>`;
    document.querySelector('.secondary-btn').addEventListener('click', handleAddTask);
}

function handleAddTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;
    if (!title || !description) {
        return alert('Please enter both Title and Description!');
    }
    taskCards.innerHTML += createTaskCard(title, description);
    saveTaskToLocalStorage(title, description);
    resetTaskCreation();
}

function createTaskCard(title, description) {
    return `<div class="task-card">
                <div class="card-content">
                    <div class="card-text">
                        <h5>${title}</h5>
                        <p class="card-description">${description}</p>
                    </div>
                </div>
                <img class="menu-icon" src="../resources/icons/3 dots.svg" alt="Menu" />
            </div>`;
}

function showTaskBox(e) {
    e.preventDefault();
    toggleVisibility(heroSection, false);
    toggleVisibility(document.querySelector('.create-task'), true);
    toggleVisibility(taskCards, false);
}

const toggleVisibility = (el, isVisible) => el.style.display = isVisible ? 'flex' : 'none';
const resetTaskCreation = () => {
    toggleVisibility(document.querySelector('.create-task'), false);
    toggleVisibility(heroSection, false);
    toggleVisibility(taskCards, true);
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
};

function saveTaskToLocalStorage(title, description) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    localStorage.setItem('tasks', JSON.stringify([...tasks, { title, description }]));
}

function loadTasksFromLocalStorage() {
    (JSON.parse(localStorage.getItem('tasks')) || []).forEach(task => {
        taskCards.innerHTML += createTaskCard(task.title, task.description)
    });
}