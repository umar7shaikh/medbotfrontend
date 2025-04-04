import React from 'react';
import { Clock, Check } from 'lucide-react';

const MedicationReminders = () => {
  // Sample data - In a real app, this would come from an API
  const medications = [
    {
      id: 1,
      name: 'Lisinopril 10mg',
      instructions: '1 tablet daily with food',
      nextDose: '08:00 AM',
      refillDate: '2025-04-15',
      remaining: '15 tablets',
      status: 'taken'
    },
    {
      id: 2,
      name: 'Metformin 500mg',
      instructions: '1 tablet twice daily',
      nextDose: '12:30 PM',
      refillDate: '2025-04-20',
      remaining: '22 tablets',
      status: 'upcoming'
    },
    {
      id: 3,
      name: 'Atorvastatin 20mg',
      instructions: '1 tablet at bedtime',
      nextDose: '09:00 PM',
      refillDate: '2025-04-28',
      remaining: '18 tablets',
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-4">
      {medications.map((med) => (
        <div 
          key={med.id} 
          className={`border rounded-lg p-3 ${
            med.status === 'taken' 
              ? 'border-green-100 bg-green-50' 
              : 'border-orange-100 bg-orange-50'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{med.name}</div>
              <div className="text-sm text-slate-600">{med.instructions}</div>
            </div>
            {med.status === 'taken' ? (
              <div className="bg-green-500 p-1 rounded-full">
                <Check size={14} className="text-white" />
              </div>
            ) : null}
          </div>
          
          <div className="mt-2 flex items-center text-sm">
            <Clock size={14} className="mr-1 text-slate-500" />
            <span className="text-slate-700">Next dose: {med.nextDose}</span>
          </div>
          
          <div className="mt-3 text-xs text-slate-500 flex justify-between">
            <span>Refill by: {new Date(med.refillDate).toLocaleDateString()}</span>
            <span>{med.remaining} left</span>
          </div>
          
          {med.status !== 'taken' && (
            <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm">
              Mark as Taken
            </button>
          )}
        </div>
      ))}
      
      <div className="mt-4">
        <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center justify-center w-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Medication
        </button>
      </div>
    </div>
  );
};

export default MedicationReminders;