// Force dark mode by default and handle interactivity
window.onload = function () {
  document.body.classList.add("dark-mode");

  // Dynamic year
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Collapsible sections (Projects)
  document.querySelectorAll(".collapsible").forEach((button) => {
    button.addEventListener("click", function () {
      const content = this.nextElementSibling;
      if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        this.textContent = "Hide Details";
      } else {
        content.style.display = "none";
        this.textContent = "Show Details";
      }
    });
  // ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

  });

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      try {
        const response = await fetch(
          "https://elvis-portfolio-backend.onrender.com/send-message",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
          }
        );
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

// Blog read more/less
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
 // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
