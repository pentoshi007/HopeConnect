import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Download, Search, Users, Heart, Calendar, Filter, Eye, TrendingUp, BarChart3, PieChart, Activity, Clock, MapPin, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'
import { Line, Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

function AdminDashboard() {
  const [applicants, setApplicants] = useState([])
  const [filteredApplicants, setFilteredApplicants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterInterest, setFilterInterest] = useState('')
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState({})
  const [timeRange, setTimeRange] = useState('7') // days
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  const interestOptions = [
    'Education & Literacy',
    'Rural Development',
    'Women Empowerment',
    'Child Welfare',
    'Healthcare & Sanitation',
    'Environmental Conservation',
    'Skill Development & Training',
    'Elderly Care',
    'Disaster Relief',
    'Digital Literacy',
    'Arts & Culture',
    'Food Security & Nutrition'
  ]

  useEffect(() => {
    fetchApplicants()
  }, [])

  useEffect(() => {
    filterApplicants()
  }, [applicants, searchTerm, filterInterest])

  useEffect(() => {
    if (applicants.length > 0) {
      generateChartData()
    }
  }, [applicants, timeRange])

  const fetchApplicants = async () => {
    try {
      const response = await fetch(`${API_URL}/api/applicants`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setApplicants(data)
      }
    } catch (error) {
      console.error('Error fetching applicants:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterApplicants = () => {
    let filtered = applicants

    if (searchTerm) {
      filtered = filtered.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.phone.includes(searchTerm)
      )
    }

    if (filterInterest) {
      filtered = filtered.filter(applicant => applicant.interest === filterInterest)
    }

    setFilteredApplicants(filtered)
  }

  const generateChartData = () => {
    const now = new Date()
    const daysBack = parseInt(timeRange)

    // Helper function to format date consistently
    const formatDate = (date) => {
      const d = new Date(date)
      return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
    }

    // Helper function to get date key (YYYY-MM-DD format for sorting)
    const getDateKey = (date) => {
      const d = new Date(date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }

    // Applications over time - create data structure
    const dailyData = {}
    const labels = []

    for (let i = 0; i < daysBack; i++) {
      const date = new Date(now.getTime() - (daysBack - 1 - i) * 24 * 60 * 60 * 1000)
      const dateKey = getDateKey(date)
      const dateLabel = formatDate(date)
      dailyData[dateKey] = 0
      labels.push(dateLabel)
    }

    // Count applications by date
    applicants.forEach(applicant => {
      const appDate = new Date(applicant.createdAt)
      const appDateKey = getDateKey(appDate)

      if (dailyData.hasOwnProperty(appDateKey)) {
        dailyData[appDateKey]++
      }
    })

    // Convert to array in correct order
    const sortedKeys = Object.keys(dailyData).sort()
    const chartValues = sortedKeys.map(key => dailyData[key])

    // Interest area distribution
    const interestCounts = {}
    applicants.forEach(applicant => {
      interestCounts[applicant.interest] = (interestCounts[applicant.interest] || 0) + 1
    })

    // Recent applications (last 24 hours)
    const last24Hours = applicants.filter(app =>
      new Date(app.createdAt) > new Date(now.getTime() - 24 * 60 * 60 * 1000)
    ).length

    // Weekly growth
    const lastWeek = applicants.filter(app =>
      new Date(app.createdAt) > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    ).length

    const previousWeek = applicants.filter(app => {
      const appDate = new Date(app.createdAt)
      return appDate > new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) &&
        appDate <= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    }).length

    const weeklyGrowth = previousWeek > 0 ? ((lastWeek - previousWeek) / previousWeek * 100) : 100

    setChartData({
      applicationsOverTime: {
        labels: Object.keys(dailyData),
        datasets: [{
          label: 'Applications',
          data: Object.values(dailyData),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      interestDistribution: {
        labels: Object.keys(interestCounts),
        datasets: [{
          data: Object.values(interestCounts),
          backgroundColor: [
            '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
            '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1',
            '#14B8A6', '#F43F5E'
          ],
          borderWidth: 0
        }]
      },
      stats: {
        last24Hours,
        weeklyGrowth: Math.round(weeklyGrowth),
        totalInterests: Object.keys(interestCounts).length,
        avgPerDay: Math.round(applicants.length / Math.max(1, (now - new Date(applicants[0]?.createdAt || now)) / (1000 * 60 * 60 * 24)))
      }
    })
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Interest', 'Date Applied']
    const csvData = [
      headers,
      ...filteredApplicants.map(applicant => [
        applicant.name,
        applicant.email,
        applicant.phone,
        applicant.interest,
        new Date(applicant.createdAt).toLocaleDateString()
      ])
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'hopeconnect-applicants.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportApplicantDetails = (applicant) => {
    const data = {
      'Full Name': applicant.name,
      'Email Address': applicant.email,
      'Phone Number': applicant.phone,
      'Interest Area': applicant.interest,
      'Availability': applicant.availability,
      'Application Date': new Date(applicant.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      'Application Time': new Date(applicant.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }

    const csvContent = Object.entries(data).map(([key, value]) => `"${key}","${value}"`).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${applicant.name.replace(/\s+/g, '_')}_details.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-main via-white to-primary/5 fade-in">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 slide-up">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-text-secondary mt-4 text-center">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-white to-primary/5 fade-in">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 mb-8 slide-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg">
                <Heart className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  HopeConnect Admin
                </h1>
                <p className="text-text-secondary text-base sm:text-lg">
                  Managing {filteredApplicants.length} volunteer application{filteredApplicants.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all bg-white/80 backdrop-blur-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="14">Last 14 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>

              <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-xl">
                <Activity className="h-4 w-4 text-success" />
                <span className="text-success font-semibold text-sm">Live Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 slide-up stagger-1 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-primary to-primary-light rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold text-text-primary">{applicants.length}</p>
                <p className="text-text-secondary text-xs sm:text-sm font-medium">Total Applicants</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
              <span className="text-success text-xs sm:text-sm font-semibold">
                +{chartData.stats?.weeklyGrowth || 0}% this week
              </span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 slide-up stagger-2 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-accent to-orange-400 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold text-text-primary">{chartData.stats?.last24Hours || 0}</p>
                <p className="text-text-secondary text-xs sm:text-sm font-medium">Last 24 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
              <span className="text-accent text-xs sm:text-sm font-semibold">
                {chartData.stats?.avgPerDay || 0} avg/day
              </span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 slide-up stagger-3 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-success to-emerald-400 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold text-text-primary">
                  {new Set(applicants.map(a => a.interest)).size}
                </p>
                <p className="text-text-secondary text-xs sm:text-sm font-medium">Interest Areas</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PieChart className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
              <span className="text-success text-xs sm:text-sm font-semibold">
                {chartData.stats?.totalInterests || 0} categories
              </span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 slide-up stagger-4 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="text-right">
                <p className="text-2xl sm:text-3xl font-bold text-text-primary">
                  {applicants.filter(a => new Date(a.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </p>
                <p className="text-text-secondary text-xs sm:text-sm font-medium">This Week</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
              <span className="text-purple-500 text-xs sm:text-sm font-semibold">
                Weekly trend
              </span>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {/* Applications Over Time Chart */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 slide-up stagger-5">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-text-primary">Applications Over Time</h3>
                <p className="text-text-secondary text-xs sm:text-sm">Daily application trends</p>
              </div>
            </div>
            <div className="h-48 sm:h-64">
              {chartData.applicationsOverTime && (
                <Line
                  data={chartData.applicationsOverTime}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                          font: {
                            size: window.innerWidth < 640 ? 10 : 12
                          }
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        },
                        ticks: {
                          font: {
                            size: window.innerWidth < 640 ? 10 : 12
                          },
                          maxRotation: window.innerWidth < 640 ? 45 : 0
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>

          {/* Interest Distribution Chart */}
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 slide-up stagger-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-success/10 rounded-lg">
                <PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-success" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-text-primary">Interest Distribution</h3>
                <p className="text-text-secondary text-xs sm:text-sm">Popular volunteer areas</p>
              </div>
            </div>
            <div className="h-48 sm:h-64 flex items-center justify-center">
              {chartData.interestDistribution && (
                <Doughnut
                  data={chartData.interestDistribution}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: {
                          padding: window.innerWidth < 640 ? 15 : 20,
                          usePointStyle: true,
                          font: {
                            size: window.innerWidth < 640 ? 9 : 11
                          }
                        }
                      }
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Filters and Actions */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 mb-8 slide-up stagger-7">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary group-hover:text-gray-600 transition-colors z-10" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary placeholder-text-secondary/50 transition-all bg-white shadow-sm hover:shadow-md text-sm sm:text-base"
                />
              </div>

              <div className="relative group">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary group-hover:text-gray-600 transition-colors z-10" />
                <select
                  value={filterInterest}
                  onChange={(e) => setFilterInterest(e.target.value)}
                  className="w-full sm:w-auto pl-12 pr-8 py-3 sm:py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-text-primary transition-all appearance-none bg-white min-w-[220px] shadow-sm hover:shadow-md text-sm sm:text-base"
                >
                  <option value="">All Interest Areas</option>
                  {interestOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={exportToCSV}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-text-primary border border-gray-200 hover:border-primary/30 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] text-sm sm:text-base"
              >
                <Activity className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-text-secondary">Showing {filteredApplicants.length} of {applicants.length} applicants</span>
              </div>
              {searchTerm && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-text-secondary">Search: "{searchTerm}"</span>
                </div>
              )}
              {filterInterest && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-text-secondary">Filter: {filterInterest}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Applicants Table */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden slide-up stagger-8">
          <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary">Volunteer Applications</h3>
                  <p className="text-text-secondary text-xs sm:text-sm">Manage and review applications</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary text-xs sm:text-sm font-medium">{filteredApplicants.length} results</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 sm:p-6 text-text-primary font-semibold text-sm sm:text-base">Volunteer</th>
                  <th className="text-left p-4 sm:p-6 text-text-primary font-semibold text-sm sm:text-base">Contact</th>
                  <th className="text-left p-4 sm:p-6 text-text-primary font-semibold text-sm sm:text-base">Interest Area</th>
                  <th className="text-left p-4 sm:p-6 text-text-primary font-semibold text-sm sm:text-base">Applied</th>
                  <th className="text-left p-4 sm:p-6 text-text-primary font-semibold text-sm sm:text-base">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant, index) => (
                  <tr key={applicant._id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-200 group ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                    <td className="p-4 sm:p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                          {applicant.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-text-primary group-hover:text-primary transition-colors text-sm sm:text-base">
                            {applicant.name}
                          </div>
                          <div className="text-text-secondary text-xs sm:text-sm">Volunteer</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-6">
                      <div className="space-y-1">
                        <div className="text-text-primary font-medium text-xs sm:text-sm">{applicant.email}</div>
                        <div className="text-text-secondary text-xs flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {applicant.phone}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-6">
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20">
                        {applicant.interest}
                      </span>
                    </td>
                    <td className="p-4 sm:p-6">
                      <div className="space-y-1">
                        <div className="text-text-primary font-medium text-xs sm:text-sm">
                          {new Date(applicant.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-text-secondary text-xs">
                          {new Date(applicant.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-6">
                      <button
                        onClick={() => setSelectedApplicant(applicant)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary hover:to-primary-light text-primary hover:text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 border border-primary/20 hover:border-transparent shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredApplicants.length === 0 && (
              <div className="p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">No applicants found</h3>
                <p className="text-text-secondary max-w-md mx-auto">
                  {searchTerm || filterInterest
                    ? "Try adjusting your search or filter criteria to find more results."
                    : "No volunteer applications have been submitted yet. Check back later for new applications."}
                </p>
                {(searchTerm || filterInterest) && (
                  <button
                    onClick={() => {
                      setSearchTerm('')
                      setFilterInterest('')
                    }}
                    className="mt-4 text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Applicant Detail Modal */}
        {selectedApplicant && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 fade-in">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 max-w-3xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-enter">
              {/* Header */}
              <div className="p-4 sm:p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-200/50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary-light rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                      {selectedApplicant.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-3xl font-bold text-text-primary">{selectedApplicant.name}</h2>
                      <p className="text-text-secondary text-sm sm:text-lg">{selectedApplicant.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                        <span className="text-success text-xs sm:text-sm font-medium">Active Application</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200"
                  >
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                {/* Contact Information */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-6 border border-blue-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Contact Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <div className="text-xs sm:text-sm text-text-secondary mb-1">Email Address</div>
                      <div className="font-semibold text-text-primary text-sm sm:text-base break-all">{selectedApplicant.email}</div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <div className="text-xs sm:text-sm text-text-secondary mb-1">Phone Number</div>
                      <div className="font-semibold text-text-primary text-sm sm:text-base">{selectedApplicant.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Interest Area */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 border border-green-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Interest Area</h3>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                    <span className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-semibold bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30">
                      {selectedApplicant.interest}
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 border border-purple-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Availability</h3>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/50">
                    <p className="text-text-primary whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
                      {selectedApplicant.availability}
                    </p>
                  </div>
                </div>

                {/* Application Details */}
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 sm:p-6 border border-orange-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-text-primary">Application Details</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <div className="text-xs sm:text-sm text-text-secondary mb-1">Application Date</div>
                      <div className="font-semibold text-text-primary text-sm sm:text-base">
                        {new Date(selectedApplicant.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50">
                      <div className="text-xs sm:text-sm text-text-secondary mb-1">Application Time</div>
                      <div className="font-semibold text-text-primary text-sm sm:text-base">
                        {new Date(selectedApplicant.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:gap-4 pt-4">
                  <button className="w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                    Contact Volunteer
                  </button>
                  <button
                    onClick={() => exportApplicantDetails(selectedApplicant)}
                    className="w-full bg-white/80 backdrop-blur-sm hover:bg-white text-text-primary border border-gray-200 hover:border-primary/30 px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Download className="h-4 w-4 sm:h-5 sm:w-5" />
                    Export Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard