import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { Calendar as CalendarIcon, Clock, Users, Video, ChevronRight, ChevronLeft } from "lucide-react";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate simple next 7 days for calendar
  const today = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => addDays(today, i));

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "01:00 PM", "01:30 PM", "02:00 PM", 
    "03:00 PM", "04:00 PM"
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Meeting Scheduler</h1>
        <p className="text-gray-500 text-sm mt-1">Set your availability and let clients book time with you.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Meeting Details */}
        <div className="w-full lg:w-1/3 p-6 sm:p-8 bg-gray-50 border-r border-gray-100">
          <div className="mb-6">
            <img 
              src="https://images.unsplash.com/flagged/photo-1579967353707-713ede7a3bba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzczMTUxMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Alex"
              className="w-16 h-16 rounded-full object-cover mb-4 shadow-sm"
            />
            <p className="text-sm font-medium text-gray-500">Alex Designer</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">Project Discovery Call</h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>30 min</span>
            </div>
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-gray-400" />
              <span>Web conferencing details provided upon confirmation.</span>
            </div>
            <div className="flex items-start gap-3 mt-4">
              <Users className="w-5 h-5 text-gray-400 mt-1" />
              <p className="text-sm leading-relaxed">
                Book a time to discuss your project needs, design goals, and how we can work together to build something amazing.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Calendar & Times */}
        <div className="w-full lg:w-2/3 p-6 sm:p-8 flex flex-col md:flex-row gap-8">
          
          {/* Calendar Picker Mockup */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-indigo-600" />
              Select a Date
            </h3>
            
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-800">{format(selectedDate, "MMMM yyyy")}</h4>
              <div className="flex space-x-2">
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600"><ChevronLeft className="w-5 h-5" /></button>
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-600"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-xs font-medium text-gray-400 py-2">{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* Dummy padding for calendar start */}
              <div className="p-2"></div><div className="p-2"></div>
              
              {days.map((date, i) => {
                const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square flex items-center justify-center rounded-full text-sm font-medium transition ${
                      isSelected 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'
                    }`}
                  >
                    {format(date, 'd')}
                  </button>
                );
              })}
              {/* Dummy padding end */}
              {Array.from({length: 12}).map((_, i) => (
                 <button key={`pad-${i}`} className="aspect-square flex items-center justify-center rounded-full text-sm font-medium text-gray-400 hover:bg-gray-50">
                   {format(addDays(today, 7 + i), 'd')}
                 </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="w-full md:w-48 flex-shrink-0">
            <h3 className="text-lg font-bold text-gray-900 mb-6 text-center md:text-left">
              {format(selectedDate, "EEEE, MMM d")}
            </h3>
            <div className="h-[300px] overflow-y-auto pr-2 space-y-2">
              {timeSlots.map((time) => (
                <div key={time} className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedTime(time)}
                    className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition border ${
                      selectedTime === time
                        ? 'bg-gray-800 border-gray-800 text-white'
                        : 'bg-white border-indigo-200 text-indigo-700 hover:border-indigo-600'
                    }`}
                  >
                    {time}
                  </button>
                  {selectedTime === time && (
                    <button className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition">
                      Confirm
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Connected Calendars Setup */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900">Sync with your Calendar</h3>
          <p className="text-sm text-gray-500 mt-1">Connect your Google or Outlook calendar to prevent double booking.</p>
        </div>
        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
          Connect Account
        </button>
      </div>

    </div>
  );
}
