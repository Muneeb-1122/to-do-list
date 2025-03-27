const createtaskWrapper = document.querySelector('.create-task-wrapper');
const addTask = document.querySelector('.add-task');
const heroSection = document.querySelector('.hero-section');
const createTaskDiv = document.createElement('div');
const taskCards = document.querySelector('.task-cards');

// Create Task Box on page load
window.addEventListener('DOMContentLoaded', () => {
    createTaskBox();
});

// Create Task Box function
function createTaskBox() {
    createTaskDiv.innerHTML = `
        <h3>Create Task</h3>
        <input class="input-title" type="text" placeholder="Title" id="task-title">
        <input class="input-description" type="text" placeholder="Description" id="task-desc">
        <button class="primary-btn secondary-btn">Add Now</button>
    `;
    createTaskDiv.classList.add('create-task');
    createTaskDiv.style.display = 'none';
    createtaskWrapper.append(createTaskDiv);

    const inputTitle = createTaskDiv.querySelector('.input-title');
    const inputDescription = createTaskDiv.querySelector('.input-description');
    const secondaryBtn = createTaskDiv.querySelector('.secondary-btn');

    // Add Task Button
    secondaryBtn.addEventListener('click', () => {
        const title = inputTitle.value;
        const description = inputDescription.value;
    
        if (title && description) {
            addTaskCard(title, description);
            createTaskDiv.style.display = 'none';
            heroSection.style.display = 'none'; // 👈 hide hero
            taskCards.style.display = 'flex';   // 👈 show task cards
        } else {
            alert('Please enter both Title and Description!');
        }
    });    
}

// Show Task Box
addTask.addEventListener('click', (e) => {
    e.preventDefault();
    heroSection.style.display = 'none';
    createTaskDiv.style.display = 'flex';
});

// Create and Add Task Card
function addTaskCard(title, description) {
    const card = document.createElement('div');
    card.classList.add('task-card');

    card.innerHTML = `
        <div class="card-content">
            <div class="card-text">
                <h5>${title}</h5>
                <p class="card-description">${description}</p>
            </div>
        </div>
        <img class="menu-icon" src="../resources/icons/3 dots.svg" alt="Menu" />
    `;

    taskCards.appendChild(card);
}