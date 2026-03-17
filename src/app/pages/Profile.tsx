import { MapPin, Link as LinkIcon, Edit3, Plus, Github, Linkedin, Twitter } from "lucide-react";

export default function Profile() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 w-full relative">
          <button className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white px-3 py-1.5 rounded-lg text-sm backdrop-blur-sm flex items-center">
            <Edit3 className="w-4 h-4 mr-2" /> Change Cover
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 sm:px-10 pb-8">
          <div className="relative flex justify-between items-end -mt-16 sm:-mt-20 mb-6">
            <img
              src="https://images.unsplash.com/flagged/photo-1579967353707-713ede7a3bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzczMTUxMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-md object-cover"
            />
            <div className="flex gap-3 mb-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700 flex items-center">
                Preview Profile
              </button>
              <button className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-700 text-white flex items-center">
                <Edit3 className="w-4 h-4 mr-2" /> Edit Details
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alex Designer</h1>
            <p className="text-lg text-gray-600 mt-1">Senior Product Designer @ TechCorp | UI/UX Specialist</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> San Francisco, CA</span>
              <span className="flex items-center"><LinkIcon className="w-4 h-4 mr-1" /> alexdesigner.com</span>
              <span className="text-indigo-600 font-medium cursor-pointer hover:underline">14.2k followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">About Me</h2>
              <button className="text-gray-400 hover:text-indigo-600"><Edit3 className="w-5 h-5" /></button>
            </div>
            <p className="text-gray-600 leading-relaxed">
              I am a passionate Product Designer with over 8 years of experience creating user-centric digital products. 
              My expertise lies in translating complex problems into simple, intuitive, and beautiful interfaces. 
              Currently, I'm leading design systems at TechCorp and mentoring junior designers in my free time.
            </p>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Experience</h2>
              <button className="text-indigo-600 hover:text-indigo-700 flex items-center text-sm font-medium">
                <Plus className="w-4 h-4 mr-1" /> Add Role
              </button>
            </div>
            
            <div className="space-y-6">
              {[
                { role: "Senior Product Designer", company: "TechCorp", period: "2020 - Present", desc: "Leading the core product design team and establishing the company-wide design system." },
                { role: "UI/UX Designer", company: "Creative Agency", period: "2017 - 2020", desc: "Designed responsive websites and mobile applications for global clients." },
              ].map((job, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <BriefcaseIcon />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{job.role}</h3>
                    <p className="text-gray-600">{job.company} &bull; {job.period}</p>
                    <p className="text-sm text-gray-500 mt-2">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Top Skills</h2>
              <button className="text-gray-400 hover:text-indigo-600"><Plus className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {["UI Design", "UX Research", "Figma", "Design Systems", "Prototyping", "User Testing", "HTML/CSS"].map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Social Links</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition">
                <Linkedin className="w-5 h-5 mr-3" /> LinkedIn Profile
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition">
                <Twitter className="w-5 h-5 mr-3" /> Twitter @alexdesigner
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-50 transition">
                <Github className="w-5 h-5 mr-3" /> GitHub /alexd
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}
