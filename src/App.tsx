import { useState, useEffect } from 'react'
import { Sun, Moon, MapPin, Navigation, AlertTriangle, Shield, Zap, Clock, Volume2, ChevronDown, Loader, Droplets, Wind } from 'lucide-react'
import './App.css'
import Chatbot from './components/Chatbot'

interface Route {
  id: string
  name: string
  distance: number
  time: number
  heatRisk: number
  color: string
  description: string
}

interface UserMode {
  id: string
  name: string
  icon: string
}

export default function App() {
  const [isDark, setIsDark] = useState(false)
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [selectedMode, setSelectedMode] = useState<string>('pedestrian')
  const [showResults, setShowResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [expandedWhy, setExpandedWhy] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Set browser tab title
  useEffect(() => {
    document.title = 'ShadeNav - Heat Safe Routes'
  }, [])

  // Calculate heat risk based on selected mode
  const calculateHeatRisk = (baseRisk: number): number => {
    if (selectedMode === 'elderly') return Math.min(baseRisk + 15, 100)
    if (selectedMode === 'delivery') return Math.max(baseRisk - 10, 0)
    return baseRisk // pedestrian - no change
  }

  // Apply dark class to html element for full-screen dark mode
  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    if (newIsDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Header scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mock routes data
  const routes: Route[] = [
    {
      id: 'route-a',
      name: 'Route A - Highway Path',
      distance: 12.5,
      time: 18,
      heatRisk: 78,
      color: 'red',
      description: 'Direct route through main highways with minimal shade coverage.',
    },
    {
      id: 'route-b',
      name: 'Route B - Shaded Scenic (Recommended)',
      distance: 14.2,
      time: 22,
      heatRisk: 35,
      color: 'green',
      description: 'Longer route but passes through parks and tree-lined streets with excellent shade.',
    },
  ]

  const userModes: UserMode[] = [
    { id: 'pedestrian', name: 'Pedestrian', icon: '🚶' },
    { id: 'delivery', name: 'Delivery Rider', icon: '🚴' },
    { id: 'elderly', name: 'Elderly', icon: '👴' },
  ]

  const currentRoute = routes.find(r => r.id === selectedRoute) || routes[1]
  const adjustedHeatRisk = calculateHeatRisk(currentRoute.heatRisk)

  const handleFindRoute = () => {
    if (source && destination) {
      setIsLoading(true)
      // Simulate AI analysis (1-2 seconds)
      setTimeout(() => {
        setShowResults(true)
        setSelectedRoute('route-b')
        setIsLoading(false)
      }, 1500)
    }
  }

  const handleDemoMode = () => {
    setSource('Downtown Station')
    setDestination('Central Park')
    setIsLoading(true)
    setTimeout(() => {
      setShowResults(true)
      setSelectedRoute('route-b')
      setIsLoading(false)
    }, 1500)
  }

  const playAlert = () => {
    const utterance = new SpeechSynthesisUtterance('Warning: High heat zone ahead. Please drink water and find shade.')
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  const getRiskColor = (risk: number) => {
    if (risk > 70) return 'text-red-600 dark:text-red-400'
    if (risk > 40) return 'text-orange-500 dark:text-orange-400'
    return 'text-green-600 dark:text-green-400'
  }

  const getRiskBg = (risk: number) => {
    if (risk > 70) return 'bg-red-500/10 dark:bg-red-500/10 border-red-500/30 dark:border-red-500/50'
    if (risk > 40) return 'bg-orange-500/10 dark:bg-orange-500/10 border-orange-500/30 dark:border-orange-500/50'
    return 'bg-green-500/10 dark:bg-green-500/10 border-green-500/30 dark:border-green-500/50'
  }

  const getRiskLabel = (risk: number) => {
    if (risk > 70) return 'High Risk'
    if (risk > 40) return 'Medium Risk'
    return 'Low Risk'
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300 pt-20">
        {/* Header - Full Width */}
        <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-700/50 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-lg backdrop-blur-lg' : 'shadow-sm'}`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">ShadeNav</h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all hover:scale-110"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {!showResults ? (
            // Hero Section
            <section className="min-h-[70vh] flex items-center justify-center mb-8 relative overflow-hidden">
              {/* animated background blobs */}
              <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="hero-blob blob-a" />
                <div className="hero-blob blob-b" />
                <div className="hero-blob blob-c" />
              </div>
              <div className="text-center max-w-3xl mx-auto px-6 py-12">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/30 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">AI-powered routes that reduce heat exposure</span>
                </div>

                {/* Main Heading with Gradient */}
                <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight heading-glow">
                  <span className="text-white block">Navigate Smarter.</span>
                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent block mt-2 gradient-clip animate-textAppear">Travel Safer.</span>
                </h2>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-gray-400 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Don't just optimize for speed. Our climate-aware navigation protects you from dangerous urban heat islands by finding the coolest, most shaded paths.
                </p>

                {/* Search Form */}
                <div className="bg-slate-800 dark:bg-slate-700/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-4 border border-slate-700 dark:border-slate-600">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-orange-400" />
                      <input
                        type="text"
                        placeholder="From"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700 dark:bg-slate-800 border border-slate-600 dark:border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-400/30 focus:border-transparent hover:shadow-md transition-shadow"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-4 w-5 h-5 text-pink-400" />
                      <input
                        type="text"
                        placeholder="To"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-700 dark:bg-slate-800 border border-slate-600 dark:border-slate-500 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-pink-400/30 focus:border-transparent hover:shadow-md transition-shadow"
                      />
                    </div>
                  </div>

                  {/* Trust / Capabilities */}
                  <div className="flex items-center justify-center gap-6 text-sm text-slate-300">
                    <div className="flex items-center gap-2"><span>🌡️</span><span>Temperature aware</span></div>
                    <div className="flex items-center gap-2"><span>🌳</span><span>Shade optimized</span></div>
                    <div className="flex items-center gap-2"><span>⚠️</span><span>Risk alerts</span></div>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <button
                      onClick={handleFindRoute}
                      className="w-full py-4 text-lg font-bold rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white transform transition-all duration-200 shadow-lg hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Analyzing heat conditions...
                        </>
                      ) : (
                        <>
                          <Navigation className="w-5 h-5" />
                          Find Safest Route
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDemoMode}
                      className="w-full py-4 text-lg font-bold rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-all duration-200 border border-slate-600 flex items-center justify-center gap-2"
                    >
                      Try Demo
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            // Results Section
            <div className="space-y-8">
              {/* Back Button */}
              <button
                onClick={() => setShowResults(false)}
                className="flex items-center gap-2 text-orange-500 dark:text-orange-400 hover:underline mb-4 font-semibold transition-colors"
              >
                ← Back to Search
              </button>

              {/* Heat Risk Score Card */}
              <div className={`card-hover border-l-4 ${adjustedHeatRisk >= 50 ? 'border-l-red-500 bg-red-500/5 dark:bg-red-500/10' : 'border-l-green-500 bg-green-500/5 dark:bg-green-500/10'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Heat Risk Score</h2>
                  <Shield className={`w-8 h-8 ${getRiskColor(adjustedHeatRisk)}`} />
                </div>
                <div className="flex items-end gap-4">
                  <div>
                    <div className={`text-6xl font-bold ${getRiskColor(adjustedHeatRisk)}`}>
                      {adjustedHeatRisk}%
                    </div>
                    <p className={`text-lg font-semibold ${getRiskColor(adjustedHeatRisk)} mt-2`}>
                      {getRiskLabel(adjustedHeatRisk)}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ease-out ${
                          adjustedHeatRisk >= 50 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${adjustedHeatRisk}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">Heat Exposure</span>
                    </div>
                    <p className="text-sm font-bold text-blue-900 dark:text-blue-100">Reduced by 40%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">Feels Like</span>
                    </div>
                    <p className="text-sm font-bold text-cyan-900 dark:text-cyan-100">~4°C Cooler</p>
                  </div>
                </div>

                {/* Why This Route Expand */}
                <button
                  onClick={() => setExpandedWhy(!expandedWhy)}
                  className="w-full mt-4 p-3 flex items-center justify-between bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-all"
                >
                  <span className="font-semibold text-sm">Why is this safer?</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedWhy ? 'rotate-180' : ''}`} />
                </button>

                {expandedWhy && (
                  <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg space-y-2 animate-expandSlide">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🌳</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">15% more shaded roads</span> - Parks and tree-lined streets
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🛑</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">Avoids 2 major heat zones</span> - Industrial areas and open plazas
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">❄️</span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">~4°C lower exposure</span> - Shade reduces perceived temperature
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* User Mode Selector */}
              <div className="card dark:bg-slate-800/50 dark:border dark:border-slate-700">
                <h3 className="text-lg font-bold mb-4">Travel Mode</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select your travel profile to adjust heat sensitivity</p>
                <div className="grid grid-cols-3 gap-4">
                  {userModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedMode === mode.id
                          ? 'border-orange-500 bg-orange-500/15 dark:bg-orange-500/25 shadow-lg shadow-orange-500/20'
                          : 'border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500'
                      }`}
                    >
                      <div className="text-3xl mb-2">{mode.icon}</div>
                      <p className="text-sm font-semibold">{mode.name}</p>
                    </button>
                  ))}
                </div>
                {selectedMode === 'elderly' && (
                  <div className="mt-4 p-3 bg-red-500/10 dark:bg-red-500/20 rounded-lg border border-red-500/30 animate-expandSlide">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      <span className="font-semibold">⚠️ Elderly Mode:</span> Heat risk adjusted +15% for extra caution
                    </p>
                  </div>
                )}
                {selectedMode === 'delivery' && (
                  <div className="mt-4 p-3 bg-green-500/10 dark:bg-green-500/20 rounded-lg border border-green-500/30 animate-expandSlide">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      <span className="font-semibold">✓ Delivery Mode:</span> Heat risk adjusted -10% (can tolerate more heat)
                    </p>
                  </div>
                )}
              </div>

              {/* Smart Alerts */}
              <div className="card dark:bg-slate-800/50 dark:border dark:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-bold">Smart Alerts</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-orange-500/10 dark:bg-orange-500/20 rounded-lg border border-orange-500/30 dark:border-orange-500/50 animate-slideIn">
                    <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-orange-900 dark:text-orange-200">High heat zone ahead</p>
                      <p className="text-sm text-orange-800 dark:text-orange-300">Expect temperatures above 40°C (104°F)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg border border-blue-500/30 dark:border-blue-500/50 animate-slideIn" style={{ animationDelay: '0.1s' }}>
                    <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 dark:text-blue-200">Stay hydrated</p>
                      <p className="text-sm text-blue-800 dark:text-blue-300">Carry at least 2 liters of water</p>
                    </div>
                  </div>
                  {selectedMode === 'elderly' && (
                    <>
                      <div className="flex items-start gap-3 p-3 bg-red-500/10 dark:bg-red-500/20 rounded-lg border border-red-500/30 dark:border-red-500/50 animate-slideIn" style={{ animationDelay: '0.2s' }}>
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-red-900 dark:text-red-200">Extra caution recommended</p>
                          <p className="text-sm text-red-800 dark:text-red-300">Take frequent breaks in shaded areas</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg border border-purple-500/30 dark:border-purple-500/50 animate-slideIn" style={{ animationDelay: '0.3s' }}>
                        <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-purple-900 dark:text-purple-200">Travel during cooler hours</p>
                          <p className="text-sm text-purple-800 dark:text-purple-300">Early morning (6-9 AM) or evening (5-8 PM)</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Best Time to Travel */}
              <div className="card border-l-4 border-l-green-500 bg-green-500/5 dark:bg-green-500/10 dark:bg-slate-800/50 dark:border dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-bold">Best Time to Travel</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Recommended travel time to minimize heat exposure:
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">5:00 PM</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Reduces heat exposure by <span className="font-semibold">30–40%</span>
                  </p>
                </div>
              </div>

              {/* AI Explanation */}
              <div className="card bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/10 dark:to-indigo-500/10 dark:bg-slate-800/50 dark:border dark:border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-bold">AI Insight</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  This route is safer due to lower temperature exposure and better shaded paths through urban parks and residential areas. The green corridor reduces perceived temperature by approximately 5–7°C compared to the highway route. Travel between 5 PM and 8 PM for optimal comfort and safety.
                </p>
              </div>

              {/* Route Comparison */}
              <div className="card dark:bg-slate-800/50 dark:border dark:border-slate-700">
                <h3 className="text-lg font-bold mb-6">Route Comparison</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {routes.map((route) => {
                    const adjustedRisk = calculateHeatRisk(route.heatRisk)
                    return (
                      <div
                        key={route.id}
                        onClick={() => setSelectedRoute(route.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          selectedRoute === route.id
                            ? adjustedRisk >= 50
                              ? 'border-red-500 bg-red-500/10 dark:bg-red-500/10 shadow-lg shadow-red-500/20'
                              : 'border-green-500 bg-green-500/10 dark:bg-green-500/10 shadow-lg shadow-green-500/20'
                            : 'border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="font-bold text-lg">{route.name}</h4>
                          {route.id === 'route-b' && (
                            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold rounded-full">
                              RECOMMENDED
                            </span>
                          )}
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Distance</span>
                            <span className="font-bold">{route.distance} km</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Time</span>
                            <span className="font-bold">{route.time} min</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Heat Risk</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-lg ${getRiskColor(adjustedRisk)}`}>
                                {adjustedRisk}%
                              </span>
                              {adjustedRisk !== route.heatRisk && (
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  adjustedRisk > route.heatRisk
                                    ? 'bg-red-500/20 text-red-700 dark:text-red-300'
                                    : 'bg-green-500/20 text-green-700 dark:text-green-300'
                                }`}>
                                  {adjustedRisk > route.heatRisk ? '+' : ''}{adjustedRisk - route.heatRisk}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={`p-3 rounded-lg border ${getRiskBg(adjustedRisk)}`}>
                          <p className="text-sm">{route.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Voice Alert Button */}
              <button
                onClick={playAlert}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Volume2 className="w-5 h-5" />
                Play Audio Alert
              </button>

              {/* Map Visualization */}
              <div className="card dark:bg-slate-800/50 dark:border dark:border-slate-700">
                <h3 className="text-lg font-bold mb-4">Map View</h3>
                <div className="relative w-full h-96 bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 overflow-hidden">
                  {/* Simulated Map */}
                  <svg className="w-full h-full" viewBox="0 0 400 300">
                    {/* Background */}
                    <rect width="400" height="300" fill="currentColor" className="fill-slate-200 dark:fill-slate-700" />

                    {/* Heat zones background */}
                    <rect x="150" y="80" width="100" height="80" fill="rgba(239, 68, 68, 0.2)" />
                    <ellipse cx="200" cy="120" rx="60" ry="40" fill="rgba(239, 68, 68, 0.15)" />

                    {/* Route A - Red (Hot) */}
                    <path
                      d="M 50 50 Q 150 80 300 200"
                      stroke="rgb(239, 68, 68)"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray="10,5"
                    />

                    {/* Route B - Green (Safe) */}
                    <path
                      d="M 50 50 Q 100 120 150 180 Q 200 220 300 200"
                      stroke="rgb(34, 197, 94)"
                      strokeWidth="6"
                      fill="none"
                    />

                    {/* Markers */}
                    <circle cx="50" cy="50" r="8" fill="rgb(59, 130, 246)" />
                    <circle cx="300" cy="200" r="8" fill="rgb(239, 68, 68)" />

                    {/* Legend */}
                    <g>
                      {/* legacy svg legend removed - replaced with modern overlay */}
                    </g>
                  </svg>

                  {/* Modern glass legend overlay - bottom center on small screens, top-right on md */}
                  <div className="map-legend animate-fadeIn absolute left-1/2 bottom-4 transform -translate-x-1/2 md:left-auto md:top-4 md:right-6 md:translate-x-0">
                    <div className="legend-inner flex items-center gap-4 px-4 py-2 rounded-2xl">
                      <div className="legend-title text-xs font-semibold opacity-80 mr-2 hidden md:block">Route Legend</div>
                      <div className="legend-item flex items-center gap-2">
                        <svg width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0" y1="6" x2="36" y2="6" stroke="rgb(239,68,68)" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
                        </svg>
                        <span className="text-xs font-medium">Route A (High Heat)</span>
                      </div>
                      <div className="legend-item flex items-center gap-2">
                        <svg width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <line x1="0" y1="6" x2="36" y2="6" stroke="rgb(34,197,94)" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span className="text-xs font-medium">Route B (Safe)</span>
                      </div>
                      <div className="legend-item flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="6" cy="6" r="5" fill="rgba(239,68,68,0.22)" stroke="rgb(239,68,68)" strokeWidth="1" />
                        </svg>
                        <span className="text-xs font-medium">High Heat Zone</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer - Full Width, minimal and professional */}
        <footer className="w-full mt-16 py-8 site-footer transition-colors duration-300">
          <div className="w-full px-6 sm:px-8 text-center">
            <p className="font-semibold text-slate-900 dark:text-white">HeatSafe Routes</p>
            <p className="text-sm mt-2 text-slate-600 dark:text-slate-300">Navigate Smarter. Travel Safer.</p>
            <p className="text-xs mt-2 text-slate-400 dark:text-slate-500 hidden">Climate-aware navigation</p>
          </div>
        </footer>
        <Chatbot />
      </div>
  )
}
