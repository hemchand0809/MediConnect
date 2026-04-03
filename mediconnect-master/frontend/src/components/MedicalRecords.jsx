import React from 'react';
import { FolderOpen, FileText, Calendar, Stethoscope, Pill } from 'lucide-react';

const MedicalRecords = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-4">
            <FolderOpen className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Medical Records</h1>
          <p className="text-gray-600 mt-2">Access your reports and consultations</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center"><FileText className="w-5 h-5 text-violet-600 mr-2"/> Recent Records for <span className="ml-1 text-violet-700">Kushal</span></h2>

          <div className="mt-6 space-y-4">
            <div className="border rounded-xl p-4 hover:shadow-sm transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 text-violet-600 mr-2"/> 2025-09-10
                </div>
                <span className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full">Consultation</span>
              </div>
              <div className="mt-2 text-sm text-gray-600 flex items-center"><Stethoscope className="w-4 h-4 text-blue-600 mr-2"/> Diagnosis: Seasonal Allergies</div>
              <div className="mt-1 text-sm text-gray-600 flex items-center"><Pill className="w-4 h-4 text-purple-600 mr-2"/> Medications: Cetirizine 10mg, once daily</div>
              <div className="mt-1 text-xs text-gray-500">Notes: Advise increased hydration and avoid allergens.</div>
            </div>

            <div className="border rounded-xl p-4 hover:shadow-sm transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 text-violet-600 mr-2"/> 2025-08-02
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Lab Report</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">Blood Panel: Within normal limits.</div>
              <div className="mt-1 text-xs text-gray-500">Report ID: LAB-8823-KSH</div>
            </div>

            <div className="border rounded-xl p-4 hover:shadow-sm transition">
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 text-violet-600 mr-2"/> 2025-06-15
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Vaccination</span>
              </div>
              <div className="mt-2 text-sm text-gray-600">COVID-19 Booster (mRNA), Lot: KSH-2215</div>
              <div className="mt-1 text-xs text-gray-500">Administered by: Dr. Sarah Wilson</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;


