const createTaskWrapper = document.querySelector('.create-task-wrapper');
const addTaskBtn = document.querySelector('.add-task');
const heroSection = document.querySelector('.hero-section');
const taskCards = document.querySelector('.task-cards');

window.addEventListener('DOMContentLoaded', () => {
    createTaskWrapper.innerHTML = `
        <div class="create-task" style="display:none;">
            <h3>Create Task</h3>
            <input type="text" placeholder="Title" id="task-title">
            <input type="text" placeholder="Description" id="task-desc">
            <button class="primary-btn secondary-btn">Add Now</button>
        </div>`;

    document.querySelector('.secondary-btn').addEventListener('click', addTask);
    addTaskBtn.addEventListener('click', showTaskBox);
});

function addTask(event) {
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    if (!title || !desc) return alert('Please enter both Title and Description!');
    
    taskCards.innerHTML += `
        <div class="task-card">
            <div class="card-content">
                <div class="card-text">
                    <h5>${title}</h5>
                    <p class="card-description">${desc}</p>
                </div>
            </div>
            <img class="menu-icon" src="../resources/icons/3 dots.svg" alt="Menu" />
        </div>`;
    
    // retrieving local storage data
    let userLocalStorage = JSON.parse(localStorage.getItem("GetData")) || [];
    // Adding new task to the array
    userLocalStorage.push({
        title: title,
        description: desc
    });
    // storing updated data in localStorage
    localStorage.setItem("GetData", JSON.stringify(userLocalStorage));
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
