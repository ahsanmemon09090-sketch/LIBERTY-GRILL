// ========== MENU PAGE LOGIC ==========

const menuItems = [
    { id: 1, name: "Chiken corn soup", category: "starters", price: "PKR 499", img: "./images/soup.jpg" },
    { id: 2, name: "momo's", category: "starters", price: "PKR 350", img: "./images/mo.jpg" },
    { id: 3, name: "finger fish", category: "starters", price: "PKR 699", img: "./images/fing.jpg" },
    { id: 4, name: "pizza", category: "mains", price: "PKR 1799", img: "./images/piz.jpg" },
    { id: 5, name: "Beef Steak", category: "mains", price: "PKR 1899", img: "./images/st.jpg" },
    { id: 6, name: "Rosted Chiken", category: "mains", price: "PKR 2199", img: "./images/rost.jpg" },
    { id: 7, name: "Chocolate Cake", category: "desserts", price: "PKR 899", img: "./images/cc.jpg" },
    { id: 8, name: "Donuts", category: "desserts", price: "PKR 550", img: "./images/don.jpg" },
    { id: 9, name: "Ice Cream", category: "desserts", price: "PKR 399", img: "./images/ice.jpg" }
];

function renderMenu(items) {
    const container = document.getElementById('menuContainer');
    if (!container) return; // If not on menu page, exit

    container.innerHTML = '';
    items.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${item.img}" class="card-img-top" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">Category: ${item.category}</p>
                    <p class="card-text"><strong>${item.price}</strong></p>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

function setupMenuPage() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                let filtered = menuItems;
                if (filter !== 'all') {
                    filtered = menuItems.filter(item => item.category === filter);
                }
                renderMenu(filtered);
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const term = this.value.toLowerCase();
            const filtered = menuItems.filter(item => 
                item.name.toLowerCase().includes(term)
            );
            renderMenu(filtered);
        });
    }

    // Initial render
    renderMenu(menuItems);
}

// ========== RESERVATION FORM VALIDATION ==========

function setupReservationPage() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const guests = parseInt(document.getElementById('guests').value);
        const alertContainer = document.getElementById('alertContainer');

        let errors = [];
        if (!name) errors.push("Name is required.");
        if (!phone || phone.length !== 11) errors.push("Phone must be 11 digits.");
        if (!guests || guests < 1) errors.push("Guests must be at least 1.");

        if (errors.length > 0) {
            alertContainer.innerHTML = `
                <div class="alert alert-danger">
                    <strong>Error:</strong> ${errors.join('<br>')}
                </div>
            `;
        } else {
            alertContainer.innerHTML = `
                <div class="alert alert-success">
                    <strong>Success!</strong> Your table has been booked.
                </div>
            `;
            form.reset();
        }
    });
}

// ========== INITIALIZE ==========

document.addEventListener('DOMContentLoaded', function() {
    setupMenuPage();
    setupReservationPage();
});