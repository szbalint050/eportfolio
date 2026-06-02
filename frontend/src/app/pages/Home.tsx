import { Link } from "react-router";
import { ArrowRight, LayoutDashboard, Calendar, Briefcase, UserCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-gray-900">PortfolioPro</div>
          <div className="space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-6">
            Showcase your work.<br className="hidden sm:block" />
            <span className="text-indigo-600">Attract opportunities.</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            The all-in-one e-portfolio platform for professionals. Build your profile, display your projects, and schedule meetings with potential clients seamlessly.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="flex items-center bg-gray-100 text-gray-900 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-50 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Dashboard Analytics",
                  description: "Track views and engagement on your portfolio.",
                  icon: LayoutDashboard,
                },
                {
                  title: "Professional Profile",
                  description: "Highlight your skills, experience, and background.",
                  icon: UserCircle,
                },
                {
                  title: "Project Showcase",
                  description: "Display case studies, companies, and achievements.",
                  icon: Briefcase,
                },
                {
                  title: "Meeting Scheduler",
                  description: "Let clients book time with you directly.",
                  icon: Calendar,
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="h-12 w-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
