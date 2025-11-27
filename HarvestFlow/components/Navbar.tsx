import { Leaf, ShoppingCart, TruckIcon, Cloud, Camera, LayoutDashboard } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Leaf },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingCart },
    { id: 'logistics', label: 'Logistics', icon: TruckIcon },
    { id: 'weather', label: 'Weather', icon: Cloud },
    { id: 'quality', label: 'AI Grading', icon: Camera },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              HarvestFlow AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-emerald-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
              Log In
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all">
              Get Started
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                    : 'text-gray-700 bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
