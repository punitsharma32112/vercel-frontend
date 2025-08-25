import React from 'react';
import {
  Calendar, Clipboard, Cog, DollarSign, HeartPulse,
  Hospital, Shield, User, Users, Clock, ChartBar, Globe
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Button = ({ children, primary, onClick, ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-full shadow transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      primary
        ? 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
        : 'text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500'
    }`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ icon: Icon, title, description, primary }) => (
  <div className={`rounded-2xl shadow-lg p-6 transition-all bg-white hover:shadow-xl`}>
    <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-4 text-sm">{description}</p>
    <Button primary>Explore</Button>
  </div>
);

const Section = ({ children, bg, height }) => (
  <section className={`${height || 'py-20'} ${bg} content-center`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
      {children}
    </div>
  </section>
);

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = (route) => {
    navigate(route);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <header className="flex items-center justify-between px-6 py-5 bg-white shadow">
        <div className="flex items-center gap-2">
          <Hospital className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-semibold text-gray-800">Hospital Management System</span>
        </div>
        <nav className="flex items-center gap-4">
          <Button primary onClick={() => handleButtonClick('/login')}>Login</Button>
          <Button onClick={() => handleButtonClick('/signup')}>Sign Up</Button>
        </nav>
      </header>

      <main className="flex-1">
        <Section bg="bg-gradient-to-r from-blue-700 to-blue-500 text-white" height="min-h-[30rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-full">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Streamline Your Hospital Management
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                Optimize patient care, streamline operations, and improve hospital efficiency with our all-in-one system.
              </p>
              <div className="flex gap-4 ">
                <Button primary onClick={() => handleButtonClick('/login')}>Explore Features</Button>
                <Button primary onClick={() => handleButtonClick('/login')}>Appointments</Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src="home-1.jpeg" alt="Hospital Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: User, title: "Patient Management", description: "Efficiently manage patient records, appointments, and medical history." },
              { icon: Hospital, title: "Doctor Management", description: "Manage doctor profiles, schedules, and patient assignments." },
              { icon: Calendar, title: "Appointment Scheduling", description: "Streamline appointment booking and management for patients and doctors." }
            ].map((card, index) => (
              <Card key={index} {...card} primary />
            ))}
          </div>
        </Section>

        <Section bg="bg-gray-100" height="min-h-[25rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src="home-2.jpeg" alt="Dashboard" className="w-full object-cover h-64" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Modernize Your Hospital Operations</h2>
              <p className="text-gray-600 text-lg mb-6">
                Deliver better outcomes through smart workflows and automated tools that save time and reduce human error.
              </p>
              <div className="flex gap-4">
                <Button primary onClick={() => handleButtonClick('/login')}>Explore Features</Button>
                <Button onClick={() => handleButtonClick('/login')}>Appointments</Button>
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">
            Why Choose Our Hospital Management System?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Clipboard, title: "Improved Efficiency", description: "Reduces paperwork and improves overall hospital efficiency." },
              { icon: Users, title: "Enhanced Patient Care", description: "Intelligent scheduling and full patient records improve care." },
              { icon: DollarSign, title: "Cost Savings", description: "Optimize operations and reduce overhead costs." },
              { icon: HeartPulse, title: "Improved Patient Outcomes", description: "Drive better outcomes and satisfaction." },
              { icon: Shield, title: "Secure Data Management", description: "Robust encryption and access control to protect data." },
              { icon: Cog, title: "Customizable Solutions", description: "Configure the system to match your hospital workflows." },
              { icon: Clock, title: "Time-Saving Features", description: "Automate tasks and reduce manual workload." },
              { icon: ChartBar, title: "Advanced Analytics", description: "Gain insights with detailed reports and dashboards." },
              { icon: Globe, title: "Scalable Infrastructure", description: "Designed to grow with your hospital or network." }
            ].map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </Section>
      </main>

      <footer className="bg-white py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-gray-600 text-sm">&copy; 2024 Hospital Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
