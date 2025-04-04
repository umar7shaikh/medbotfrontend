import React from 'react';
import { Heart, Droplet, Activity } from 'lucide-react';

const HealthTrackers = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blood Pressure Tracker */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-800 flex items-center">
              <Heart size={16} className="text-red-500 mr-2" />
              Blood Pressure
            </h3>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              Add Entry
            </button>
          </div>
          
          <div className="flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">120/80</div>
              <div className="text-sm text-slate-500">Last reading</div>
              <div className="text-xs text-slate-400 mt-1">Yesterday at 9:30 AM</div>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-blue-100">
            <div className="flex text-sm justify-between">
              <span className="text-slate-600">30-day average:</span>
              <span className="font-medium text-slate-800">124/82</span>
            </div>
          </div>
        </div>
        
        {/* Blood Glucose Tracker */}
        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-800 flex items-center">
              <Droplet size={16} className="text-blue-500 mr-2" />
              Blood Glucose
            </h3>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              Add Entry
            </button>
          </div>
          
          <div className="flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">98 mg/dL</div>
              <div className="text-sm text-slate-500">Last reading</div>
              <div className="text-xs text-slate-400 mt-1">Today at 7:15 AM</div>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-green-100">
            <div className="flex text-sm justify-between">
              <span className="text-slate-600">30-day average:</span>
              <span className="font-medium text-slate-800">103 mg/dL</span>
            </div>
          </div>
        </div>
        
        {/* Activity Tracker */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-slate-800 flex items-center">
              <Activity size={16} className="text-indigo-500 mr-2" />
              Daily Activity
            </h3>
            <button className="text-xs text-blue-600 hover:text-blue-800">
              View Details
            </button>
          </div>
          
          <div className="flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">6,247</div>
              <div className="text-sm text-slate-500">Steps today</div>
              <div className="text-xs text-green-500 mt-1">+12% from yesterday</div>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-indigo-100">
            <div className="flex text-sm justify-between">
              <span className="text-slate-600">Weekly average:</span>
              <span className="font-medium text-slate-800">5,842 steps</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-4 border border-slate-200 rounded-lg">
        <h3 className="text-lg font-medium text-slate-800 mb-4">All Health Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 text-left">
            <div className="text-sm text-slate-500">Weight</div>
            <div className="font-medium">168 lbs</div>
          </button>
          <button className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 text-left">
            <div className="text-sm text-slate-500">Heart Rate</div>
            <div className="font-medium">72 bpm</div>
          </button>
          <button className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 text-left">
            <div className="text-sm text-slate-500">Sleep</div>
            <div className="font-medium">7.2 hours</div>
          </button>
          <button className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 text-left">
            <div className="text-sm text-slate-500">Oxygen</div>
            <div className="font-medium">98%</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthTrackers;