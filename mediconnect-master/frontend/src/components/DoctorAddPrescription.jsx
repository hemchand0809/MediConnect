import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipboardList, Plus, Info, User, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import API_BASE_URL, { getDoctorPatients, createPrescription } from '../config/apiConfig';

const StepIndicator = ({ step }) => {
  const steps = [
    { id: 1, label: 'Prescription' },
    { id: 2, label: 'Additional Info' },
    { id: 3, label: 'Select Patient' },
  ];
  return (
    <div className="flex items-center justify-center space-x-6 mb-6">
      {steps.map((s, idx) => (
        <div key={s.id} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
            step > s.id ? 'bg-green-100 text-green-700' : step === s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.id}
          </div>
          <span className={`ml-2 text-sm ${step === s.id ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>{s.label}</span>
          {idx < steps.length - 1 && <div className="w-10 h-px bg-gray-300 ml-4" />}
        </div>
      ))}
    </div>
  );
};

const DoctorAddPrescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const preselectedPatient = location.state?.preselectedPatient;

  const [doctorInfo] = useState(() => {
    const stored = localStorage.getItem('doctorInfo');
    return stored ? JSON.parse(stored) : {
      id: '675ae123456789012345678a',
      name: 'Dr. Sarah Wilson',
      specialization: 'Cardiology',
      email: 'sarah.wilson@mediconnect.com'
    };
  });

  // Step 1: Prescription items
  const [items, setItems] = useState([
    { name: '', dosage: '', frequency: '', duration: '' }
  ]);

  // Step 2: Additional info
  const [additional, setAdditional] = useState({
    notes: '',
    diagnosis: '',
    followUpInDays: ''
  });

  // Step 3: Select patient
  const [patients, setPatients] = useState([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedPatientName, setSelectedPatientName] = useState('');

  useEffect(() => {
    if (step === 3) {
      const token = localStorage.getItem('doctorToken');
      setPatientsLoading(true);
      getDoctorPatients(doctorInfo.id, token)
        .then((list) => {
          setPatients(list);
          if (preselectedPatient?.id) {
            const match = list.find(p => String(p.id) === String(preselectedPatient.id));
            if (match) {
              setSelectedPatientId(String(match.id));
              setSelectedPatientName(match.name);
            }
          }
        })
        .catch((e) => setError(e.message))
        .finally(() => setPatientsLoading(false));
    }
  }, [step, doctorInfo.id, preselectedPatient?.id]);

  useEffect(() => {
    // If we have a preselected patient from navigation, jump to patient step and show their name
    if (preselectedPatient?.id) {
      setSelectedPatientId(String(preselectedPatient.id));
      setSelectedPatientName(preselectedPatient.name || 'Patient');
      setStep(1); // keep flow starting at step 1 but show name banner
    }
  }, [preselectedPatient]);

  const canGoNext = useMemo(() => {
    if (step === 1) {
      return items.length > 0 && items.every(i => i.name && i.dosage && i.frequency && i.duration);
    }
    if (step === 2) {
      return true; // optional fields
    }
    if (step === 3) {
      return Boolean(selectedPatientId);
    }
    return false;
  }, [step, items, selectedPatientId]);

  const addItem = () => {
    setItems(prev => [...prev, { name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const updateItem = (index, field, value) => {
    setItems(prev => prev.map((it, idx) => idx === index ? { ...it, [field]: value } : it));
  };

  const removeItem = (index) => {
    setItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      const token = localStorage.getItem('doctorToken');
      const payload = {
        doctorId: doctorInfo.id,
        patientId: selectedPatientId,
        items,
        additionalInfo: additional,
        createdAt: new Date().toISOString(),
      };
      await createPrescription(payload, token);
      setSuccess('Prescription created successfully');
      setTimeout(() => navigate('/doctor/dashboard'), 900);
    } catch (e) {
      setError(e.message || 'Failed to create prescription');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate('/doctor/dashboard')} className="p-2 rounded hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Add Prescription</h1>
          </div>
          <div className="text-sm text-gray-600">Dr. {doctorInfo.name}</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StepIndicator step={step} />

        {selectedPatientId && (
          <div className="mb-4 p-3 border border-blue-200 bg-blue-50 text-blue-700 rounded">
            Selected patient: <span className="font-medium">{selectedPatientName || preselectedPatient?.name || 'Patient'}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 border border-red-200 bg-red-50 text-red-700 rounded flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 border border-green-200 bg-green-50 text-green-700 rounded flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {success}
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          {step === 1 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center"><ClipboardList className="w-5 h-5 mr-2 text-blue-600"/> Prescription Items</h2>
              <div className="space-y-4">
                {items.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <input value={it.name} onChange={e => updateItem(idx, 'name', e.target.value)} placeholder="Medicine name" className="px-3 py-2 border rounded"/>
                    <input value={it.dosage} onChange={e => updateItem(idx, 'dosage', e.target.value)} placeholder="Dosage (e.g., 500mg)" className="px-3 py-2 border rounded"/>
                    <input value={it.frequency} onChange={e => updateItem(idx, 'frequency', e.target.value)} placeholder="Frequency (e.g., 2x/day)" className="px-3 py-2 border rounded"/>
                    <div className="flex">
                      <input value={it.duration} onChange={e => updateItem(idx, 'duration', e.target.value)} placeholder="Duration (e.g., 5 days)" className="px-3 py-2 border rounded w-full"/>
                      {items.length > 1 && (
                        <button onClick={() => removeItem(idx)} className="ml-2 text-red-600 text-sm">Remove</button>
                      )}
                    </div>
                  </div>
                ))}
                <button onClick={addItem} className="inline-flex items-center px-3 py-2 border rounded text-sm hover:bg-gray-50"><Plus className="w-4 h-4 mr-1"/> Add Item</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center"><Info className="w-5 h-5 mr-2 text-blue-600"/> Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Diagnosis</label>
                  <input value={additional.diagnosis} onChange={e => setAdditional(a => ({...a, diagnosis: e.target.value}))} placeholder="e.g., Acute bronchitis" className="w-full px-3 py-2 border rounded"/>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Follow-up in (days)</label>
                  <input type="number" min="0" value={additional.followUpInDays} onChange={e => setAdditional(a => ({...a, followUpInDays: e.target.value}))} placeholder="e.g., 7" className="w-full px-3 py-2 border rounded"/>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">Doctor Notes</label>
                  <textarea rows={4} value={additional.notes} onChange={e => setAdditional(a => ({...a, notes: e.target.value}))} placeholder="Add any special instructions or notes for the patient" className="w-full px-3 py-2 border rounded"/>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center"><User className="w-5 h-5 mr-2 text-blue-600"/> Select Patient</h2>
              {patientsLoading ? (
                <p className="text-sm text-gray-600">Loading patients...</p>
              ) : (
                <div className="space-y-3">
                  {patients.length === 0 ? (
                    <p className="text-sm text-gray-600">No patients found from your appointments.</p>
                  ) : (
                    patients.map(p => (
                      <label key={p.id} className={`flex items-center justify-between border rounded p-3 cursor-pointer ${String(selectedPatientId) === String(p.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{p.name}</p>
                          <p className="text-xs text-gray-600">{p.email || 'No email'} {p.lastHealthIssue ? `• ${p.lastHealthIssue}` : ''}</p>
                        </div>
                        <input type="radio" name="patient" checked={String(selectedPatientId) === String(p.id)} onChange={() => { setSelectedPatientId(String(p.id)); setSelectedPatientName(p.name); }} />
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <button onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1 || submitting} className="px-4 py-2 border rounded disabled:opacity-50">Back</button>
          {step < 3 ? (
            <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={!canGoNext || submitting} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Next</button>
          ) : (
            <button onClick={handleSubmit} disabled={!canGoNext || submitting} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50">
              {submitting ? 'Submitting...' : 'Create Prescription'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAddPrescription;


