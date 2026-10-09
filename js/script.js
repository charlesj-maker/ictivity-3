/* =========================================================
   ICT251 Activity 3 - script.js
   Charles Makwembo - Student ID: 202509566
   All features use vanilla JavaScript: variables, functions,
   events and DOM updates. Comments explain each function.
   ========================================================= */

// Run everything after the HTML has loaded
document.addEventListener("DOMContentLoaded", function () {
  setupMobileNav();
  setupProjectToggles();
  setupPhotoViewer();
  setupStudyCalculator();
  setupContactForm();
});

/* ---------------------------------------------------------
   1. Mobile navigation toggle
   Opens and closes the nav links on narrow screens using a
   button. The menu state is reflected with aria-expanded and
   a CSS class, so it is clear whether it is open or closed.
--------------------------------------------------------- */
function setupMobileNav() {
  const toggleButton = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  if (!toggleButton || !navLinks) return;

  toggleButton.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the mobile menu automatically after a link is clicked
  const links = navLinks.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      toggleButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------------------------------------------------------
   2. Expandable project/skill details
   Each project has a button and a hidden details panel.
   Clicking the button shows or hides its own panel and
   updates aria-expanded to reflect the open/closed state.
--------------------------------------------------------- */
function setupProjectToggles() {
  const toggles = document.querySelectorAll(".project-toggle");

  toggles.forEach(function (button) {
    button.addEventListener("click", function () {
      const details = button.nextElementSibling;
      const isHidden = details.hasAttribute("hidden");

      if (isHidden) {
        details.removeAttribute("hidden");
        button.setAttribute("aria-expanded", "true");
      } else {
        details.setAttribute("hidden", "");
        button.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* ---------------------------------------------------------
   3. Photo viewer (Previous / Next)
   Stores the gallery photos in an array of objects (src, alt,
   caption) and displays one at a time. Handles wrapping from
   the last photo back to the first, and vice versa.
--------------------------------------------------------- */
function setupPhotoViewer() {
  const viewerImage = document.getElementById("viewer-image");
  const viewerCaption = document.getElementById("viewer-caption");
  const prevButton = document.getElementById("viewer-prev");
  const nextButton = document.getElementById("viewer-next");

  if (!viewerImage || !prevButton || !nextButton) return;

  // Array of photo data, matching the gallery above
  const photos = [
    {
      src: "images/image1.jpg",
      alt: "Charles Makwembo working on coding projects",
      caption: "Developing web and software applications in the computer lab."
    },
    {
      src: "images/image2.jpg",
      alt: "Mulungushi University campus view",
      caption: "Academic study environments across campus at Mulungushi University."
    },
    {
      src: "images/image3.jpg",
      alt: "Data science workspace setup with code",
      caption: "Collaborating with peers on programming assignments and web tasks."
    }
  ];

  let currentIndex = 0;

  // Updates the image and caption to match currentIndex
  function showPhoto(index) {
    const photo = photos[index];
    viewerImage.src = photo.src;
    viewerImage.alt = photo.alt;
    viewerCaption.textContent = photo.caption;
  }

  prevButton.addEventListener("click", function () {
    // Wrap around to the last photo if currently on the first
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    showPhoto(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    // Wrap around to the first photo if currently on the last
    currentIndex = (currentIndex + 1) % photos.length;
    showPhoto(currentIndex);
  });
}

/* ---------------------------------------------------------
   4. Study hours calculator
   Reads hours-per-day and days-per-week, validates the input,
   and displays total weekly study hours. Rejects blank,
   non-numeric or negative values, and days outside 1-7.
--------------------------------------------------------- */
function setupStudyCalculator() {
  const calcButton = document.getElementById("calc-button");
  const hoursInput = document.getElementById("hours-per-day");
  const daysInput = document.getElementById("days-per-week");
  const resultEl = document.getElementById("calc-result");

  if (!calcButton) return;

  calcButton.addEventListener("click", function () {
    const hoursValue = hoursInput.value.trim();
    const daysValue = daysInput.value.trim();

    const hours = Number(hoursValue);
    const days = Number(daysValue);

    // Reject blank or non-numeric input
    if (hoursValue === "" || daysValue === "" || Number.isNaN(hours) || Number.isNaN(days)) {
      resultEl.textContent = "Please enter numeric values for both hours and days.";
      resultEl.style.color = "#c53030";
      return;
    }

    // Reject negative hours
    if (hours < 0) {
      resultEl.textContent = "Hours per day cannot be negative.";
      resultEl.style.color = "#c53030";
      return;
    }

    // Reject days outside the 1 to 7 range
    if (days < 1 || days > 7) {
      resultEl.textContent = "Days per week must be between 1 and 7.";
      resultEl.style.color = "#c53030";
      return;
    }

    const totalHours = hours * days;
    resultEl.textContent = "Total planned study time: " + totalHours + " hours per week.";
    resultEl.style.color = "#1a365d";
  });
}

/* ---------------------------------------------------------
   5. Compulsory: contact form validation and local preview
   Validates name, email and message on submit. Rejects
   whitespace-only names/messages and badly formatted emails.
   Shows errors near each field, and on success shows a local
   preview confirming the data was validated (not sent).
--------------------------------------------------------- */
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const topicInput = document.getElementById("topic");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("fullname-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  const previewBox = document.getElementById("form-preview");

  // Simple, readable email pattern: text@text.text
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (event) {
    // Keep everything on this page - no real submission
    event.preventDefault();

    let isValid = true;

    // Clear old messages before checking again
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    previewBox.setAttribute("hidden", "");

    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();

    // Reject empty or whitespace-only name
    if (nameValue === "") {
      nameError.textContent = "Please enter your full name.";
      isValid = false;
    }

    // Reject badly formatted email
    if (emailValue === "" || !emailPattern.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Reject empty or whitespace-only message
    if (messageValue === "") {
      messageError.textContent = "Please enter a message.";
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Build the preview using textContent only (never innerHTML)
    // so user-entered text cannot be interpreted as markup.
    previewBox.textContent = "";

    const heading = document.createElement("p");
    heading.textContent = "Your details were validated successfully (not sent):";
    heading.style.fontWeight = "bold";

    const nameLine = document.createElement("p");
    nameLine.textContent = "Name: " + nameValue;

    const emailLine = document.createElement("p");
    emailLine.textContent = "Email: " + emailValue;

    const topicLine = document.createElement("p");
    topicLine.textContent = "Topic: " + topicInput.value;

    const messageLine = document.createElement("p");
    messageLine.textContent = "Message: " + messageValue;

    previewBox.appendChild(heading);
    previewBox.appendChild(nameLine);
    previewBox.appendChild(emailLine);
    previewBox.appendChild(topicLine);
    previewBox.appendChild(messageLine);

    previewBox.removeAttribute("hidden");

    // Reset the form fields after a successful local preview
    form.reset();
  });
}
