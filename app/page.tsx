"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedTextCycle } from "@/components/animated-text-cycle"
import {
  Globe,
  ArrowRight,
  Check,
  Twitter,
  Linkedin,
  Mail,
  Code,
  TestTube,
  Rocket,
  BarChart3,
  Clock,
  TrendingUp,
  Star,
  Users,
  Zap,
  Shield,
  Bell,
  Sparkles,
} from "lucide-react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [, setScrollY] = useState(0)
  const lastScrollYRef = useRef(0)
  const [navHidden, setNavHidden] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrollY(currentY)
      const isScrollingDown = currentY > lastScrollYRef.current
      if (isScrollingDown && currentY > 80) {
        setNavHidden(true)
      } else {
        setNavHidden(false)
      }
      lastScrollYRef.current = currentY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const missionImages = [
    "pexels-ameer-umar-325092707-15079520.jpg",
    "pexels-artsysolomon-1108822.jpg",
    "pexels-bestbe-models-975242-2170387.jpg",
    "pexels-cottonbro-6878716.jpg",
    "pexels-diimejii-2379886.jpg",
    "pexels-ilabappa-19589314.jpg",
    "pexels-jairo-david-arboleda-621072-1432238.jpg",
    "pexels-jopwell-2422278.jpg",
    "pexels-rowlandzy-231473-15542283.jpg",
    "pexels-safari-consoler-3290243-29004157.jpg",
    "pexels-serdi-16767210.jpg",
    "pexels-serdi-17297809.jpg",
    "pexels-thatguycraig000-1670045.jpg",
    "pexels-thomas-chauke-437438-3207532.jpg",
    "pexels-topeasokere-5789327.jpg",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would typically send the email to your backend
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 grid-background">
      {/* Navigation */}
      <motion.nav
        initial={false}
        animate={{ y: navHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 w-full bg-gray-50/90 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-24">
            <div className="flex items-center">
              <Image
                src="/logo_boboyii.png"
                alt="Boboyii logo"
                width={560}
                height={140}
                className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto"
                priority
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("problem")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Problem
              </button>
              <button
                onClick={() => scrollToSection("solution")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Solution
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("waitlist")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight tracking-tight text-gray-900 max-w-5xl mx-auto">
              <div className="mb-2">Supercharge Your</div>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-2 md:gap-4 min-h-[1.2em]">
                  <AnimatedTextCycle
                    words={["Call Operations", "Customer Service", "Business Growth", "Voice AI"]}
                    interval={3000}
                    className="gradient-text text-4xl md:text-6xl"
                  />
                </div>
                <div className="mt-2">with AI for Africa</div>
              </div>
            </h1>

            <p className="text-base md:text-lg text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed font-body">
              Transform your call center operations with AI-powered voice agents that speak African languages and
              understand local contexts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection("waitlist")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl pulse-glow"
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("solution")}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-lg transition-all duration-300"
                >
                  See Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="h-6 w-6 text-gray-500" />
        </motion.div> */}
      </section>

      {/* Problem Statement */}
      <section id="problem" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-gray-900">
              Call Center Challenges in Africa
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-body">
              African businesses struggle with expensive call operations, language barriers, and limited availability
              that hurt customer satisfaction and growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">High Operational Costs</h3>
                    <p className="text-gray-600">
                      Traditional call centers require expensive infrastructure, training, and 24/7 staffing that drain
                      business resources.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Language & Cultural Barriers</h3>
                    <p className="text-gray-600">
                      Customers can&apos;t communicate effectively in their native languages, leading to frustration and lost
                      business opportunities.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Limited Availability</h3>
                    <p className="text-gray-600">
                      Business hours restrictions and agent availability issues result in missed calls and poor customer
                      experience.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Inconsistent Service Quality</h3>
                    <p className="text-gray-600">
                      Human agents have varying skill levels and emotional states, leading to unpredictable customer
                      experiences.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200">
                <div className="text-center space-y-6">
                  <div className="text-6xl font-bold text-red-600 mb-4">85%</div>
                  <div className="text-lg text-gray-700">of African businesses struggle with call operations</div>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">$50K+</div>
                      <div className="text-sm text-gray-600">Annual call center costs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">40%</div>
                      <div className="text-sm text-gray-600">Missed calls daily</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Solution */}
      <section id="solution" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-gray-900">
              Revolutionary Call AI Solution
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto font-body">
              Boboyii transforms your call operations with intelligent voice AI agents that handle customer calls in
              African languages, 24/7.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Multilingual Call Handling Card */}
            <motion.div className="group relative" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-500 shadow-lg hover:shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon Container */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Globe className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl blur opacity-20"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-gray-900">Multilingual Call Handling</h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent mx-auto"></div>
                      <p className="text-gray-600 leading-relaxed text-base">
                        Handle customer calls in 20+ African languages with perfect pronunciation and cultural
                        understanding.
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="w-full pt-4 border-t border-gray-200">
                      <ul className="space-y-2 text-sm text-gray-500">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Native language support</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Cultural context awareness</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Accent recognition</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* 24/7 Availability Card */}
            <motion.div className="group relative" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-500 shadow-lg hover:shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon Container */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Clock className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl blur opacity-20"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-gray-900">24/7 Availability</h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent mx-auto"></div>
                      <p className="text-gray-600 leading-relaxed text-base">
                        Never miss a call again. Your AI agents work around the clock, handling unlimited concurrent
                        calls.
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="w-full pt-4 border-t border-gray-200">
                      <ul className="space-y-2 text-sm text-gray-500">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Unlimited concurrent calls</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>No holidays or sick days</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Instant response time</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cost Efficiency Card */}
            <motion.div className="group relative" whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-500 shadow-lg hover:shadow-xl backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-6">
                    {/* Icon Container */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl blur opacity-20"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-gray-900">90% Cost Reduction</h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent mx-auto"></div>
                      <p className="text-gray-600 leading-relaxed text-base">
                        Dramatically reduce operational costs while improving service quality and customer satisfaction.
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="w-full pt-4 border-t border-gray-200">
                      <ul className="space-y-2 text-sm text-gray-500">
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>No hiring or training costs</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Minimal infrastructure needed</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span>Pay-per-use pricing</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-700 font-body">
              Set up your AI call center in four simple steps and start handling calls immediately
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1: Build */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-500 shadow-lg hover:shadow-xl backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Step Number */}
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        01
                      </div>
                      <h3 className="text-xl font-semibold text-emerald-600">Build</h3>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-4">
                      <Code className="h-8 w-8 text-emerald-600" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Configure your AI call agent with custom scripts, knowledge base, and call flows using our
                      intuitive dashboard.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 2: Test */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-500 shadow-lg hover:shadow-xl backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Step Number */}
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        02
                      </div>
                      <h3 className="text-xl font-semibold text-emerald-600">Test</h3>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-4">
                      <TestTube className="h-8 w-8 text-emerald-600" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Test your call agent with simulated conversations in multiple African languages to ensure perfect
                      responses.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 3: Deploy */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-500 shadow-lg hover:shadow-xl backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Step Number */}
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        03
                      </div>
                      <h3 className="text-xl font-semibold text-emerald-600">Deploy</h3>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-4">
                      <Rocket className="h-8 w-8 text-emerald-600" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Connect your phone numbers and go live instantly. Your AI agents start handling calls immediately.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Step 4: Monitor */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/50 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="relative bg-white border border-gray-200 hover:border-emerald-300 transition-all duration-500 shadow-lg hover:shadow-xl backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Step Number */}
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
                        04
                      </div>
                      <h3 className="text-xl font-semibold text-emerald-600">Monitor</h3>
                    </div>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center mb-4">
                      <BarChart3 className="h-8 w-8 text-emerald-600" />
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Track call metrics, customer satisfaction, and agent performance through comprehensive analytics
                      dashboard.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curved Waitlist Section */}
      <section
        id="waitlist"
        className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 overflow-hidden py-20"
        style={{
          clipPath: "ellipse(100% 100% at 50% 0%)",
          marginBottom: "-60px",
          paddingBottom: "140px",
        }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            {/* Launch Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Bell className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Launching Soon</span>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight text-white">
              Be Among the First
            </h2>
            <p className="text-xl md:text-2xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed font-body">
              Join the exclusive waitlist and get early access to the future of African call center technology.
            </p>

            {/* Waitlist Form */}
            <div className="max-w-2xl mx-auto mb-12">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-emerald-200 focus:border-white focus:ring-white h-14 text-lg rounded-2xl"
                  required
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="submit"
                    className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-4 h-14 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isSubmitted}
                  >
                    {isSubmitted ? (
                      <>
                        <Check className="h-5 w-5 mr-2" />
                        Joined!
                      </>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Early Access Pricing</h3>
                <p className="text-emerald-100 text-sm">Get 50% off for the first 6 months</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Priority Support</h3>
                <p className="text-emerald-100 text-sm">Direct access to our founding team</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Beta Features</h3>
                <p className="text-emerald-100 text-sm">First to try new AI capabilities</p>
              </motion.div>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-emerald-100"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">100% Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">500+ Businesses Waiting</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span className="text-sm">No Spam, Ever</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="pt-28 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              {/* Launching Soon Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 mb-8"
              >
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-700 text-sm font-medium">Launching Soon</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 tracking-tight text-gray-900">
                Our <span className="text-emerald-600">Mission</span>
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8 font-body">
                To enable Voice AI to be easily integrated into businesses across Africa powering customer support,
                sales, onboarding, and operations with natural, local-sounding speech in African languages.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our technology captures the accents, tones, and rhythms of African languages to deliver delightful,
                human-like interactions that drive growth and loyalty.
              </p>

              {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection("waitlist")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Explore African Voices
                </Button>
              </motion.div> */}
            </motion.div>

            {/* Right side - Image grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 rounded-2xl overflow-hidden shadow-2xl">
                {missionImages.map((img, index) => (
                  <Image
                    key={img + index}
                    src={`/${img}`}
                    alt="African people and culture"
                    className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover rounded-md"
                    width={300}
                    height={200}
                    loading="lazy"
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight text-gray-900">
              Ready to Transform Your Call Operations?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-body max-w-3xl mx-auto">
              Don&apos;t let language barriers and high costs hold your business back. Join hundreds of African businesses
              preparing to revolutionize their customer service with AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => scrollToSection("waitlist")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl pulse-glow"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Join Waitlist Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("solution")}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-2xl transition-all duration-300"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-600"
            >
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-sm">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-emerald-600" />
                <span className="text-sm">5-Minute Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-emerald-600" />
                <span className="text-sm">No Long-term Contracts</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-600 text-sm">© 2025 Boboyii. All rights reserved.</div>

            {/* Links */}
            {/* <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                Privacy Policy
              </a>
            </div> */}

            {/* Social Icons */}
            <div className="flex space-x-3">
              <motion.a
                href="#"
                whileHover={{ y: -2 }}
                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/boboyiiapp/"
                whileHover={{ y: -2 }}
                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="https://x.com/boboyiiApp"
                whileHover={{ y: -2 }}
                className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
