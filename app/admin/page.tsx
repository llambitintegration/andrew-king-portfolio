"use client"

import { useState, useEffect } from "react"

interface PageStats {
  page: string
  views: number
}

interface Analytics {
  visitors: number
  pageViews: number
  avgSessionTime: string
  topPages: PageStats[]
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics>({
    visitors: 0,
    pageViews: 0,
    avgSessionTime: "0:00",
    topPages: [],
  })

  useEffect(() => {
    // Simulate analytics data
    setAnalytics({
      visitors: Math.floor(Math.random() * 1000) + 100,
      pageViews: Math.floor(Math.random() * 5000) + 500,
      avgSessionTime: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
      topPages: [
        { page: "Home", views: Math.floor(Math.random() * 500) + 100 },
        { page: "Resume", views: Math.floor(Math.random() * 300) + 50 },
        { page: "About", views: Math.floor(Math.random() * 200) + 30 },
        { page: "Contact", views: Math.floor(Math.random() * 150) + 20 },
      ],
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
          >
            Back to Portfolio
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Visitors</h3>
            <p className="text-3xl font-bold text-gray-900">{analytics.visitors}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Page Views</h3>
            <p className="text-3xl font-bold text-gray-900">{analytics.pageViews}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Avg Session Time</h3>
            <p className="text-3xl font-bold text-gray-900">{analytics.avgSessionTime}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Bounce Rate</h3>
            <p className="text-3xl font-bold text-gray-900">32%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h3>
            <div className="space-y-3">
              {analytics.topPages.map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{page.page}</span>
                  <span className="font-medium text-gray-900">{page.views} views</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">New visitor from Houston, TX</div>
              <div className="text-sm text-gray-600">Resume section viewed</div>
              <div className="text-sm text-gray-600">Contact form interaction</div>
              <div className="text-sm text-gray-600">About page visited</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
