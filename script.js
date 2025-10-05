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
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let valid = true;
            let errorMsg = "";

            if (name.length < 2) {
                valid = false;
                errorMsg += "Name must be at least 2 characters.\n";
            }
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                valid = false;
                errorMsg += "Provide a valid email address.\n";
            }
            if (message.length < 10) {
                valid = false;
                errorMsg += "Message must be at least 10 characters.\n";
            }

            if (!valid) {
                alert(errorMsg);
                e.preventDefault();
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
