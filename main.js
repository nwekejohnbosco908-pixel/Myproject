/**
 * Navigation Menu Toggle
 * Handles opening/closing mobile navigation with proper ARIA attributes
 */
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-list a");

  // Toggle menu on hamburger click
  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("open");
      const icon = menuToggle.querySelector("i");
      
      // Update ARIA state
      menuToggle.setAttribute("aria-expanded", isOpen);
      
      // Toggle icon
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
  }

  // Close menu when navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (menuToggle && siteNav) {
        siteNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });
});

/**
 * Typing Effect Animation
 * Simulates typing text with delete animation
 * 
 * Constants for timing and behavior:
 * TYPING_SPEED: delay between typing each character
 * DELETION_SPEED: delay between deleting each character (faster than typing)
 * PAUSE_AFTER_COMPLETE: delay before starting to delete
 * PAUSE_BEFORE_NEXT: delay before typing next text
 */
const TYPING_SPEED = 120; // milliseconds per character
const DELETION_SPEED = 50; // faster deletion
const PAUSE_AFTER_COMPLETE = 1500; // pause when text is complete
const PAUSE_BEFORE_NEXT = 500; // pause before next text

const texts = ["Frontend Developer", "UI / UX Designer"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;

const typingElement = document.querySelector(".typing-text");

/**
 * Main typing animation function
 * Manages character-by-character typing and deletion
 * Handles cursor visibility synchronization
 */
function type() {
  if (!typingElement) {
    return;
  }

  const currentText = texts[textIndex];

  // Delete character or type character
  if (isDeleting) {
    charIndex = Math.max(charIndex - 1, 0);
    typingElement.textContent = currentText.substring(0, charIndex);
  } else {
    charIndex = Math.min(charIndex + 1, currentText.length);
    typingElement.textContent = currentText.substring(0, charIndex);
  }

  // Determine next action delay
  let delay = isDeleting ? DELETION_SPEED : TYPING_SPEED;

  // Transition logic
  if (!isDeleting && charIndex === currentText.length) {
    // Text complete, pause before deleting
    isDeleting = true;
    delay = PAUSE_AFTER_COMPLETE;
  } else if (isDeleting && charIndex === 0) {
    // Text deleted, move to next
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    delay = PAUSE_BEFORE_NEXT;
  }

  // Schedule next animation frame
  typingTimeout = setTimeout(type, delay);
}

// Start typing effect after initial delay
typingTimeout = setTimeout(type, 800);

/**
 * Smooth Scroll Navigation
 * Handles smooth scrolling to sections when clicking anchor links
 * Accounts for fixed header height when scrolling
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    
    // Skip empty or invalid targets
    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      event.preventDefault();
      
      // Account for fixed header height (80px)
      const targetOffset = targetElement.offsetTop - 80;
      
      window.scrollTo({ 
        top: targetOffset, 
        behavior: "smooth" 
      });
    }
  });
});

/**
 * Contact Form Validation and Submission
 * Validates form inputs and provides user feedback
 */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form fields
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");
    
    // Get error containers
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const successMessage = document.getElementById("form-success");

    // Reset all errors
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";
    successMessage.classList.remove("show");

    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
      nameError.textContent = "Name is required";
      nameInput.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      nameInput.setAttribute("aria-invalid", "false");
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required";
      emailInput.setAttribute("aria-invalid", "true");
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address";
      emailInput.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      emailInput.setAttribute("aria-invalid", "false");
    }

    // Validate message
    if (!messageInput.value.trim()) {
      messageError.textContent = "Message is required";
      messageInput.setAttribute("aria-invalid", "true");
      isValid = false;
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters";
      messageInput.setAttribute("aria-invalid", "true");
      isValid = false;
    } else {
      messageInput.setAttribute("aria-invalid", "false");
    }

    // If valid, show success message (in production, send to server)
    if (isValid) {
      successMessage.textContent = 
        "Message sent successfully! I'll get back to you shortly.";
      successMessage.classList.add("show");
      
      // Reset form after delay
      setTimeout(() => {
        contactForm.reset();
        successMessage.classList.remove("show");
      }, 3000);
    }
  });

  // Clear error messages on input
  const formInputs = contactForm.querySelectorAll("input, textarea");
  formInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const errorId = this.id + "-error";
      const errorElement = document.getElementById(errorId);
      if (errorElement) {
        errorElement.textContent = "";
      }
      this.setAttribute("aria-invalid", "false");
    });
  });
}

/**
 * Cleanup function for typing effect
 * Can be called to stop the typing animation if needed
 */
function stopTyping() {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
}
