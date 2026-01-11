"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations
  AOS.init({
    once: true,
  });

  // Initialize skill bars
  initSkillBars();

  // Initialize contact form
  initContactForm();

  const nav = document.querySelector("#nav");
  const navBtn = document.querySelector("#nav-btn");
  const navBtnImg = document.querySelector("#nav-btn-img");

  // Hamburger menu
  if (navBtn) {
    navBtn.onclick = () => {
      if (nav.classList.toggle("open")) {
        navBtnImg.src = "img/icons/close.svg";
      } else {
        navBtnImg.src = "img/icons/open.svg";
      }
    };
  }

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        navBtnImg.src = "img/icons/open.svg";
      }
    });
  });

  // Sticky header and go to top button
  const goToTop = document.querySelector("#goToTop");

  window.addEventListener("scroll", function () {
    const header = document.querySelector("#header");
    const hero = document.querySelector("#home");
    let triggerHeight = hero ? hero.offsetHeight - 170 : 300;

    if (window.scrollY > triggerHeight) {
      header.classList.add("header-sticky");
      if (goToTop) goToTop.classList.add("reveal");
    } else {
      header.classList.remove("header-sticky");
      if (goToTop) goToTop.classList.remove("reveal");
    }
  });

  // Active navigation highlighting
  let sections = document.querySelectorAll("section");

  window.onscroll = () => {
    sections.forEach((sec) => {
      let top = window.scrollY;
      let offset = sec.offsetTop - 170;
      let height = sec.offsetHeight;
      let id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((links) => {
          links.classList.remove("active");
          const activeLink = document.querySelector(
            'header nav a[href*="' + id + '"]'
          );
          if (activeLink) activeLink.classList.add("active");
        });
      }
    });
  };
});

// Skill bars animation
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar__fill");

  const animateSkillBars = () => {
    skillBars.forEach((bar) => {
      const progress = bar.getAttribute("data-progress");
      bar.style.width = progress + "%";
    });
  };

  // Use Intersection Observer for skill bars
  const skillsSection = document.querySelector(".about-skills");
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(skillsSection);
  }
}

// Contact form handling
function initContactForm() {
  const form = document.querySelector(".contactForm");
  const response = document.querySelector(".response");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // For GitHub Pages (static), we'll show a message
      // In production, you'd send this to a backend or service like Formspree
      if (response) {
        response.innerHTML =
          '<p style="color: var(--secondary-accent);">Thanks for your message! This is a static site demo - connect a form service like Formspree for actual submissions.</p>';
        response.style.display = "block";
      }

      // Reset form
      form.reset();
    });
  }
}
