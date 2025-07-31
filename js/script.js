// Mobile Navigation Toggle
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Dark Theme Toggle
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")
const body = document.body

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light"

// Apply the saved theme on page load
if (currentTheme === "dark") {
  body.setAttribute("data-theme", "dark")
  themeIcon.classList.remove("fa-moon")
  themeIcon.classList.add("fa-sun")
}

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme")

  if (currentTheme === "dark") {
    // Switch to light theme
    body.setAttribute("data-theme", "light")
    themeIcon.classList.remove("fa-sun")
    themeIcon.classList.add("fa-moon")
    localStorage.setItem("theme", "light")

    // Add a subtle animation
    themeToggle.style.transform = "rotate(360deg)"
    setTimeout(() => {
      themeToggle.style.transform = "rotate(0deg)"
    }, 300)
  } else {
    // Switch to dark theme
    body.setAttribute("data-theme", "dark")
    themeIcon.classList.remove("fa-moon")
    themeIcon.classList.add("fa-sun")
    localStorage.setItem("theme", "dark")

    // Add a subtle animation
    themeToggle.style.transform = "rotate(-360deg)"
    setTimeout(() => {
      themeToggle.style.transform = "rotate(0deg)"
    }, 300)
  }
})

// Add keyboard support for theme toggle
themeToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault()
    themeToggle.click()
  }
})

// Navbar scroll effect
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const fadeinObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll(
  ".service-card, .value-item, .contact-item, .about-text, .about-values",
)
animateElements.forEach((el) => {
  el.classList.add("fade-in")
  fadeinObserver.observe(el)
})

// Contact form handling (non-functional, just for demonstration)
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const phone = formData.get("phone")
  const service = formData.get("service")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !service || !message) {
    alert("Please fill in all required fields.")
    return
  }

  // Simulate form submission
  const submitButton = contactForm.querySelector('button[type="submit"]')
  const originalText = submitButton.textContent

  submitButton.textContent = "Sending..."
  submitButton.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.")
    contactForm.reset()
    submitButton.textContent = originalText
    submitButton.disabled = false
  }, 2000)
})

// Add hover effects to service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Add click effect to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  const heroCard = document.querySelector(".hero-card")

  if (hero && heroCard) {
    const rate = scrolled * -0.5
    heroCard.style.transform = `translateY(${rate}px) rotate(5deg)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Animate hero elements
  const heroTitle = document.querySelector(".hero-title")
  const heroSubtitle = document.querySelector(".hero-subtitle")
  const heroButtons = document.querySelector(".hero-buttons")

  if (heroTitle) heroTitle.style.animation = "slideInLeft 1s ease-out"
  if (heroSubtitle) heroSubtitle.style.animation = "slideInLeft 1s ease-out 0.2s both"
  if (heroButtons) heroButtons.style.animation = "slideInLeft 1s ease-out 0.4s both"
})

// Add scroll progress indicator
const scrollProgress = document.createElement("div")
scrollProgress.style.cssText = `
    position: fixed;
    top: 70px;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    z-index: 1000;
    transition: width 0.1s ease;
`
document.body.appendChild(scrollProgress)

// Update progress bar color based on theme
function updateProgressBarTheme() {
  const currentTheme = document.body.getAttribute("data-theme")
  if (currentTheme === "dark") {
    scrollProgress.style.background = "linear-gradient(90deg, #3b82f6, #fbbf24)"
  } else {
    scrollProgress.style.background = "linear-gradient(90deg, #2563eb, #fbbf24)"
  }
}

// Call on theme change
const themeObserver = new MutationObserver(updateProgressBarTheme)
themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] })

// Initial call
updateProgressBarTheme()

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50)
    }, 500)
  }
})
