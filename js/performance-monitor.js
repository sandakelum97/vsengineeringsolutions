// Performance Monitoring for Mobile Optimization
class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.isMobile = window.innerWidth <= 768
    this.init()
  }

  init() {
    this.measurePageLoad()
    this.measureInteractionLatency()
    this.monitorMemoryUsage()
    this.trackNetworkConditions()
  }

  measurePageLoad() {
    window.addEventListener("load", () => {
      const perfData = performance.getEntriesByType("navigation")[0]

      this.metrics.pageLoad = {
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
        loadComplete: perfData.loadEventEnd - perfData.loadEventStart,
        totalTime: perfData.loadEventEnd - perfData.fetchStart,
      }

      // Log performance issues
      if (this.metrics.pageLoad.totalTime > 3000) {
        console.warn("Slow page load detected:", this.metrics.pageLoad.totalTime + "ms")
        this.enableUltraLightMode()
      }
    })
  }

  measureInteractionLatency() {
    let interactionStart = 0

    document.addEventListener(
      "touchstart",
      () => {
        interactionStart = performance.now()
      },
      { passive: true },
    )

    document.addEventListener(
      "touchend",
      () => {
        if (interactionStart) {
          const latency = performance.now() - interactionStart
          this.metrics.touchLatency = latency

          if (latency > 100) {
            console.warn("High touch latency:", latency + "ms")
          }
        }
      },
      { passive: true },
    )
  }

  monitorMemoryUsage() {
    if ("memory" in performance) {
      const memory = performance.memory

      this.metrics.memory = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      }

      // Check for memory pressure
      const memoryUsagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100

      if (memoryUsagePercent > 80) {
        console.warn("High memory usage detected:", memoryUsagePercent + "%")
        this.enableMemoryOptimizations()
      }
    }
  }

  trackNetworkConditions() {
    if ("connection" in navigator) {
      const connection = navigator.connection

      this.metrics.network = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
      }

      // Adjust optimizations based on network
      if (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g") {
        this.enableDataSaverMode()
      }
    }
  }

  enableUltraLightMode() {
    document.documentElement.classList.add("ultra-light-mode")

    // Disable all non-essential features
    const sparks = document.querySelector(".electrical-sparks")
    if (sparks) sparks.remove()

    // Simplify animations
    const style = document.createElement("style")
    style.textContent = `
      .ultra-light-mode * {
        animation: none !important;
        transition: none !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }
    `
    document.head.appendChild(style)
  }

  enableMemoryOptimizations() {
    // Remove unused DOM elements
    const unusedElements = document.querySelectorAll(".fade-in:not(.visible)")
    unusedElements.forEach((el) => {
      if (!el.getBoundingClientRect().top < window.innerHeight) {
        el.style.display = "none"
      }
    })

    // Cleanup event listeners
    this.cleanupEventListeners()
  }

  enableDataSaverMode() {
    document.documentElement.classList.add("data-saver")

    // Disable background images
    const style = document.createElement("style")
    style.textContent = `
      .data-saver .hero::before {
        display: none !important;
      }
      .data-saver .electrical-sparks {
        display: none !important;
      }
    `
    document.head.appendChild(style)
  }

  cleanupEventListeners() {
    // Remove hover effects on mobile
    if (this.isMobile) {
      const cards = document.querySelectorAll(".service-card")
      cards.forEach((card) => {
        const newCard = card.cloneNode(true)
        card.parentNode.replaceChild(newCard, card)
      })
    }
  }

  getMetrics() {
    return this.metrics
  }
}

// Initialize performance monitoring
if (typeof window !== "undefined") {
  window.performanceMonitor = new PerformanceMonitor()
}
