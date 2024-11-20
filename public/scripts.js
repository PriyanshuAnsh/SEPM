document.addEventListener('DOMContentLoaded', async () => {
  const authSection = document.getElementById('auth-section');
  const welcomeMessage = document.getElementById('welcome-message');
  const loginLink = document.getElementById('login-link');

  try {
    // Check if the user is logged in
    const response = await fetch('/api/auth/user', { credentials: 'include' });
    const data = await response.json();

    if (response.ok && data.username) {
      // User is authenticated
      authSection.style.display = 'none'; // Hide login section
      welcomeMessage.textContent = `Welcome, ${data.username}`;
      loginLink.innerHTML = `<a href="/logout">Logout</a>`;

      // If admin, redirect to admin dashboard
      if (data.role === 'admin') {
        window.location.href = '/admindashboard.html';
      }
    } else {
      // User is not authenticated
      authSection.style.display = 'block'; // Show login section
      welcomeMessage.textContent = 'Welcome to the Engineering Admission Portal';
      loginLink.innerHTML = `<a href="#login-section">Login</a>`;
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    authSection.style.display = 'block'; // Show login section
    welcomeMessage.textContent = 'Welcome to the Engineering Admission Portal';
    loginLink.innerHTML = `<a href="#login-section">Login</a>`;
  }
});

// Handle login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const loginData = Object.fromEntries(formData);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.role === 'admin') {
          // Redirect admin to admin dashboard
          window.location.href = '/admindashboard.html';
        } else {
          // Redirect regular user to index.html
          location.reload();
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const applyButton = document.getElementById('apply-button'); // Assuming this is the button/link to the form

  if (applyButton) {
      applyButton.addEventListener('click', async (e) => {
          e.preventDefault(); // Prevent the default navigation
          
          try {
              // Check if the user is logged in
              const response = await fetch('/api/auth/user', { credentials: 'include' });
              const data = await response.json();

              if (response.ok && data.username) {
                  // User is logged in, redirect to the application form page
                  window.location.href = '/applicationform.html';
              } else {
                  // User is not logged in, show alert and redirect to login section
                  alert('Please log in to fill the application form.');
                  window.location.href = '/#login-section'; // Redirect to login section
              }
          } catch (error) {
              console.error('Error checking login status:', error);
              alert('An error occurred. Please try again later.');
          }
      });
  }
});
