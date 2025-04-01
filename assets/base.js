// Simple JavaScript to make the navigation links smooth scroll
document.addEventListener("DOMContentLoaded", function () {
  // Get all navigation links that point to sections
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  setupPopup();

  // Add click event listener to each link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Get the target element
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      // Scroll smoothly to the target
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: "smooth",
        });
      }
    });
  });

  // Add active class to the current navigation item
  function highlightCurrentSection() {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll("nav ul li a");

    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentSectionId}`) {
        item.classList.add("active");
      }
    });
  }
  function setupPopup() {
    const btn = document.querySelector(".pop-up-btn");
    const popup = document.querySelector(".pop-up");
    const orderP = document.querySelector(".order-p");

    btn.addEventListener("click", function () {
      popup.style.display = "block";
      startCountdown(orderP);
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".pop-up") && e.target !== btn) {
        popup.style.display = "none";
      }
    });
  }

  function startCountdown(orderP) {
    const now = new Date();
    let targetTime = new Date(now);

    if (now.getHours() < 15) {
      targetTime.setHours(15, 0, 0, 0);
    } else {
      targetTime.setDate(targetTime.getDate() + 1);
      targetTime.setHours(15, 0, 0, 0);
    }

    const countdownInterval = setInterval(function () {
      const remainingTime = targetTime - new Date();

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        orderP.textContent = "Bestil inden kl 15, og så sender vi dine vare afsted allerede i dag 🚚";
      } else {
        const hours = Math.floor(remainingTime / 1000 / 60 / 60);
        const minutes = Math.floor((remainingTime / 1000 / 60) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        orderP.textContent = ` ${hours} timer ${minutes} minutter ${seconds} sekunder`;
      }
    }, 1000);
  }

  // Call the function on scroll
  window.addEventListener("scroll", highlightCurrentSection);
});
