"use client"

import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, PieChart, Pie, Cell, BarChart, Bar } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ArrowUpRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  Layers,
  Link2,
  Send,
  TrendingUp,
  Users,
} from "lucide-react"
import type {
  ApplicantTrendDatum,
  RecentActivity,
  SourceDistributionDatum,
} from "../types"

interface OverviewSectionProps {
  metrics: {
    totalApplicants: number
    interviewsScheduled: number
    offersSent: number
    totalPlatforms: number
  }
  applicantTrendData: ApplicantTrendDatum[]
  sourceDistributionData: SourceDistributionDatum[]
  recentActivityData: RecentActivity[]
}

export function OverviewSection({
  metrics,
  applicantTrendData,
  sourceDistributionData,
  recentActivityData,
}: OverviewSectionProps) {
  const stats = [
    {
      id: "totalApplicants",
      label: "Total Applicants",
      value: metrics.totalApplicants,
      Icon: Users,
      iconWrapperClass: "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center",
      iconClass: "w-6 h-6 text-primary",
      note: {
        Icon: ArrowUpRight,
        text: "+12% from last week",
        className: "text-xs text-green-600 mt-1 flex items-center gap-1",
      },
    },
    {
      id: "interviewsScheduled",
      label: "Interviews Scheduled",
      value: metrics.interviewsScheduled,
      Icon: Calendar,
      iconWrapperClass: "w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center",
      iconClass: "w-6 h-6 text-blue-600",
      note: {
        Icon: Clock,
        text: `${metrics.interviewsScheduled} this week`,
        className: "text-xs text-blue-600 mt-1 flex items-center gap-1",
      },
    },
    {
      id: "offersSent",
      label: "Offers Sent",
      value: metrics.offersSent,
      Icon: Heart,
      iconWrapperClass: "w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center",
      iconClass: "w-6 h-6 text-secondary",
      note: {
        Icon: Send,
        text: "Awaiting responses",
        className: "text-xs text-purple-600 mt-1 flex items-center gap-1",
      },
    },
    {
      id: "connectedPlatforms",
      label: "Connected Platforms",
      value: metrics.totalPlatforms,
      Icon: Link2,
      iconWrapperClass: "w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center",
      iconClass: "w-6 h-6 text-teal-600",
      note: {
        Icon: CheckCircle2,
        text: "All active",
        className: "text-xs text-teal-600 mt-1 flex items-center gap-1",
      },
    },
  ]

  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center gap-3">
          <TrendingUp className="w-10 h-10 text-primary" />
          Overview
        </h1>
        <p className="text-muted-foreground">Your recruitment metrics at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ id, label, value, Icon, iconWrapperClass, iconClass, note }) => (
          <Card key={id} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{label}</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
                  <p className={note.className}>
                    <note.Icon className="w-3 h-3" />
                    {note.text}
                  </p>
                </div>
                <div className={iconWrapperClass}>
                  <Icon className={iconClass} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Applicant Trends
            </CardTitle>
            <CardDescription>Monthly applicant flow over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={applicantTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="applicants" stroke="#3b82f6" strokeWidth={2} name="Applicants" />
                <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} name="Interviews" />
                <Line type="monotone" dataKey="offers" stroke="#f59e0b" strokeWidth={2} name="Offers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Applicant Sources
            </CardTitle>
            <CardDescription>Distribution of applicants by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Recruitment Performance
          </CardTitle>
          <CardDescription>Monthly recruitment metrics comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applicantTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applicants" fill="#3b82f6" name="Applicants" />
              <Bar dataKey="interviews" fill="#10b981" name="Interviews" />
              <Bar dataKey="offers" fill="#f59e0b" name="Offers" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-2 mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest recruitment activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivityData.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.candidate}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell className="text-muted-foreground">{activity.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        activity.status === "New"
                          ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                          : activity.status === "Pending"
                          ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                          : activity.status === "Verified"
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-purple-500/10 text-purple-600 border-purple-500/20"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
