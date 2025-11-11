import React, { useState, useEffect } from 'react'
// We'll import the loader styles from global.css
// since it's defined in style.css

function Loader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Check if the user has visited before
    const hasVisited = sessionStorage.getItem('hasVisitedIndex')

    if (hasVisited) {
      setIsVisible(false)
    } else {
      // First visit: set flag and start fade-out timer
      sessionStorage.setItem('hasVisitedIndex', 'true')

      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 1500) // Show loader for 1.5 seconds

      // Cleanup function to clear the timer if the component unmounts
      return () => clearTimeout(timer)
    }
  }, []) // Empty dependency array [] means this runs only once on mount

  if (!isVisible) {
    return null // Don't render anything if not visible
  }

  // Apply the fade-out class 0.5s before the end
  // Or, for simplicity, we can just rely on the visibility.
  // Let's add the fade-out class based on a second state.

  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedIndex')
    if (hasVisited) {
      setIsVisible(false)
      return
    }

    sessionStorage.setItem('hasVisitedIndex', 'true')

    const fadeTimer = setTimeout(() => {
      setIsFading(true) // Start fading
    }, 1500) // Start fade after 1.5s

    const removeTimer = setTimeout(() => {
      setIsVisible(false) // Remove from DOM after fade
    }, 2000) // 1.5s + 0.5s fade

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <div
      id="loader-container"
      className={isFading ? 'fade-out' : ''}
    >
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
      <div className="loader-text">
        {' '}
        by{' '}
        <h1>
          <span style={{ color: '#0080FF' }}>ar</span>
          <span style={{ color: '#40C4FF' }}>TIC</span>
          <span style={{ color: '#0080FF' }}>ode</span>
        </h1>
      </div>
    </div>
  )
}

export default Loader