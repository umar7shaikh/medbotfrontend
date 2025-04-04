import React from 'react';
import StatCard from '../components/StatCard';
import AppointmentCalendar from '../components/AppointmentCalendar';
import HealthTrackers from '../components/HealthTrackers';
import ChatbotAccess from '../components/ChatbotAccess';
import MedicationReminders from '../components/MedicationReminder';
import { Calendar, Activity, FileText, MessageSquare, Bell, Clipboard } from 'lucide-react';

const Dashboard = () => {
  // Sample data - in a real app this would come from API
  const stats = [
    { title: 'Upcoming Appointments', value: '2', icon: <Calendar size={20} />, color: 'bg-blue-500' },
    { title: 'Active Medications', value: '3', icon: <FileText size={20} />, color: 'bg-green-500' },
    { title: 'Health Score', value: '84%', icon: <Activity size={20} />, color: 'bg-indigo-500' },
    { title: 'Messages', value: '5', icon: <MessageSquare size={20} />, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">My Health Dashboard</h1>
        <p className="text-slate-500">Welcome back, Sarah</p>
      </div>

      {/* Quick Access to Chatbot */}
      <div className="mb-8">
        <ChatbotAccess />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-xl font-semibold text-slate-800 mb-4">
            <Calendar size={18} className="mr-2 text-blue-500" />
            Upcoming Appointments
          </h2>
          <AppointmentCalendar />
        </div>

        {/* Medication Reminders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="flex items-center text-xl font-semibold text-slate-800 mb-4">
            <Bell size={18} className="mr-2 text-green-500" />
            Medication Reminders
          </h2>
          <MedicationReminders />
        </div>

        {/* Health Trackers */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow p-6 mt-6">
          <h2 className="flex items-center text-xl font-semibold text-slate-800 mb-4">
            <Clipboard size={18} className="mr-2 text-indigo-500" />
            Health Trackers
          </h2>
          <HealthTrackers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;