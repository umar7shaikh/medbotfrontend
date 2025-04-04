import React from 'react';
import { Clock, User, MapPin, Calendar } from 'lucide-react';

const AppointmentCalendar = () => {
  // Sample data - In a real app, this would come from an API
  const appointments = [
    { 
      id: 1, 
      date: '2025-04-05', 
      time: '09:00 AM', 
      doctor: 'Dr. Sarah Johnson', 
      specialty: 'Cardiologist',
      location: 'Main Hospital, Room 302',
      status: 'upcoming' 
    },
    { 
      id: 2, 
      date: '2025-04-10', 
      time: '02:30 PM', 
      doctor: 'Dr. Michael Brown', 
      specialty: 'Dermatologist',
      location: 'Medical Plaza, Suite 105',
      status: 'upcoming' 
    }
  ];

  return (
    <div>
      {appointments.length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          You have no upcoming appointments
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="border border-blue-100 rounded-lg p-4 bg-blue-50 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-semibold text-blue-700">
                    {new Date(appointment.date).toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center mt-1 text-slate-600">
                    <Clock size={14} className="mr-1" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-4 rounded-full">
                  Reschedule
                </button>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex">
                  <User size={16} className="text-slate-400 mt-1 mr-2" />
                  <div>
                    <div className="font-medium">{appointment.doctor}</div>
                    <div className="text-sm text-slate-500">{appointment.specialty}</div>
                  </div>
                </div>
                
                <div className="flex">
                  <MapPin size={16} className="text-slate-400 mt-1 mr-2" />
                  <div className="text-sm text-slate-600">{appointment.location}</div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-1 px-3 rounded">
                    Details
                  </button>
                  <button className="text-sm bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 py-1 px-3 rounded">
                    Join Virtual
                  </button>
                </div>
                <div>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center mx-auto">
          <Calendar size={16} className="mr-2" />
          Schedule New Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentCalendar;