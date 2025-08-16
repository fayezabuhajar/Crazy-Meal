// Static menu data - Accessible by both pages
const menuItems = [
    { name: 'Chicken Pesto Pasta', price: 4.99, image: 'images/image.png' },
    { name: 'Crunchy Coconut Chicken', price: 5.50, image: 'images/image2.png' },
    { name: 'Caprese Chicken Gnocchi Skillet', price: 3.99, image: 'images/image3.png' },
    { name: 'Chicken Enchiladas', price: 4.00, image: 'images/image4.png' },
    { name: 'Orange Chicken', price: 3.50, image: 'images/image5.png' }
];

// Function to render the menu items on the menu.html page
function renderMenu() {
    const mealsContainer = document.getElementById('meals-container');
    if (!mealsContainer) return; // Exit if not on menu.html page

    mealsContainer.innerHTML = ''; 

    menuItems.forEach(item => {
        const menuItemDiv = document.createElement('div');
        menuItemDiv.className = 'menu-item';

        const img = document.createElement('img');
        img.className = 'image';
        img.src = item.image;
        img.alt = item.name;
        img.width = 200;
        img.height = 100;
        
        const nameH3 = document.createElement('h3');
        nameH3.textContent = item.name;
        
        const priceSpan = document.createElement('span');
        priceSpan.className = 'price';
        priceSpan.textContent = `$${item.price.toFixed(2)}`;
        
        menuItemDiv.appendChild(img);
        menuItemDiv.appendChild(nameH3);
        menuItemDiv.appendChild(priceSpan);
        
        mealsContainer.appendChild(menuItemDiv);
    });
}

// Functionality for index.html page
function setupIndexPage() {
    // Check if the necessary elements for the index page exist
    const mealForm = document.getElementById('mealForm');
    if (!mealForm) return;

    // The rest of your existing app.js code for the index page goes here
    const mealSelect = document.getElementById('mealSelect');
    const mealPriceInput = document.getElementById('mealPriceInput');
    const mealImageInput = document.getElementById('mealImageInput');
    const ordersTableBody = document.querySelector('#ordersTable tbody');
    const clearOrdersBtn = document.getElementById('clearOrdersBtn');

    // Constructor function
    function Order(mealName, mealPrice, mealImage) {
        this.mealName = mealName;
        this.mealPrice = mealPrice;
        this.mealImage = mealImage;
    }

    // Function to populate the dropdown
    function populateDropdown() {
        menuItems.forEach((meal, index) => {
            const option = document.createElement('option');
            option.value = index; 
            option.textContent = meal.name;
            mealSelect.appendChild(option);
        });
    }

    // Event Listener for dropdown change
    mealSelect.addEventListener('change', function() {
        const selectedIndex = this.value;
        if (selectedIndex !== "") {
            const selectedMeal = menuItems[selectedIndex];
            mealPriceInput.value = selectedMeal.price;
            mealImageInput.value = selectedMeal.image;
        } else {
            mealPriceInput.value = '';
            mealImageInput.value = '';
        }
    });

    // Function to save orders to localStorage
    function saveOrders(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    // Function to get orders from localStorage
    function getOrders() {
        const orders = localStorage.getItem('orders');
        return orders ? JSON.parse(orders) : [];
    }

    // Function to display orders in the table
    function displayOrders() {
        ordersTableBody.innerHTML = '';
        const orders = getOrders();

        orders.forEach(order => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.mealName}</td>
                <td>$${order.mealPrice.toFixed(2)}</td>
                <td><img src="${order.mealImage}" alt="${order.mealName}" width="100"></td>
            `;
            ordersTableBody.appendChild(row);
        });
    }

    // Event Listener for form submission
    mealForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const selectedIndex = mealSelect.value;
        const selectedMeal = menuItems[selectedIndex];

        if (selectedMeal) {
            const newOrder = new Order(selectedMeal.name, selectedMeal.price, selectedMeal.image);
            const orders = getOrders();
            orders.push(newOrder);
            saveOrders(orders);
            displayOrders();
        }
        mealForm.reset();
    });

    // Event Listener for "Clear All Orders" button
    clearOrdersBtn.addEventListener('click', function() {
        localStorage.clear();
        displayOrders();
    });

    // Initial load: populate dropdown and display saved orders
    populateDropdown();
    displayOrders();
}

// Check the current page and run the appropriate function
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.endsWith('menu.html')) {
        renderMenu();
    } else {
        setupIndexPage();
    }
});