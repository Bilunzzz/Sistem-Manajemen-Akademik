import React from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useChartData } from "@/Utils/Hooks/useChart";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const Dashboard = () => {
  const { data = {}, isLoading } = useChartData();

  const {
    students = [],
    genderRatio = [],
    registrations = [],
    gradeDistribution = [],
    lecturerRanks = [],
  } = data;

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse">
          <div className="text-xl text-gray-600">Loading chart data...</div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Dashboard Universitas
          </h1>
          <p className="text-gray-600">
            Visualisasi data mahasiswa, dosen, dan akademik dalam bentuk grafik
            interaktif
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Mahasiswa
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.reduce((acc, curr) => acc + curr.count, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Dosen</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {lecturerRanks.reduce((acc, curr) => acc + curr.count, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2v1a1 1 0 00-1 1v6a1 1 0 001 1v1a2 2 0 01-2-2V5zM16 5a2 2 0 00-2-2v1a1 1 0 011 1v6a1 1 0 01-1 1v1a2 2 0 002-2V5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Fakultas</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {students.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Program Studi
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {gradeDistribution.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. BarChart - Mahasiswa per Fakultas */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Distribusi Mahasiswa per Fakultas
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={students}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="faculty"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value, "Jumlah Mahasiswa"]}
                  labelStyle={{ color: "#374151" }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 2. PieChart - Rasio Gender */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rasio Gender Mahasiswa
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderRatio}
                  dataKey="count"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ gender, count, percent }) =>
                    `${gender}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {genderRatio.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Jumlah"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 3. LineChart - Tren Pendaftaran */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tren Pendaftaran Mahasiswa Baru
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={registrations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [value, "Pendaftar Baru"]}
                  labelFormatter={(label) => `Tahun ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#10B981" }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 4. RadarChart - Distribusi Nilai */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Distribusi Nilai per Program Studi
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={gradeDistribution}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Nilai A"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Nilai B"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Nilai C"
                  dataKey="C"
                  stroke="#ffc658"
                  fill="#ffc658"
                  fillOpacity={0.3}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* 5. AreaChart - Pangkat Dosen */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Distribusi Pangkat Dosen
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={lecturerRanks}>
                <defs>
                  <linearGradient
                    id="colorLecturer"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="rank" tick={{ fontSize: 12 }} />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={(value) => [value, "Jumlah Dosen"]} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorLecturer)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Informasi Dashboard
            </h3>
            <p className="text-gray-600 text-sm">
              Dashboard ini menampilkan visualisasi data universitas menggunakan
              Recharts. Data diperbarui secara real-time dan responsif di
              berbagai perangkat.
            </p>
            <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
              <span>📊 5 Jenis Chart</span>
              <span>📱 Responsive Design</span>
              <span>⚡ Real-time Data</span>
              <span>🎨 Interactive Tooltips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
