import React, { useState, useEffect } from 'react';
import { Clock, Check, Plus, AlertCircle, Pill, Edit } from 'lucide-react';
import { MedicationService } from '../services/MedicationService';
import MedicationModal from '../components/MedicationModal';

const MedicationReminders = ({ onDataChange }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMedication, setCurrentMedication] = useState(null);
  
  // Fetch medications on component mount
  useEffect(() => {
    fetchMedications();
    
    // Set up periodic refresh (every 60 seconds)
    const intervalId = setInterval(() => {
      fetchMedications();
    }, 60000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  const fetchMedications = async () => {
    try {
      setLoading(true);
      const data = await MedicationService.getTodayMedications();
      setMedications(data);
      setError(null);
      
      // Notify parent component about data change if callback exists
      if (onDataChange) {
        onDataChange();
      }
    } catch (err) {
      setError('Failed to load medications');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle marking medication as taken
  const handleMarkAsTaken = async (medicationId) => {
    try {
      await MedicationService.markAsTaken(medicationId);
      
      // Update local state to reflect change
      setMedications(medications.map(med => 
        med.id === medicationId ? { ...med, status: 'taken' } : med
      ));
      
      // Explicitly call onDataChange to update the dashboard stats
      if (onDataChange) {
        onDataChange();
      }
    } catch (err) {
      setError('Failed to update medication status');
      console.error(err);
    }
  };
  
  // Open modal for editing an existing medication
  const handleEditMedication = (medication) => {
    setCurrentMedication(medication);
    setModalOpen(true);
  };
  
  // Handle adding a new medication
  const handleAddMedication = () => {
    setCurrentMedication(null); // Reset to null for a new medication
    setModalOpen(true);
  };
  
  // Handle saving medication (either add or update)
  const handleSaveMedication = () => {
    fetchMedications(); // Refresh the medication list
  };
  
  // Handle deleting a medication
  const handleDeleteMedication = (medicationId) => {
    setMedications(medications.filter(med => med.id !== medicationId));
    
    // Notify parent component about data change
    if (onDataChange) {
      onDataChange();
    }
  };
  
  if (loading && medications.length === 0) return (
    <div className="flex items-center justify-center p-8 text-gray-500">
      <div className="animate-pulse flex space-x-2">
        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
      </div>
      <span className="ml-2">Loading medications...</span>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 flex items-center">
      <AlertCircle size={20} className="mr-2" />
      <span>Error: {error}</span>
    </div>
  );
  
  // Sort medications - upcoming first, then taken
  const sortedMedications = [...medications].sort((a, b) => {
    // First sort by status (upcoming before taken)
    if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
    if (a.status !== 'upcoming' && b.status === 'upcoming') return 1;
    
    // Then sort by next_dose time
    return a.next_dose.localeCompare(b.next_dose);
  });
  
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Today's Medications</h2>
      
      {sortedMedications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Pill size={40} className="mx-auto mb-2 opacity-50" />
          <p>No medications scheduled for today</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedMedications.map((med) => (
            <div 
              key={med.id} 
              className={`bg-white rounded-lg shadow-sm border p-4 transition-all 
                ${med.status === 'taken' ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:shadow'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{med.name}</h3>
                  <p className="text-sm text-gray-600">{med.instructions}</p>
                </div>
                
                <div className="flex items-center">
                  {med.status === 'taken' && (
                    <div className="bg-green-100 text-green-600 p-1 rounded-full">
                      <Check size={18} />
                    </div>
                  )}
                  
                  <button 
                    onClick={() => handleEditMedication(med)}
                    className="ml-2 p-1 text-gray-500 hover:text-gray-700"
                    aria-label="Edit medication"
                  >
                    <Edit size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Clock size={14} className="mr-1" />
                <span>Next dose: {med.next_dose}</span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3 flex justify-between">
                <span>Refill by: {new Date(med.refill_date).toLocaleDateString()}</span>
                <span className={med.remaining < 5 ? 'text-amber-600 font-medium' : ''}>
                  {med.remaining} remaining
                </span>
              </div>
              
              {med.status !== 'taken' && (
                <button 
                  className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => handleMarkAsTaken(med.id)}
                >
                  Mark as Taken
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6">
        <button 
          onClick={handleAddMedication}
          className="flex items-center justify-center w-full py-3 px-4 rounded-md border border-dashed border-gray-300 text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <Plus size={18} className="mr-1" />
          <span>Add Medication</span>
        </button>
      </div>
      
      {/* Medication Modal */}
      <MedicationModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        medication={currentMedication}
        onSave={handleSaveMedication}
        onDelete={handleDeleteMedication}
      />
    </div>
  );
};

export default MedicationReminders;