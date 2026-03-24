import { BarChart3, Eye, Calendar, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { name: "Total Profile Views", value: "2,451", icon: Eye, change: "+12.5%", changeType: "increase" },
    { name: "Meeting Requests", value: "14", icon: Calendar, change: "+2.1%", changeType: "increase" },
    { name: "Project Interactions", value: "852", icon: BarChart3, change: "-4.5%", changeType: "decrease" },
    { name: "Engagement Rate", value: "24.5%", icon: TrendingUp, change: "+4.3%", changeType: "increase" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">Last 30 Days</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{item.value}</p>
                </div>
                <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
                  <Icon className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4">
                <span
                  className={`text-sm font-medium ${
                    item.changeType === "increase" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change}
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Portfolio Activity</h2>
          <div className="space-y-4">
            {[
              { title: "New meeting booked", desc: "Jane Smith scheduled a 30m Intro Call", time: "2 hours ago" },
              { title: "Profile viewed by Company X", desc: "Someone from Apple Inc. viewed your 'Fintech App' case study.", time: "5 hours ago" },
              { title: "New endorsement", desc: "Mark Johnson endorsed your React skills", time: "1 day ago" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-50 hover:bg-gray-50 transition">
                <div className="h-10 w-10 bg-indigo-100 rounded-full flex-shrink-0 flex items-center justify-center text-indigo-600 font-bold">
                  {activity.title.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{activity.desc}</p>
                  <span className="text-xs text-gray-400 mt-2 block">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Placeholder Image */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <img 
            src="https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NzMxODE3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Dashboard Stats Illustration" 
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="font-bold text-gray-900">Need advanced analytics?</h3>
          <p className="text-sm text-gray-500 mt-2">Upgrade to Pro to see detailed company names and demographic data of your profile visitors.</p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 w-full">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
