// User Database (same as vulnerable version)
const USERS_DATABASE = {
    104: {
        id: 104,
        name: 'Alice Chen',
        email: 'alice@email.com',
        password: 'password123',
        phone: '+1 (555) 123-4567',
        address: '123 Oak Street, Seattle, WA 98101',
        orders: [
            { id: 'ORD-2024-1041', date: '2024-01-15', item: 'MacBook Pro 14"', amount: '$1,999.00', status: 'Delivered' },
            { id: 'ORD-2024-1042', date: '2024-02-20', item: 'iPad Air', amount: '$599.00', status: 'Delivered' }
        ],
        card: 'Visa •••• 4532'
    },
    105: {
        id: 105,
        name: 'Bob Martinez',
        email: 'bob@email.com',
        password: 'password123',
        phone: '+1 (555) 987-6543',
        address: '456 Pine Avenue, Portland, OR 97201',
        orders: [
            { id: 'ORD-2024-1051', date: '2024-01-10', item: 'Gaming Keyboard', amount: '$149.99', status: 'Delivered' },
            { id: 'ORD-2024-1052', date: '2024-03-05', item: 'Wireless Headphones', amount: '$299.99', status: 'Shipped' }
        ],
        card: 'Mastercard •••• 8765'
    },
    106: {
        id: 106,
        name: 'Diana Okonkwo',
        email: 'diana@email.com',
        password: 'password123',
        phone: '+1 (555) 246-8024',
        address: '789 Maple Drive, Boston, MA 02108',
        orders: [
            { id: 'ORD-2024-1061', date: '2024-02-14', item: 'Standing Desk', amount: '$599.99', status: 'Delivered' },
            { id: 'ORD-2024-1062', date: '2024-03-18', item: '4K Webcam', amount: '$199.99', status: 'Processing' }
        ],
        card: 'Amex •••• 1007'
    }
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
});

function initializeProfile() {
    // Check if user is logged in
    const loggedInUserId = localStorage.getItem('loggedUserId');
    
    if (!loggedInUserId) {
        alert('Please login first');
        window.location.href = 'login.html';
        return;
    }
    
    // Get requested user ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const requestedUserId = urlParams.get('user_id');
    
    if (!requestedUserId) {
        window.location.href = `profile.html?user_id=${loggedInUserId}`;
        return;
    }
    
    // 🛡️ IDOR FIX: Check if user can access this profile
    if (requestedUserId !== loggedInUserId) {
        showSecurityAlert(loggedInUserId, requestedUserId);
        
        // Redirect to their own profile after 3 seconds
        setTimeout(function() {
            window.location.href = `profile.html?user_id=${loggedInUserId}`;
        }, 3000);
        return;
    }
    
    // Load user profile (authorized access)
    loadUserProfile(requestedUserId);
}

// 🚨 Show security alert when IDOR attack is blocked
function showSecurityAlert(loggedUserId, attemptedUserId) {
    // Create alert banner
    const alertBanner = document.createElement('div');
    alertBanner.style.cssText = `
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        text-align: center;
        animation: slideIn 0.5s ease-out;
    `;
    
    alertBanner.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
            <i class="fas fa-shield-alt" style="font-size: 2rem;"></i>
            <div>
                <strong style="font-size: 1.2rem;">🚨 UNAUTHORIZED ACCESS BLOCKED</strong>
                <p style="margin: 5px 0 0 0;">You tried to access user ${attemptedUserId} but you're logged in as user ${loggedUserId}</p>
                <p style="margin: 5px 0 0 0;">Redirecting to your profile in 3 seconds...</p>
            </div>
        </div>
    `;
    
    // Insert at top of page
    const container = document.querySelector('.form-container');
    container.insertBefore(alertBanner, container.firstChild);
    
    console.log(`🚨 IDOR ATTACK BLOCKED: User ${loggedUserId} tried to access User ${attemptedUserId}`);
}

// Same loadUserProfile function as vulnerable version
function loadUserProfile(userId) {
    const user = USERS_DATABASE[userId];
    
    if (!user) {
        alert('User not found');
        return;
    }
    
    // Display user information
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-id').textContent = '#' + user.id;
    document.getElementById('user-email').textContent = user.email;
    document.getElementById('user-phone').textContent = user.phone;
    document.getElementById('user-address').textContent = user.address;
    document.getElementById('card-info').textContent = user.card;
    
    // Display orders
    const ordersContainer = document.getElementById('orders-container');
    ordersContainer.innerHTML = '';
    
    if (user.orders.length === 0) {
        ordersContainer.innerHTML = '<p>No orders yet.</p>';
        return;
    }
    
    user.orders.forEach(function(order) {
        const orderHTML = `
            <div class="order-item">
                <div class="order-info">
                    <strong>${order.item}</strong>
                    <p class="order-meta">${order.id} • ${order.date}</p>
                </div>
                <div class="order-status">
                    <strong class="order-amount">${order.amount}</strong>
                    <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
                </div>
            </div>
        `;
        ordersContainer.innerHTML += orderHTML;
    });
    
    console.log('✅ Authorized access granted to user:', user.name);
}

function logout() {
    localStorage.removeItem('loggedUserId');
    window.location.href = 'login.html';
}