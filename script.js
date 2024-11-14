const usersContainer = document.getElementById('users-container');
const paginationButtons = document.getElementById('pagination-buttons');
const errorMessage = document.getElementById('error-message');

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const USERS_PER_PAGE = 6; // Number of users per page

// Fetch user data from API with pagination parameters
async function fetchUsers(page = 1, limit = USERS_PER_PAGE) {
    const url = ${USERS_API_URL}?_page=${page}&_limit=${limit};
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(Failed to fetch data: ${response.statusText});
        }

        const users = await response.json();
        return users;
    } catch (error) {
        displayError(error.message);
        return [];
    }
}

// Render user data
function renderUsers(users) {
    usersContainer.innerHTML = ''; // Clear previous user data

    if (users.length === 0) {
        usersContainer.innerHTML = '<p>No users available</p>';
        return;
    }

    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';

        const userName = document.createElement('span');
        userName.textContent = ${user.id}. ${user.name};

        const userEmail = document.createElement('span');
        userEmail.textContent = user.email;

        userItem.appendChild(userName);
        userItem.appendChild(userEmail);
        usersContainer.appendChild(userItem);
    });
}

// Render pagination buttons
function renderPagination(totalUsers, currentPage = 1) {
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);
    paginationButtons.innerHTML = ''; // Clear previous pagination buttons

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.classList.toggle('active', i === currentPage);

        button.addEventListener('click', () => {
            loadPage(i);
        });

        paginationButtons.appendChild(button);
    }
}

// Load user data for a specific page
async function loadPage(page) {
    clearError();
    const users = await fetchUsers(page);

    if (users.length > 0) {
        renderUsers(users);
        renderPagination(10, page); // Assuming total users count is 10 for demo purposes
    }
}

// Display error messages
function displayError(message) {
    errorMessage.textContent = Error: ${message};
}

// Clear error messages
function clearError() {
    errorMessage.textContent = '';
}

// Initialize the app by loading the first page
document.addEventListener('DOMContentLoaded', () => {
    loadPage(1);
});