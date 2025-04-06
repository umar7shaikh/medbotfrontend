// src/components/MedicationModal.jsx
import React, { useState } from 'react';
import { X, AlertCircle, Clock, Calendar, Package, Trash2 } from 'lucide-react';
import { MedicationService } from '../services/MedicationService';

export const MedicationModal = ({ isOpen, onClose, medication, onSave, onDelete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  // Form state initialized with medication data or defaults
  const [formData, setFormData] = useState({
    id: medication?.id || '',
    name: medication?.name || '',
    instructions: medication?.instructions || '',
    next_dose: medication?.next_dose || '',
    refill_date: medication?.refill_date || '',
    remaining: medication?.remaining || '',
    status: medication?.status || 'upcoming'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (medication?.id) {
        // Update existing medication - note the change here to pass id separately
        await MedicationService.updateMedication(formData.id, formData);
      } else {
        // Add new medication
        await MedicationService.addMedication(formData);
      }
      onSave();
      onClose();
    } catch (err) {
      setError('Failed to save medication. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await MedicationService.deleteMedication(medication.id);
      onDelete(medication.id);
      onClose();
    } catch (err) {
      setError('Failed to delete medication. Please try again.');
      console.error(err);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  // Don't render anything if modal is closed
  if (!isOpen) return null;

  const inputClasses = "w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {medication ? 'Edit Medication' : 'Add New Medication'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        {error && (
          <div className="mx-4 mt-4 bg-red-50 p-3 rounded-lg border border-red-200 text-red-700 flex items-center">
            <AlertCircle size={18} className="mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className={labelClasses} htmlFor="name">
              Medication Name
            </label>
            <input
              className={inputClasses}
              id="name"
              name="name"
              type="text"
              placeholder="e.g., Aspirin, Lisinopril"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className={labelClasses} htmlFor="instructions">
              Instructions
            </label>
            <textarea
              className={`${inputClasses} min-h-20`}
              id="instructions"
              name="instructions"
              placeholder="e.g., Take 1 tablet by mouth twice daily with food"
              value={formData.instructions}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses} htmlFor="next_dose">
                <span className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  Next Dose Time
                </span>
              </label>
              <input
                className={inputClasses}
                id="next_dose"
                name="next_dose"
                type="time"
                value={formData.next_dose}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className={labelClasses} htmlFor="refill_date">
                <span className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  Refill Date
                </span>
              </label>
              <input
                className={inputClasses}
                id="refill_date"
                name="refill_date"
                type="date"
                value={formData.refill_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <label className={labelClasses} htmlFor="remaining">
              <span className="flex items-center">
                <Package size={16} className="mr-1" />
                Remaining Amount
              </span>
            </label>
            <input
              className={inputClasses}
              id="remaining"
              name="remaining"
              type="text"
              placeholder="e.g., 30 tablets, 60 capsules"
              value={formData.remaining}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="flex justify-between pt-4 border-t mt-4">
            <div className="flex space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              
              {medication && (
                <button
                  type="button"
                  className={`px-4 py-2 flex items-center ${
                    confirmDelete 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-red-50 hover:bg-red-100 text-red-700'
                  } rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-300`}
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 size={16} className="mr-1" />
                  {isDeleting ? 'Deleting...' : confirmDelete ? 'Confirm Delete' : 'Delete'}
                </button>
              )}
            </div>
            
            <button
              className={`px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-pulse mr-2">•••</span>
                  Saving
                </span>
              ) : 'Save Medication'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationModal;