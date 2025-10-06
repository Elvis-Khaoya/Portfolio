// DARK MODE TOGGLE
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

window.onload = function() {
    // Restore theme on all pages
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        // If button exists (on index), update its label
        const btn = document.getElementById('dark-mode-toggle');
        if (btn) btn.textContent = "Light Mode";
    } else {
        const btn = document.getElementById('dark-mode-toggle');
        if (btn) btn.textContent = "Dark Mode";
    }

    // Dynamic footer date
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Collapsible sections (for projects)
    document.querySelectorAll('.collapsible').forEach(function(button) {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            if (content.style.display === "none" || content.style.display === "") {
                content.style.display = "block";
                this.textContent = "Hide Details";
            } else {
                content.style.display = "none";
                this.textContent = "Show Details";
            }
        });
    });

    // Contact form validation
// CONTACT FORM SUBMISSION TO BACKEND
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    try {
      const response = await fetch('http://127.0.0.1:5000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message })
      });

      const result = await response.json();

      if (result.status === "success") {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      } else {
        alert("⚠️ Error: " + result.message);
      }

    } catch (error) {
      alert("❌ Failed to send message. Backend may be offline.");
      console.error(error);
    }
  });
}
};
// BLOG TOGGLE FUNCTIONALITY
function toggleBlogContent(button) {
  const content = button.nextElementSibling;
  if (content.style.display === "block") {
    content.style.display = "none";
    button.textContent = "Read More";
  } else {
    content.style.display = "block";
    button.textContent = "Read Less";
  }
}
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  
  const icon = document.getElementById('dark-mode-icon');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    icon.textContent = "☀️"; // Sun for light mode
  } else {
    localStorage.setItem('theme', 'light');
    icon.textContent = "🌙"; // Moon for dark mode
  }
}

window.onload = function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('dark-mode-icon');
    if (icon) icon.textContent = "☀️";
  } else {
    const icon = document.getElementById('dark-mode-icon');
    if (icon) icon.textContent = "🌙";
  }

  // (keep your other window.onload code — footer year, collapsibles, etc.)
};
