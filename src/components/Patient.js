import React, { useState, useEffect } from 'react';
import { Calendar, FileText, ChevronDown, Home, UserCircle, Calendar as CalendarIcon, Hospital } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      variant === 'primary'
        ? 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        : variant === 'outline'
        ? 'text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500'
        : 'text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children, icon: Icon }) => (
  <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex items-center justify-between">
    {children}
    {Icon && <Icon className="h-5 w-5 text-blue-600 ml-2" />}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg leading-6 font-medium text-gray-900">{children}</h3>
);

const CardContent = ({ children }) => <div className="px-4 py-5 sm:p-6">{children}</div>;

const CardFooter = ({ children }) => <div className="px-4 py-4 sm:px-6">{children}</div>;

const Input = ({ ...props }) => (
  <input
    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 h-6"
    {...props}
  />
);

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Select = ({ children, ...props }) => (
  <select
    className="mt-1 block w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
    {...props}
  >
    {children}
  </select>
);

export default function PatientDashboard() {
  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState('light');

  // Set font globally
  useEffect(() => {
    document.body.style.fontFamily = "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";
  }, []);

  // Dynamically load theme CSS
  useEffect(() => {
    let themeLink = document.getElementById('theme-style');
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.id = 'theme-style';
      document.head.appendChild(themeLink);
    }
    themeLink.href = theme === 'dark' ? '/src/theme-dark.css' : '/src/theme-light.css';
  }, [theme]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showPrescriptions, setShowPrescriptions] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [patientInfo, setPatientInfo] = useState(null);
  const [editedInfo, setEditedInfo] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointmentData, setAppointmentData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();

  const API_URL = 'https://vercel-backend-beta-eight.vercel.app';

  useEffect(() => {
    fetchPatientProfile();
    fetchDoctors();
    fetchAppointments();
    fetchPrescriptions();
  }, []);

  const fetchPatientProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const resp = await fetch(`${API_URL}/api/patient/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setPatientInfo(data);
        setEditedInfo(data);
      }
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_URL}/api/doctor/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    if (!doctorId || !date) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/patient/available-slots?doctorId=${doctorId}&date=${date}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const slots = await response.json();
        setAvailableSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_URL}/api/patient/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_URL}/api/patient/prescriptions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPrescriptions(data);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader icon={Calendar}>
          <CardTitle>Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointments.length}</div>
          {appointments.length > 0 ? (
            <p className="text-xs text-gray-500">
              Next: Dr. {appointments[0].doctorId.firstName} {appointments[0].doctorId.lastName} at {appointments[0].time}
            </p>
          ) : (
            <p className="text-xs text-gray-500">No appointments today</p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setShowAppointments(!showAppointments)}
          >
            {showAppointments ? 'Hide' : 'View'} Today's Appointments
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${showAppointments ? 'rotate-180' : ''}`}
            />
          </Button>
        </CardFooter>
        {showAppointments && (
          <div className="px-4 pb-4">
            {appointments.map((appointment, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-t">
                <div>
                  <p className="text-sm font-medium">
                    Dr. {appointment.doctorId.firstName} {appointment.doctorId.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{appointment.reason}</p>
                </div>
                <p className="text-sm">{appointment.time}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card>
        <CardHeader icon={FileText}>
          <CardTitle>Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{prescriptions.length}</div>
          <p className="text-xs text-gray-500">Active prescriptions</p>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full text-sm text-gray-500 hover:text-gray-900 transition-colors"
            onClick={() => setShowPrescriptions(!showPrescriptions)}
          >
            {showPrescriptions ? 'Hide' : 'View All'} Prescriptions
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${showPrescriptions ? 'rotate-180' : ''}`}
            />
          </Button>
        </CardFooter>
        {showPrescriptions && (
          <div className="px-4 pb-4">
            {prescriptions.map((p, index) => (
              <div key={index} className="py-2 border-t">
                <p className="text-sm font-medium">{p.medication}</p>
                <p className="text-xs text-gray-500">
                  {p.dosage} - {p.frequency}
                </p>
                <p className="text-xs text-gray-500">
                  Prescribed by: Dr. {p.doctorId.firstName} {p.doctorId.lastName}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderProfile = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/patient/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedInfo),
        });
        if (response.ok) {
          const updatedProfile = await response.json();
          setPatientInfo(updatedProfile);
          setIsEditing(false);
        }
      } catch {
        alert('Error updating profile');
      }
    };

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={isEditing ? editedInfo.firstName : patientInfo?.firstName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={isEditing ? editedInfo.lastName : patientInfo?.lastName}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={isEditing ? editedInfo.email : patientInfo?.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="mr-2">
                Save
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="ml-auto">
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  const renderAppointmentBooking = () => {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAppointmentData((prev) => ({ ...prev, [name]: value }));
      if (name === 'date' || name === 'doctorId') {
        fetchAvailableSlots(appointmentData.doctorId, value);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/api/patient/book-appointment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentData),
        });
        if (response.ok) {
          alert('Appointment booked successfully');
          setAppointmentData({ doctorId: '', date: '', time: '', reason: '' });
          setAvailableSlots([]);
        }
      } catch {
        alert('Error booking appointment');
      }
    };

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="doctorId">Select Doctor</Label>
              <Select
                id="doctorId"
                name="doctorId"
                value={appointmentData.doctorId}
                onChange={handleInputChange}
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Appointment Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={appointmentData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="time">Preferred Time</Label>
              <Select
                id="time"
                name="time"
                value={appointmentData.time}
                onChange={handleInputChange}
                disabled={availableSlots.length === 0}
              >
                <option value="">Choose a time slot</option>
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="reason">Reason for Visit</Label>
              <Input
                id="reason"
                name="reason"
                value={appointmentData.reason}
                onChange={handleInputChange}
                placeholder="Brief description"
              />
            </div>
            <Button type="submit" className="ml-auto">
              Book Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container" style={{ fontFamily: "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif" }}>
      <aside style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: 60, background: 'rgba(30,41,59,0.95)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0', zIndex: 1000 }}>
        <button
          className="button mb-4"
          style={{ width: 40, height: 40, borderRadius: 20, fontSize: 18, fontWeight: 700 }}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      </aside>
      <div style={{ marginLeft: 70 }}>
        <header className="header">
          <div className="flex items-center space-x-2">
            <Hospital className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl">Hospital Management System</span>
          </div>
          <button className="button" onClick={() => navigate('/')}>Sign Out</button>
        </header>
        <nav className="bg-blue-700 text-white p-4 rounded-lg mb-6">
          <ul className="flex space-x-4 justify-center">
            <li>
              <button
                className={`button ${activeTab === 'Dashboard' ? '' : 'bg-white text-blue-700 border border-blue-600'}`}
                onClick={() => setActiveTab('Dashboard')}
              >
                <Home className="w-4 h-4 mr-2 inline" /> Dashboard
              </button>
            </li>
            <li>
              <button
                className={`button ${activeTab === 'Profile' ? '' : 'bg-white text-blue-700 border border-blue-600'}`}
                onClick={() => setActiveTab('Profile')}
              >
                <UserCircle className="w-4 h-4 mr-2 inline" /> Profile
              </button>
            </li>
            <li>
              <button
                className={`button ${activeTab === 'Appointment Booking' ? '' : 'bg-white text-blue-700 border border-blue-600'}`}
                onClick={() => setActiveTab('Appointment Booking')}
              >
                <CalendarIcon className="w-4 h-4 mr-2 inline" /> Appointment Booking
              </button>
            </li>
          </ul>
        </nav>
        <main>
          <h1 className="text-4xl font-bold text-blue-900 mb-8">
            Welcome, {patientInfo?.firstName} {patientInfo?.lastName}
          </h1>
          {activeTab === 'Dashboard' && renderDashboard()}
          {activeTab === 'Profile' && renderProfile()}
          {activeTab === 'Appointment Booking' && renderAppointmentBooking()}
        </main>
      </div>
    </div>
  );
}
