import { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, ThermometerSun, AlertTriangle, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'motion/react';

export function WeatherMonitoring() {
  const [selectedFarm, setSelectedFarm] = useState('farm-1');

  const farms = [
    { id: 'farm-1', name: 'North Valley Farm', location: 'California' },
    { id: 'farm-2', name: 'Green Acres', location: 'Oregon' },
    { id: 'farm-3', name: 'Sunset Fields', location: 'Washington' },
  ];

  const currentWeather = {
    temp: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
    uvIndex: 6,
  };

  const hourlyForecast = [
    { time: '6 AM', temp: 58, rain: 0 },
    { time: '9 AM', temp: 64, rain: 5 },
    { time: '12 PM', temp: 72, rain: 20 },
    { time: '3 PM', temp: 75, rain: 35 },
    { time: '6 PM', temp: 70, rain: 15 },
    { time: '9 PM', temp: 62, rain: 5 },
  ];

  const weeklyForecast = [
    { day: 'Mon', high: 75, low: 58, rain: 20, icon: 'sun' },
    { day: 'Tue', high: 73, low: 60, rain: 35, icon: 'cloud-rain' },
    { day: 'Wed', high: 70, low: 58, rain: 60, icon: 'cloud-rain' },
    { day: 'Thu', high: 72, low: 59, rain: 40, icon: 'cloud' },
    { day: 'Fri', high: 76, low: 61, rain: 15, icon: 'sun' },
    { day: 'Sat', high: 78, low: 62, rain: 10, icon: 'sun' },
    { day: 'Sun', high: 77, low: 63, rain: 20, icon: 'cloud' },
  ];

  const soilMoisture = [
    { hour: '00:00', moisture: 45 },
    { hour: '04:00', moisture: 43 },
    { hour: '08:00', moisture: 48 },
    { hour: '12:00', moisture: 52 },
    { hour: '16:00', moisture: 55 },
    { hour: '20:00', moisture: 50 },
    { hour: '24:00', moisture: 47 },
  ];

  const alerts = [
    { type: 'warning', message: 'Heavy rain expected tomorrow afternoon', time: '2h ago', severity: 'high' },
    { type: 'info', message: 'Optimal irrigation window: 6 PM - 8 PM', time: '4h ago', severity: 'low' },
    { type: 'alert', message: 'Frost risk detected for Thursday night', time: '6h ago', severity: 'medium' },
  ];

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sun': return <Sun className="w-6 h-6 text-yellow-500" />;
      case 'cloud': return <Cloud className="w-6 h-6 text-gray-400" />;
      case 'cloud-rain': return <CloudRain className="w-6 h-6 text-blue-500" />;
      default: return <Sun className="w-6 h-6" />;
    }
  };

  return (
    <section className="py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 px-4 md:px-0">
          <h1 className="text-emerald-600 mb-2">Weather Intelligence</h1>
          <p className="text-lg md:text-xl text-gray-600">Real-time weather monitoring and predictive analytics for your farms</p>
        </div>

        {/* Farm Selector */}
        <div className="bg-white rounded-2xl p-3 md:p-4 shadow-lg mb-4 md:mb-6 mx-4 md:mx-0">
          <div className="flex gap-3 overflow-x-auto">
            {farms.map((farm) => (
              <button
                key={farm.id}
                onClick={() => setSelectedFarm(farm.id)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedFarm === farm.id
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-sm">{farm.name}</div>
                <div className="text-xs opacity-80">{farm.location}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Weather Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Weather */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 md:p-8 text-white shadow-lg">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <div>
                  <h2 className="text-white mb-2">Current Weather</h2>
                  <p className="text-sm md:text-base text-blue-100">North Valley Farm, California</p>
                </div>
                <Sun className="w-12 md:w-16 h-12 md:h-16 text-yellow-300" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div>
                  <div className="text-5xl mb-2">{currentWeather.temp}°F</div>
                  <div className="text-blue-100">{currentWeather.condition}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="w-8 h-8 text-blue-200" />
                  <div>
                    <div className="text-2xl">{currentWeather.humidity}%</div>
                    <div className="text-sm text-blue-100">Humidity</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="w-8 h-8 text-blue-200" />
                  <div>
                    <div className="text-2xl">{currentWeather.windSpeed} mph</div>
                    <div className="text-sm text-blue-100">Wind Speed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">24-Hour Forecast</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={hourlyForecast}>
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Area type="monotone" dataKey="temp" stroke="#10b981" fill="url(#tempGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="rain" stroke="#3b82f6" fill="url(#rainGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-gray-600">Temperature (°F)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-gray-600">Rain Chance (%)</span>
                </div>
              </div>
            </div>

            {/* Weekly Forecast */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">7-Day Forecast</h3>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                {weeklyForecast.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center"
                  >
                    <div className="text-gray-900 mb-2">{day.day}</div>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.icon)}
                    </div>
                    <div className="text-lg text-gray-900 mb-1">{day.high}°</div>
                    <div className="text-sm text-gray-500 mb-2">{day.low}°</div>
                    <div className="flex items-center justify-center gap-1 text-xs text-blue-600">
                      <Droplets className="w-3 h-3" />
                      <span>{day.rain}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Soil Moisture */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">Soil Moisture Levels</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={soilMoisture}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="hour" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip />
                  <Line type="monotone" dataKey="moisture" stroke="#059669" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-700">
                  <TrendingUp className="w-5 h-5" />
                  <span>Soil moisture is optimal for current crop growth stage</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Alerts */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">Weather Alerts</h3>
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-l-4 ${
                      alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                      alert.severity === 'medium' ? 'bg-orange-50 border-orange-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${
                        alert.severity === 'high' ? 'text-red-500' :
                        alert.severity === 'medium' ? 'text-orange-500' :
                        'text-blue-500'
                      }`} />
                      <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 ml-7">{alert.time}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-gray-900 mb-4">Today's Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <ThermometerSun className="w-6 h-6 text-orange-500" />
                    <span className="text-gray-700">UV Index</span>
                  </div>
                  <span className="text-orange-600">{currentWeather.uvIndex} (High)</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <CloudRain className="w-6 h-6 text-blue-500" />
                    <span className="text-gray-700">Rain Chance</span>
                  </div>
                  <span className="text-blue-600">{currentWeather.precipitation}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-6 h-6 text-emerald-500" />
                    <span className="text-gray-700">Irrigation</span>
                  </div>
                  <span className="text-emerald-600">Optimal</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="text-white mb-4">AI Recommendations</h3>
              <div className="space-y-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm">Delay harvesting by 2 days due to upcoming rain</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm">Increase irrigation tonight before temperature rise</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-sm">Apply frost protection measures for Thursday</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}