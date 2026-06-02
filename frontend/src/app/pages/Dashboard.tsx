import { BarChart3, Eye, Calendar, TrendingUp } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: "Total Profile Views", value: "2,451", icon: Eye, change: "+12.5%", changeType: "increase" },
    { name: "Meeting Requests", value: "14", icon: Calendar, change: "+2.1%", changeType: "increase" },
    { name: "Project Interactions", value: "852", icon: BarChart3, change: "-4.5%", changeType: "decrease" },
    { name: "Engagement Rate", value: "24.5%", icon: TrendingUp, change: "+4.3%", changeType: "increase" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          {user && <p className="text-gray-500 text-sm mt-1">Welcome back, <span className="font-medium text-indigo-600">{user.username}</span></p>}
        </div>
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
                <span className={`text-sm font-medium ${item.changeType === "increase" ? "text-green-600" : "text-red-600"}`}>
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
              { title: "Profile viewed by Company X", desc: "Someone from Apple Inc. viewed your portfolio.", time: "5 hours ago" },
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

        {/* Upgrade Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <div className="w-full h-40 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl mb-4 flex items-center justify-center">
            <TrendingUp className="w-16 h-16 text-indigo-400" />
          </div>
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
