# Doctor Video Call Demo Guide

## 🩺 Complete Doctor Video Call System

### How to Access Doctor Portal:

1. **Main Navigation**: Click "Doctor Portal" in the top navigation
2. **Direct URL**: Visit `http://localhost:3001/doctor`
3. **Dashboard**: Click "Access Doctor Dashboard" to enter

### Doctor Dashboard Features:

- **Appointment List**: View all scheduled appointments
- **Patient Information**: See patient details, health issues, and symptoms
- **Start Video Calls**: Click "Start Call" button for any appointment
- **Quick Stats**: Overview of daily appointments

### Doctor Video Call Process:

1. **From Dashboard**: Click "Start Call" on any appointment
2. **Direct Access**: Use URL `http://localhost:3001/doctor/video-call/{appointmentId}`
3. **Doctor Interface**: Enhanced interface with patient info and medical context

### Current Test Appointment:

- **Appointment ID**: `68c31bc9e79350cc31340a98`
- **Patient**: Test Patient (test@example.com)
- **Doctor**: Dr. Sarah Johnson (General Physician)
- **Date**: December 20, 2024 at 10:00 AM
- **Health Issue**: Consultation
- **Room Name**: `mediconnect-68c31bc9e79350cc31340a98`

### Demo Workflow:

#### Option 1: Same Device Demo
1. Open patient video call: `http://localhost:3001/video-call/68c31bc9e79350cc31340a98`
2. Open doctor video call in new tab: `http://localhost:3001/doctor/video-call/68c31bc9e79350cc31340a98`
3. Both will join the same Jitsi room

#### Option 2: Multi-Device Demo
1. Patient uses: `http://localhost:3001/video-call/68c31bc9e79350cc31340a98`
2. Doctor uses: `http://localhost:3001/doctor/video-call/68c31bc9e79350cc31340a98`
3. Or use the "Open in New Tab" buttons for fallback

### Key Differences:

**Patient Video Call**:
- Simple interface focused on joining the consultation
- Basic patient information display
- Simplified controls

**Doctor Video Call**:
- Professional medical interface
- Complete patient information panel
- Medical context (health issues, symptoms)
- Enhanced controls and features
- Doctor branding and identification

### Features:

✅ **Dual Interface**: Separate patient and doctor video call interfaces
✅ **Same Room**: Both parties join the same Jitsi meeting room
✅ **Medical Context**: Doctor sees patient medical information
✅ **Professional UI**: Doctor-specific branding and layout
✅ **Dashboard Integration**: Doctor can start calls from appointment list
✅ **Responsive Design**: Works on desktop and mobile devices
✅ **Error Handling**: Comprehensive error handling and fallbacks

### Technical Implementation:

- **Room Naming**: Uses appointment ID for unique room names
- **User Identification**: Different display names for doctor vs patient
- **Medical Information**: Patient health data shown to doctor
- **Professional Tools**: Enhanced Jitsi configuration for medical use
- **Navigation**: Proper routing between patient and doctor interfaces

Both patient and doctor now have dedicated, professional video calling interfaces!