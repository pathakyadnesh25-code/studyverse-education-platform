
"use strict";

/* ==========================================
   STUDYVERSE AI - MAIN WEBSITE SCRIPT
========================================== */

// Entrance examination courses
const entranceExams = [
  {
    name: "JEE Main",
    icon: "⚛️",
    category: "ENGINEERING",
    description: "Prepare for engineering entrance examinations with structured PCM learning.",
    subjects: "Physics • Chemistry • Mathematics",
    level: "National Level",
    color: "#9b75ff"
  },
  {
    name: "JEE Advanced",
    icon: "🚀",
    category: "ENGINEERING",
    description: "Strengthen advanced concepts and problem-solving skills for IIT entrance.",
    subjects: "Physics • Chemistry • Mathematics",
    level: "Advanced Level",
    color: "#54a7ff"
  },
  {
    name: "NEET UG",
    icon: "🧬",
    category: "MEDICAL",
    description: "Prepare for medical entrance examinations with PCB learning resources.",
    subjects: "Physics • Chemistry • Biology",
    level: "National Level",
    color: "#57d9a3"
  },
  {
    name: "MHT-CET PCM",
    icon: "📐",
    category: "MAHARASHTRA CET",
    description: "Prepare for Maharashtra engineering and technology admissions.",
    subjects: "Physics • Chemistry • Mathematics",
    level: "State Level",
    color: "#ffb66d"
  },
  {
    name: "MHT-CET PCB",
    icon: "🔬",
    category: "MAHARASHTRA CET",
    description: "Prepare for Maharashtra PCB entrance examination pathways.",
    subjects: "Physics • Chemistry • Biology",
    level: "State Level",
    color: "#ff83bd"
  }
];

// School education options
const schoolBoards = [
  "Maharashtra State Board",
  "CBSE",
  "ICSE"
];

const schoolClasses = ["8", "9", "10"];

const examGrid = document.getElementById("examGrid");
const schoolGrid = document.getElementById("schoolGrid");

// Create entrance exam cards
function renderEntranceExams() {
  if (!examGrid) return;

  examGrid.innerHTML = entranceExams.map((exam, index) => `
    <article class="course-card reveal" style="--card-glow:${exam.color}22; --icon-bg:${exam.color}22; transition-delay:${index * 80}ms">
      <div class="course-top">
        <div class="course-icon">${exam.icon}</div>
        <span class="course-badge">${exam.category}</span>
      </div>

      <h3>${exam.name}</h3>
      <p>${exam.description}</p>

      <div class="course-meta">
        <span>▣ ${exam.subjects}</span>
      </div>

      <button class="course-open" data-course="${exam.name}">
        Explore ${exam.name} <span>→</span>
      </button>
    </article>
  `).join("");

  observeRevealElements();
}

// Create school cards
function renderSchoolCourses() {
  if (!schoolGrid) return;

  const board = document.getElementById("boardFilter").value;
  const classValue = document.getElementById("classFilter").value;

  let courses = [];

  schoolBoards.forEach(boardName => {
    schoolClasses.forEach(className => {
      courses.push({
        board: boardName,
        className
      });
    });
  });

  courses = courses.filter(course => {
    const boardMatches = board === "all" || course.board === board;
    const classMatches = classValue === "all" || course.className === classValue;
    return boardMatches && classMatches;
  });

  if (courses.length === 0) {
    schoolGrid.innerHTML = `<div class="school-empty">No courses found.</div>`;
    return;
  }

  schoolGrid.innerHTML = courses.map((course, index) => `
    <article class="school-card reveal" style="transition-delay:${(index % 6) * 50}ms">
      <div class="course-top">
        <div class="course-icon">📚</div>
        <span class="course-badge">SCHOOL EDUCATION</span>
      </div>

      <h3>Class ${course.className}</h3>
      <p>${course.board}</p>

      <div class="course-meta">
        <span>✓ Structured learning</span>
        <span>✓ Study resources</span>
      </div>

      <button class="course-open"
        data-board="${course.board}"
        data-class="${course.className}">
        Explore Class ${course.className} →
      </button>
    </article>
  `).join("");

  observeRevealElements();
}

// Course selection
function handleCourseSelection(event) {
  const examButton = event.target.closest("[data-course]");
  const schoolButton = event.target.closest("[data-board]");

  if (examButton) {
    const exam = examButton.dataset.course;
    showCourseMessage(exam);
  }

  if (schoolButton) {
    const board = schoolButton.dataset.board;
    const className = schoolButton.dataset.class;
    showCourseMessage(`${board} - Class ${className}`);
  }
}

function showCourseMessage(courseName) {
  alert(
    `${courseName}\n\nYour course has been selected.\n\nThe next step is to connect this course card to your STUDYVERSE AI learning dashboard and Supabase course database.`
  );
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

// Header scroll effect and back-to-top
const header = document.getElementById("header");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 30);
  }

  if (backToTop) {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  }
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scroll reveal animations
let revealObserver;

function observeRevealElements() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach(element => {
      element.classList.add("visible");
    });
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });
  }

  document.querySelectorAll(".reveal:not(.visible)").forEach(element => {
    revealObserver.observe(element);
  });
}

// Animated statistics
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = Number(counter.dataset.count);
      const duration = 1200;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        counter.textContent = Math.round(target * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
      observer.unobserve(counter);
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
}

// Authentication modal
const authModal = document.getElementById("authModal");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const footerLogin = document.getElementById("footerLogin");
const footerSignup = document.getElementById("footerSignup");
const modalClose = document.getElementById("modalClose");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const authForm = document.getElementById("authForm");
const authSubmit = document.getElementById("authSubmit");
const modalMessage = document.getElementById("modalMessage");
const switchAuth = document.getElementById("switchAuth");
const modalSwitch = document.getElementById("modalSwitch");
const studentName = document.getElementById("studentName");
const nameLabel = document.getElementById("nameLabel");

let authMode = "login";

function openAuthModal(mode = "login") {
  if (!authModal) return;

  authMode = mode;
  updateAuthModal();

  authModal.classList.add("show");
  authModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeAuthModal() {
  if (!authModal) return;

  authModal.classList.remove("show");
  authModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function updateAuthModal() {
  const isSignup = authMode === "signup";

  modalTitle.textContent = isSignup
    ? "Create your account"
    : "Welcome to STUDYVERSE";

  modalDescription.textContent = isSignup
    ? "Start your learning journey today."
    : "Continue your learning journey.";

  authSubmit.textContent = isSignup
    ? "Create Account"
    : "Login";

  studentName.hidden = !isSignup;
  nameLabel.hidden = !isSignup;
  studentName.required = isSignup;

  modalSwitch.innerHTML = isSignup
    ? 'Already have an account? <button type="button" id="switchAuth">Login</button>'
    : 'New here? <button type="button" id="switchAuth">Create an account</button>';

  document.getElementById("switchAuth").addEventListener("click", () => {
    authMode = isSignup ? "login" : "signup";
    modalMessage.textContent = "";
    updateAuthModal();
  });
}

[loginButton, footerLogin].forEach(button => {
  if (button) {
    button.addEventListener("click", event => {
      event.preventDefault();
      openAuthModal("login");
    });
  }
});

[signupButton, footerSignup].forEach(button => {
  if (button) {
    button.addEventListener("click", event => {
      event.preventDefault();
      openAuthModal("signup");
    });
  }
});

[modalClose, modalBackdrop].forEach(button => {
  if (button) button.addEventListener("click", closeAuthModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeAuthModal();
});

// Demo form only. This does NOT create a real account.
if (authForm) {
  authForm.addEventListener("submit", event => {
    event.preventDefault();

    modalMessage.textContent = "";

    if (!authForm.reportValidity()) return;

    modalMessage.style.color = "#ffb5b5";
    modalMessage.textContent =
      "Demo only: connect Supabase Authentication to enable real login and registration.";
  });
}

// Active navigation links
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  }, {
    rootMargin: "-30% 0px -60% 0px"
  });

  sections.forEach(section => sectionObserver.observe(section));
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
  renderEntranceExams();
  renderSchoolCourses();

  document.getElementById("boardFilter")
    .addEventListener("change", renderSchoolCourses);

  document.getElementById("classFilter")
    .addEventListener("change", renderSchoolCourses);

  examGrid.addEventListener("click", handleCourseSelection);
  schoolGrid.addEventListener("click", handleCourseSelection);

  document.getElementById("currentYear").textContent =
    new Date().getFullYear();

  observeRevealElements();
  animateCounters();
});
