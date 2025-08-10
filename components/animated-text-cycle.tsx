"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AnimatedTextCycleProps {
  words: string[]
  interval?: number
  className?: string
}

export function AnimatedTextCycle({ words, interval = 3000, className = "" }: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState("auto")
  const measureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children
      let maxWidth = 0

      // Measure all elements to find the maximum width
      for (let i = 0; i < elements.length; i++) {
        const elementWidth = elements[i].getBoundingClientRect().width
        if (elementWidth > maxWidth) {
          maxWidth = elementWidth
        }
      }

      setWidth(`${maxWidth + 10}px`) // Add small buffer for safety
    }
  }, [words]) // Remove currentIndex dependency to prevent constant recalculation

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, interval)

    return () => clearInterval(timer)
  }, [interval, words.length])

  const containerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  return (
    <>
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={`font-bold ${className}`}>
            {word}
          </span>
        ))}
      </div>
      <motion.span
        className="relative inline-block"
        animate={{
          width,
          minWidth: width, // Add minimum width
          transition: {
            type: "spring",
            stiffness: 200, // Increase stiffness for snappier animation
            damping: 20,
            mass: 1,
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block font-bold ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              whiteSpace: "nowrap",
              width: "100%",
              textAlign: "center", // Center align the text
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  )
}
