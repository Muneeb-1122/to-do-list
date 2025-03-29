const createTaskWrapper = document.querySelector('.create-task-wrapper');
const addTaskBtn = document.querySelector('.add-task');
const heroSection = document.querySelector('.hero-section');
const taskCards = document.querySelector('.task-cards');

// Initialize the app when DOM is loaded
window.addEventListener('DOMContentLoaded', initializeApp);

// Initialize the application
function initializeApp() {
    createTaskWrapper.innerHTML = `
        <div class="create-task" style="display:none;">
            <h3>Create Task</h3>
            <input type="text" placeholder="Title" id="task-title">
            <input type="text" placeholder="Description" id="task-desc">
            <button class="primary-btn secondary-btn">Add Now</button>
        </div>`;

    setupEventListeners();
    loadTasksFromLocalStorage(); // Load tasks on page refresh
}

// Load tasks from localStorage and display them
function loadTasksFromLocalStorage() {
    let userLocalStorage = JSON.parse(localStorage.getItem("GetData")) || [];
    
    if (userLocalStorage.length > 0) {
        taskCards.innerHTML = ""; // Clear previous tasks
        userLocalStorage.forEach(task => {
            taskCards.innerHTML += createTaskCardHTML(task.title, task.description);
        });
    }
}

// Set up all event listeners
function setupEventListeners() {
    document.querySelector('.secondary-btn').addEventListener('click', addTask);
    addTaskBtn.addEventListener('click', showTaskBox);
    taskCards.addEventListener('click', handleTaskCardEvents);
    document.addEventListener('click', handleOutsideClick);
}

// Create HTML for new task card
function createTaskCardHTML(title, desc) {
    return `
        <div class="task-card">
            <div class="card-content">
                <div class="card-text">
                    <h5>${title}</h5>
                    <p class="card-description">${desc}</p>
                </div>
            </div>
            <img class="menu-icon" src="../resources/icons/3 dots.svg" alt="Menu" />
            <div class="dropdown-menu">
                <div class="menu-item">
                    <span class="menu-text">Delete</span>
                    <span class="icon delete-icon">
                        <img src="../resources/icons/delete icon.svg" alt="">
                    </span>
                </div>
                <div class="menu-item">
                    <span class="menu-text">Completed</span>
                    <span class="icon completed-icon">
                        <img src="../resources/icons/complete icon.svg" alt="">
                    </span>
                </div>
            </div>
        </div>`;
}

// Handle localStorage operations
function updateLocalStorage(title, desc, isDelete = false, isComplete = false) {
    let userLocalStorage = JSON.parse(localStorage.getItem("GetData")) || [];
    
    if (isDelete || isComplete) {
        userLocalStorage = userLocalStorage.filter((task) =>
            task.title !== title || task.description !== desc
        );
    } else {
        userLocalStorage.push({ title, description: desc });
    }
    
    localStorage.setItem("GetData", JSON.stringify(userLocalStorage));
    return userLocalStorage;
}

// Handle task card events (menu icon click and delete)
function handleTaskCardEvents(e) {
    if (e.target.classList.contains('menu-icon')) {
        handleMenuIconClick(e);
    }

    if (e.target.closest('.menu-item')) {
        const menuItem = e.target.closest('.menu-item');
        if (menuItem.querySelector('.delete-icon')) {
            handleDeleteTask(e);
        } else if (menuItem.querySelector('.completed-icon')) {
            handleCompleteTask(e);
        }
    }
}

// Handle menu icon click
function handleMenuIconClick(e) {
    const taskCard = e.target.closest('.task-card');
    const menuIcon = e.target;
    const dropdownMenu = taskCard.querySelector('.dropdown-menu');

    closeOtherDropdowns(menuIcon);
    toggleDropdownMenu(menuIcon, dropdownMenu);
}

// Close other open dropdowns
function closeOtherDropdowns(currentMenuIcon) {
    document.querySelectorAll('.menu-icon.cross').forEach(icon => {
        if (icon !== currentMenuIcon) {
            icon.classList.remove('cross');
            icon.closest('.task-card').querySelector('.dropdown-menu').style.display = 'none';
        }
    });
}

// Toggle dropdown menu display
function toggleDropdownMenu(menuIcon, dropdownMenu) {
    menuIcon.classList.toggle('cross');
    dropdownMenu.style.display = menuIcon.classList.contains('cross') ? 'block' : 'none';
}

// Handle delete task
function handleDeleteTask(e) {
    const taskCard = e.target.closest('.task-card');
    const taskTitle = taskCard.querySelector('h5').textContent;
    const taskDesc = taskCard.querySelector('.card-description').textContent;

    updateLocalStorage(taskTitle, taskDesc, true);
    taskCard.remove();
}

// Handle complete task
function handleCompleteTask(e) {
    const taskCard = e.target.closest('.task-card');
    const taskTitle = taskCard.querySelector('h5').textContent;
    const taskDesc = taskCard.querySelector('.card-description').textContent;

    alert('Congratulations! Your task is now completed! 🎉');
    updateLocalStorage(taskTitle, taskDesc, false, true);
    taskCard.remove();
}

// Handle clicks outside task cards
function handleOutsideClick(e) {
    if (!e.target.closest('.task-card')) {
        closeOtherDropdowns();
    }
}

function addTask(event) {
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    if (!title || !desc) return alert('Please enter both Title and Description!');

    taskCards.innerHTML += createTaskCardHTML(title, desc);

    // retrieving local storage data
    let userLocalStorage = JSON.parse(localStorage.getItem("GetData")) || [];
    // Adding new task to the array
    userLocalStorage = updateLocalStorage(title, desc);
    console.log(userLocalStorage);
    event.preventDefault();
    resetTaskBox();
}

function showTaskBox(e) {
    e.preventDefault();
    toggleDisplay(heroSection, false);
    toggleDisplay(document.querySelector('.create-task'), true);
    toggleDisplay(taskCards, false);
}

function resetTaskBox() {
    toggleDisplay(document.querySelector('.create-task'), false);
    toggleDisplay(heroSection, false);
    toggleDisplay(taskCards, true);
    document.getElementById('task-title').value = '';
    document.getElementById('task-desc').value = '';
}

const toggleDisplay = (element, show) => {
    element.style.display = show ? 'flex' : 'none';
}
