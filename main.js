document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-list a");

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      siteNav.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      siteNav.classList.remove("open");
      const icon = menuToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
});

// Text typing effect and smooth scroll
const texts = ["Frontend Development", "UI / UX Designer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing-text");

function type() {
  if (!typingElement) {
    return;
  }

  const currentText = texts[textIndex];

  if (isDeleting) {
    charIndex = Math.max(charIndex - 1, 0);
    typingElement.textContent = currentText.substring(0, charIndex);
  } else {
    charIndex = Math.min(charIndex + 1, currentText.length);
    typingElement.textContent = currentText.substring(0, charIndex);
  }

  let delay = isDeleting ? 50 : 120;

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    delay = 1500;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    delay = 500;
  }

  setTimeout(type, delay);
}

setTimeout(type, 800);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      event.preventDefault();
      const targetOffset = targetElement.offsetTop - 80;
      window.scrollTo({ top: targetOffset, behavior: "smooth" });
    }
  });
});
