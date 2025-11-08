import React, { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import AdminNavbar from "../components/AdminNavbar";

const teachersData = [
  { id: 1, name: "John Smith", email: "john@school.com", subject: "Mathematics", class: "Grade 10A" },
  { id: 2, name: "Sarah Johnson", email: "sarah@school.com", subject: "English", class: "Grade 10B" },
  { id: 3, name: "Michael Brown", email: "michael@school.com", subject: "Science", class: "Grade 11A" },
];

const studentsData = [
  { id: "s1", name: "Emily Davis", class: "Grade 10A", avg: 86 },
  { id: "s2", name: "James Wilson", class: "Grade 10A", avg: 72 },
  { id: "s3", name: "Rohan Verma", class: "Grade 10A", avg: 91 },
  { id: "s4", name: "Sophia Patel", class: "Grade 10B", avg: 78 },
  { id: "s5", name: "Aarav Sharma", class: "Grade 10B", avg: 84 },
  { id: "s6", name: "Liam Carter", class: "Grade 11A", avg: 88 },
];

const examplePerformance = [
  { subject: "Math", avg: 86 },
  { subject: "Science", avg: 82 },
  { subject: "English", avg: 90 },
  { subject: "History", avg: 78 },
  { subject: "Art", avg: 75 },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState("");

  const studentPerformance = useMemo(() => {
    if (!selectedStudent) return [];
    return examplePerformance;
  }, [selectedStudent]);

  return (
    <>
      <AdminNavbar />

      <Box className="dashboard-container">
        <Box className="dashboard-header">
          <Typography variant="h4" className="dashboard-title">
            Admin Dashboard
          </Typography>
          <Typography variant="h6" className="dashboard-subtitle">
            Welcome back, Admin User
          </Typography>
        </Box>

        {/* Overview cards */}
        <div className="stats-grid">
          <div className="stat-card-enhanced">
            <div className="stat-value">{teachersData.length}</div>
            <div className="stat-label">Total Teachers</div>
          </div>

          <div className="stat-card-enhanced">
            <div className="stat-value">{studentsData.length}</div>
            <div className="stat-label">Total Students</div>
          </div>

          <div className="stat-card-enhanced">
            <div className="stat-value">94%</div>
            <div className="stat-label">Average Attendance</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
          <Tab label="Teachers" />
          <Tab label="Students" />
          <Tab label="Performance Overview" />
        </Tabs>

        {/* TEACHERS TAB */}
        {tab === 0 && (
          <div className="content-card">
            <Typography variant="h6">All Teachers</Typography>

            <table className="enhanced-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {teachersData.map((t) => (
                  <tr key={t.id}>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td><Chip label={t.subject} className="chip-success" /></td>
                    <td>{t.class}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* STUDENTS TAB */}
        {tab === 1 && (
          <div className="content-card">
            <Typography variant="h6">All Students</Typography>

            <table className="enhanced-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Average Score</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.class}</td>
                    <td>{s.avg}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PERFORMANCE OVERVIEW TAB */}
        {tab === 2 && (
          <div className="content-card">
            <Typography variant="h6">Performance Analysis</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Select a student to view detailed performance data
            </Typography>

            <Box sx={{ mb: 3, width: 350 }}>
              <FormControl fullWidth>
                <InputLabel>Select a student</InputLabel>
                <Select
                  label="Select a student"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  {studentsData.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name} — {s.class}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {!selectedStudent ? (
              <Typography color="text.secondary">
                No student selected.
              </Typography>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Bar Chart */}
                <div className="chart-container">
                  <div className="chart-title">Average Marks</div>
                  <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={studentPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avg" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="chart-container">
                  <div className="chart-title">Performance Trend</div>
                  <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={studentPerformance}>
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="avg" stroke="#1e3a8a" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}
      </Box>
    </>
  );
}
