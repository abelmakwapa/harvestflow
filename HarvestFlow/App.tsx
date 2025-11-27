import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Marketplace } from './components/Marketplace';
import { SmartLogistics } from './components/SmartLogistics';
import { WeatherMonitoring } from './components/WeatherMonitoring';
import { QualityAssessment } from './components/QualityAssessment';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'marketplace':
        return <Marketplace />;
      case 'logistics':
        return <SmartLogistics />;
      case 'weather':
        return <WeatherMonitoring />;
      case 'quality':
        return <QualityAssessment />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return (
          <>
            <Hero setActiveSection={setActiveSection} />
            <Features setActiveSection={setActiveSection} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      {renderSection()}
      <Footer />
    </div>
  );
}
