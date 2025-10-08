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


  });

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    
    contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(contactForm);

  try {
    const response = await fetch("https://elvisportfolio.lovestoblog.com/send_message.php", {
      method: "POST",
      body: formData
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

// Blog read more/less
// ===== BLOG READ MORE / LESS TOGGLE =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".read-more").forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      const isVisible = content.style.display === "block";

      content.style.display = isVisible ? "none" : "block";
      button.textContent = isVisible ? "Read More" : "Read Less";
    });
  });
});

 
// ===== MOBILE MENU TOGGLE FIX =====
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
});
