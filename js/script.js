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

// Dark Theme Toggle with Enhanced Smooth Transitions
const themeToggle = document.getElementById("theme-toggle")
const themeIcon = document.getElementById("theme-icon")

// Initialize theme on page load
let isDarkTheme = localStorage.getItem("theme") === "dark"

function setTheme(dark) {
  console.log("Setting theme to:", dark ? "dark" : "light")

  // Add transition class to body for smooth theme change
  document.body.classList.add("theme-transitioning")

  if (dark) {
    document.body.setAttribute("data-theme", "dark")
    themeIcon.className = "fas fa-sun"
    localStorage.setItem("theme", "dark")
  } else {
    document.body.removeAttribute("data-theme")
    themeIcon.className = "fas fa-moon"
    localStorage.setItem("theme", "light")
  }

  isDarkTheme = dark

  // Remove transition class after animation completes
  setTimeout(() => {
    document.body.classList.remove("theme-transitioning")
  }, 600)

  // Update progress bar theme
  updateProgressBarTheme()

  // Update spark colors smoothly
  updateSparkColors()
}

// Apply saved theme immediately
setTheme(isDarkTheme)

// Theme toggle click handler with enhanced animation
themeToggle.addEventListener("click", () => {
  console.log("Theme toggle clicked. Current:", isDarkTheme ? "dark" : "light")

  // Disable button temporarily to prevent rapid clicking
  themeToggle.disabled = true

  // Toggle theme
  setTheme(!isDarkTheme)

  // Enhanced rotation animation with bounce effect
  themeToggle.style.transform = isDarkTheme ? "rotate(-720deg) scale(1.2)" : "rotate(720deg) scale(1.2)"
  themeToggle.style.transition = "transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)"

  // Reset animation and re-enable button
  setTimeout(() => {
    themeToggle.style.transform = "rotate(0deg) scale(1)"
    themeToggle.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    themeToggle.disabled = false
  }, 600)

  console.log("Theme changed to:", isDarkTheme ? "dark" : "light")
})

// Update spark colors based on theme
function updateSparkColors() {
  const sparks = document.querySelectorAll(".spark")
  sparks.forEach((spark) => {
    spark.style.transition = "box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
  })
}

// Enhanced electrical sparks animation with more dynamic effects
function createAdditionalSparks() {
  const sparksContainer = document.querySelector(".electrical-sparks")
  if (!sparksContainer) return

  // Create additional random sparks with enhanced visibility and animations
  for (let i = 7; i <= 20; i++) {
    const spark = document.createElement("div")
    spark.className = `spark spark-${i}`

    // Random positioning
    spark.style.top = Math.random() * 100 + "%"
    spark.style.left = Math.random() * 100 + "%"

    // Dynamic animation properties
    const duration = Math.random() * 3 + 2 // 2-5 seconds
    const delay = Math.random() * 4 // 0-4 seconds delay

    spark.style.animationDuration = duration + "s"
    spark.style.animationDelay = delay + "s"
    spark.style.animation = `sparkle ${duration}s infinite ease-in-out`
    spark.style.animationDelay = delay + "s"

    // Add random scale for variety
    const scale = Math.random() * 0.8 + 0.6 // 0.6-1.4 scale
    spark.style.transform = `scale(${scale})`

    sparksContainer.appendChild(spark)
  }

  // Create moving sparks that travel across the screen
  createMovingSparks()
}

// Create sparks that move across the screen
function createMovingSparks() {
  const sparksContainer = document.querySelector(".electrical-sparks")
  if (!sparksContainer) return

  for (let i = 21; i <= 25; i++) {
    const movingSpark = document.createElement("div")
    movingSpark.className = `spark moving-spark-${i}`

    // Start from random edge
    const startSide = Math.floor(Math.random() * 4) // 0-3 for top, right, bottom, left
    let startX, startY, endX, endY

    switch (startSide) {
      case 0: // Top
        startX = Math.random() * 100
        startY = -5
        endX = Math.random() * 100
        endY = 105
        break
      case 1: // Right
        startX = 105
        startY = Math.random() * 100
        endX = -5
        endY = Math.random() * 100
        break
      case 2: // Bottom
        startX = Math.random() * 100
        startY = 105
        endX = Math.random() * 100
        endY = -5
        break
      case 3: // Left
        startX = -5
        startY = Math.random() * 100
        endX = 105
        endY = Math.random() * 100
        break
    }

    movingSpark.style.left = startX + "%"
    movingSpark.style.top = startY + "%"

    // Create keyframe animation for movement
    const animationName = `moveSpark${i}`
    const duration = Math.random() * 8 + 6 // 6-14 seconds
    const delay = Math.random() * 5 // 0-5 seconds delay

    const keyframes = `
      @keyframes ${animationName} {
        0% {
          left: ${startX}%;
          top: ${startY}%;
          opacity: 0;
          transform: scale(0);
        }
        10% {
          opacity: 1;
          transform: scale(1);
        }
        90% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          left: ${endX}%;
          top: ${endY}%;
          opacity: 0;
          transform: scale(0);
        }
      }
    `

    // Add keyframes to stylesheet
    const style = document.createElement("style")
    style.textContent = keyframes
    document.head.appendChild(style)

    movingSpark.style.animation = `${animationName} ${duration}s infinite linear`
    movingSpark.style.animationDelay = delay + "s"

    sparksContainer.appendChild(movingSpark)
  }
}

// Initialize additional sparks after page load
window.addEventListener("load", () => {
  setTimeout(createAdditionalSparks, 1000)
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

// Enhanced scroll progress with theme awareness
function updateProgressBarTheme() {
  const scrollProgress = document.querySelector(".scroll-progress")
  if (scrollProgress) {
    if (isDarkTheme) {
      scrollProgress.style.background = "linear-gradient(90deg, #60a5fa, #fbbf24)"
    } else {
      scrollProgress.style.background = "linear-gradient(90deg, #2563eb, #fbbf24)"
    }
  }
}

// Create enhanced scroll progress bar
const scrollProgress = document.createElement("div")
scrollProgress.className = "scroll-progress"
scrollProgress.style.cssText = `
    position: fixed;
    top: 70px;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #fbbf24);
    z-index: 1000;
    transition: width 0.1s ease, background 0.3s ease;
`
document.body.appendChild(scrollProgress)

// Update progress bar on scroll
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.body.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.style.width = scrollPercent + "%"
})

// Initial call
updateProgressBarTheme()

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

// Mobile Performance Optimizations
const isMobile = window.innerWidth <= 768
const isLowEndDevice = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2

// Debounce function for performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Optimized scroll handler
const optimizedScrollHandler = throttle(
  () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Update progress bar
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    const progressBar = document.querySelector(".scroll-progress")
    if (progressBar) {
      progressBar.style.width = scrollPercent + "%"
    }
  },
  isMobile ? 100 : 16,
)

// Replace scroll event listener
window.removeEventListener("scroll", () => {}) // Remove existing
window.addEventListener("scroll", optimizedScrollHandler, { passive: true })

// Optimized intersection observer for mobile
const mobileObserverOptions = {
  threshold: isMobile ? 0.05 : 0.1,
  rootMargin: isMobile ? "0px 0px -20px 0px" : "0px 0px -50px 0px",
}

// Lazy loading for images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Optimize animations based on device capability - Keep sparks visible
function optimizeAnimations() {
  if (isMobile || isLowEndDevice) {
    // Disable complex animations but keep sparks
    document.documentElement.style.setProperty("--animation-duration", "0.2s")

    // Remove parallax effects
    window.removeEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const heroCard = document.querySelector(".hero-card")
      if (heroCard) {
        heroCard.style.transform = `translateY(${scrolled * -0.5}px) rotate(5deg)`
      }
    })

    // Keep electrical sparks visible on mobile
    const sparks = document.querySelector(".electrical-sparks")
    if (sparks) {
      sparks.style.display = "block" // Keep visible
    }
  }
}

// Optimize form interactions for mobile
function optimizeMobileForm() {
  const formInputs = document.querySelectorAll("input, textarea, select")

  formInputs.forEach((input) => {
    // Prevent zoom on iOS
    if (input.type !== "file") {
      input.style.fontSize = "16px"
    }

    // Optimize focus handling
    input.addEventListener(
      "focus",
      () => {
        if (isMobile) {
          setTimeout(() => {
            input.scrollIntoView({ behavior: "smooth", block: "center" })
          }, 300)
        }
      },
      { passive: true },
    )
  })
}

// Preload critical resources
function preloadCriticalResources() {
  // Preload fonts
  const fontLink = document.createElement("link")
  fontLink.rel = "preload"
  fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  fontLink.as = "style"
  document.head.appendChild(fontLink)

  // Preload logo
  const logoImg = new Image()
  logoImg.src = "images/logo.jpg"
}

// Optimize touch interactions
function optimizeTouchInteractions() {
  // Add touch-friendly button sizes
  const buttons = document.querySelectorAll(".btn, .theme-toggle, .nav-toggle")
  buttons.forEach((button) => {
    button.style.minHeight = "44px"
    button.style.minWidth = "44px"
  })

  // Optimize touch feedback
  document.addEventListener("touchstart", () => {}, { passive: true })
}

// Memory management
function cleanupUnusedElements() {
  if (isMobile) {
    // Remove unused animations
    const unusedAnimations = document.querySelectorAll(".spark")
    unusedAnimations.forEach((el) => el.remove())

    // Cleanup event listeners on invisible elements
    const hiddenElements = document.querySelectorAll('[style*="display: none"]')
    hiddenElements.forEach((el) => {
      el.replaceWith(el.cloneNode(true))
    })
  }
}

// Reduce JavaScript execution on mobile
function conditionalFeatureLoading() {
  if (!isMobile && !isLowEndDevice) {
    // Load full features for desktop
    createAdditionalSparks()

    // Full animation suite
    document.querySelectorAll(".service-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })
    })
  } else {
    // Minimal features for mobile
    console.log("Mobile optimizations active")
  }
}

// Network-aware loading
function networkAwareOptimizations() {
  if ("connection" in navigator) {
    const connection = navigator.connection

    if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
      // Ultra-light mode for slow connections
      document.documentElement.classList.add("slow-connection")

      // Disable all animations
      const style = document.createElement("style")
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `
      document.head.appendChild(style)
    }
  }
}

// Initialize optimizations
document.addEventListener("DOMContentLoaded", () => {
  optimizeAnimations()
  optimizeMobileForm()
  preloadCriticalResources()
  optimizeTouchInteractions()
  cleanupUnusedElements()
  conditionalFeatureLoading()
  networkAwareOptimizations()
  lazyLoadImages()
})

// Optimize resize handling
const optimizedResizeHandler = debounce(() => {
  // Update mobile detection
  const newIsMobile = window.innerWidth <= 768
  if (newIsMobile !== isMobile) {
    location.reload() // Reload to apply mobile optimizations
  }
}, 250)

window.addEventListener("resize", optimizedResizeHandler, { passive: true })

// Service Worker registration for caching
if ("serviceWorker" in navigator && !isMobile) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Optimize contact form for mobile
const mobileOptimizedContactForm = document.getElementById("contact-form")
if (mobileOptimizedContactForm) {
  mobileOptimizedContactForm.addEventListener(
    "submit",
    debounce((e) => {
      e.preventDefault()

      const formData = new FormData(mobileOptimizedContactForm)
      const name = formData.get("name")
      const email = formData.get("email")
      const service = formData.get("service")
      const message = formData.get("message")

      if (!name || !email || !service || !message) {
        // Use native mobile alert for better UX
        if (isMobile) {
          const missingFields = []
          if (!name) missingFields.push("Name")
          if (!email) missingFields.push("Email")
          if (!service) missingFields.push("Service")
          if (!message) missingFields.push("Message")

          alert(`Please fill in: ${missingFields.join(", ")}`)
        } else {
          alert("Please fill in all required fields.")
        }
        return
      }

      const submitButton = mobileOptimizedContactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent

      submitButton.textContent = "Sending..."
      submitButton.disabled = true

      // Faster feedback for mobile
      const timeout = isMobile ? 1500 : 2000

      setTimeout(() => {
        alert("Thank you! We'll contact you soon.")
        mobileOptimizedContactForm.reset()
        submitButton.textContent = originalText
        submitButton.disabled = false
      }, timeout)
    }, 500),
  )
}

// Battery API optimization
if ("getBattery" in navigator) {
  navigator.getBattery().then((battery) => {
    if (battery.level < 0.2) {
      // Ultra power saving mode
      document.documentElement.classList.add("power-save")

      // Disable all animations
      const powerSaveStyle = document.createElement("style")
      powerSaveStyle.textContent = `
        .power-save * {
          animation: none !important;
          transition: none !important;
        }
        .power-save .electrical-sparks {
          display: none !important;
        }
      `
      document.head.appendChild(powerSaveStyle)
    }
  })
}

// Add enhanced theme transition styles
const themeTransitionStyle = document.createElement("style")
themeTransitionStyle.textContent = `
  .theme-transitioning {
    transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
                color 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  .theme-transitioning * {
    transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
                border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  .theme-transitioning .spark {
    transition: box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  .theme-transitioning .hero {
    transition: background-image 0.7s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
`
document.head.appendChild(themeTransitionStyle)
