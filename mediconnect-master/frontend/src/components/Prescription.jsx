import React from 'react';
import { ClipboardList, Pill, Lock } from 'lucide-react';

const Prescription = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 mb-4">
            <ClipboardList className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">Prescriptions</h1>
          <p className="text-gray-600 mt-2">Review and manage your prescriptions</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center"><Pill className="w-5 h-5 text-violet-600 mr-2"/> My Prescriptions</h2>
            <span className="inline-flex items-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full"><Lock className="w-3 h-3 mr-1"/> Read-only</span>
          </div>

          <div className="mt-6 space-y-5">
            {/* Dummy Prescription 1 */}
            <div className="border rounded-xl p-5 hover:shadow-sm transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-700">
                  <span className="text-gray-500">Date:</span> 2025-09-12
                </div>
                <div className="mt-2 sm:mt-0 text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded-full inline-block">Dr. Sarah Wilson</div>
              </div>
              <div className="mt-2 text-sm text-gray-700"><span className="text-gray-500">Diagnosis:</span> Acute Bronchitis</div>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 pr-4">Medicine</th>
                      <th className="py-2 pr-4">Dosage</th>
                      <th className="py-2 pr-4">Frequency</th>
                      <th className="py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="border-t">
                      <td className="py-2 pr-4">Amoxicillin</td>
                      <td className="py-2 pr-4">500 mg</td>
                      <td className="py-2 pr-4">3x/day</td>
                      <td className="py-2">7 days</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 pr-4">Dextromethorphan</td>
                      <td className="py-2 pr-4">10 ml</td>
                      <td className="py-2 pr-4">2x/day</td>
                      <td className="py-2">5 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-xs text-gray-500">Notes: Rest, warm fluids, and monitor temperature.</div>
            </div>

            {/* Dummy Prescription 2 */}
            <div className="border rounded-xl p-5 hover:shadow-sm transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-700">
                  <span className="text-gray-500">Date:</span> 2025-07-03
                </div>
                <div className="mt-2 sm:mt-0 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full inline-block">Dr. Amit Verma</div>
              </div>
              <div className="mt-2 text-sm text-gray-700"><span className="text-gray-500">Diagnosis:</span> Migraine</div>
              <div className="mt-3 overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-500">
                      <th className="py-2 pr-4">Medicine</th>
                      <th className="py-2 pr-4">Dosage</th>
                      <th className="py-2 pr-4">Frequency</th>
                      <th className="py-2">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="border-t">
                      <td className="py-2 pr-4">Sumatriptan</td>
                      <td className="py-2 pr-4">50 mg</td>
                      <td className="py-2 pr-4">As needed</td>
                      <td className="py-2">Up to 1 week</td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2 pr-4">Naproxen</td>
                      <td className="py-2 pr-4">250 mg</td>
                      <td className="py-2 pr-4">2x/day</td>
                      <td className="py-2">3 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-2 text-xs text-gray-500">Notes: Avoid triggers; follow-up if symptoms persist.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription;


