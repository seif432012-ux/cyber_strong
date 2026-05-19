// User Database (same as vulnerable version)
const USERS_DATABASE = {
    104: {
        id: 104,
        name: 'chrisasito',
        email: 'chris123@email.com',
        password: '123456',
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
        name: 'Mr Hops',
        email: 'hops123@email.com',
        password: '123456',
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
        name: 'dianamohamed',
        email: 'diana123@email.com',
        password: '123456',
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
    const loginForm = document.getElementById('login-form');
    
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');
        
        // Find user by email
        let foundUser = null;
        for (let userId in USERS_DATABASE) {
            if (USERS_DATABASE[userId].email.toLowerCase() === email && 
                USERS_DATABASE[userId].password === password) {
                foundUser = USERS_DATABASE[userId];
                break;
            }
        }
        
        if (foundUser) {
            // Store logged-in user ID
            localStorage.setItem('loggedUserId', foundUser.id);
            
            // Clear form
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            errorMessage.style.display = 'none';
            
            // 🛡️ ONLY CHANGE: Redirect to SECURE profile
            setTimeout(function() {
                window.location.href = 'profile.html?user_id=' + foundUser.id;
            }, 200);
        } else {
            errorMessage.textContent = 'Invalid email or password';
            errorMessage.style.display = 'block';
        }
    });
});