import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  Calendar as CalendarIcon, Clock, Video, ChevronRight, ChevronLeft,
  CheckCircle, X, CalendarCheck, Trash2,
} from "lucide-react";

interface Host {
  id: string;
  name: string;
  title: string;
  duration: number;
  description: string;
  color: string;
  initials: string;
}

interface Booking {
  id: string;
  hostId: string;
  hostName: string;
  hostInitials: string;
  hostColor: string;
  meetingTitle: string;
  date: string;
  time: string;
  duration: number;
  bookedAt: string;
}

const HOSTS: Host[] = [
  {
    id: "alex",
    name: "Alex Chen",
    title: "Product Manager",
    duration: 30,
    description: "Discuss your product vision, roadmap priorities, and how we can align your goals with a concrete execution plan.",
    color: "from-violet-400 to-indigo-500",
    initials: "AC",
  },
  {
    id: "sarah",
    name: "Sarah Kim",
    title: "UX Designer",
    duration: 45,
    description: "Walk through your design challenges, review wireframes, and explore how to create a seamless user experience.",
    color: "from-pink-400 to-rose-500",
    initials: "SK",
  },
  {
    id: "marcus",
    name: "Marcus Johnson",
    title: "Tech Lead",
    duration: 60,
    description: "Deep-dive into architecture decisions, code reviews, or technical feasibility of your next big feature.",
    color: "from-emerald-400 to-teal-500",
    initials: "MJ",
  },
  {
    id: "emma",
    name: "Emma Davis",
    title: "Marketing Strategist",
    duration: 30,
    description: "Craft a go-to-market strategy, refine your brand messaging, and identify growth opportunities.",
    color: "from-amber-400 to-orange-500",
    initials: "ED",
  },
  {
    id: "ryan",
    name: "Ryan Park",
    title: "Sales Consultant",
    duration: 45,
    description: "Explore how we can work together, discuss partnership options, and get a tailored proposal for your needs.",
    color: "from-cyan-400 to-blue-500",
    initials: "RP",
  },
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "01:00 PM", "01:30 PM", "02:00 PM",
  "03:00 PM", "04:00 PM",
];

function loadBookings(): Booking[] {
  try {
    return JSON.parse(localStorage.getItem("pp_bookings") ?? "[]");
  } catch { return []; }
}

function saveBookings(bookings: Booking[]) {
  localStorage.setItem("pp_bookings", JSON.stringify(bookings));
}

function Avatar({ host, size = "md" }: { host: Pick<Host, "initials" | "color">; size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "lg" ? "w-16 h-16 text-xl" : size === "sm" ? "w-9 h-9 text-xs" : "w-12 h-12 text-sm";
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br ${host.color} flex items-center justify-center font-bold text-white shadow-md flex-shrink-0`}>
      {host.initials}
    </div>
  );
}

export default function Schedule() {
  const [tab, setTab] = useState<"book" | "bookings">("book");
  const [selectedHost, setSelectedHost] = useState<Host>(HOSTS[0]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(loadBookings);

  const today = new Date();
  const days = Array.from({ length: 7 }).map((_, i) => addDays(today, i));

  useEffect(() => { setSelectedTime(null); }, [selectedDate, selectedHost]);

  function handleConfirm() {
    if (!selectedTime) return;
    const booking: Booking = {
      id: crypto.randomUUID(),
      hostId: selectedHost.id,
      hostName: selectedHost.name,
      hostInitials: selectedHost.initials,
      hostColor: selectedHost.color,
      meetingTitle: `${selectedHost.duration} min call with ${selectedHost.name}`,
      date: format(selectedDate, "MMMM d, yyyy"),
      time: selectedTime,
      duration: selectedHost.duration,
      bookedAt: new Date().toISOString(),
    };
    const updated = [booking, ...bookings];
    setBookings(updated);
    saveBookings(updated);
    setConfirmed(booking);
    setSelectedTime(null);
  }

  function deleteBooking(id: string) {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    saveBookings(updated);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Confirmation modal */}
      {confirmed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center relative">
            <button onClick={() => setConfirmed(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X className="w-5 h-5" />
            </button>
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-1">Booking Confirmed!</h2>
            <p className="text-gray-500 text-sm mb-4">with {confirmed.hostName}</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <p className="text-sm text-gray-700"><span className="font-medium">Date:</span> {confirmed.date}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">Time:</span> {confirmed.time}</p>
              <p className="text-sm text-gray-700"><span className="font-medium">Duration:</span> {confirmed.duration} min</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">Meeting details will be sent to your email.</p>
            <button
              onClick={() => { setConfirmed(null); setTab("bookings"); }}
              className="w-full py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              View My Bookings
            </button>
          </div>
        </div>
      )}

      {/* Header + tabs */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Meeting Scheduler</h1>
        <p className="text-gray-500 text-sm mt-1">Set your availability and let clients book time with you.</p>
        <div className="flex gap-1 mt-4 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setTab("book")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition ${tab === "book" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            Book a Meeting
          </button>
          <button
            onClick={() => setTab("bookings")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${tab === "bookings" ? "bg-white shadow text-gray-900" : "text-gray-500 hover:text-gray-700"}`}
          >
            <CalendarCheck className="w-4 h-4" />
            My Bookings
            {bookings.length > 0 && (
              <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {bookings.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── BOOK TAB ── */}
      {tab === "book" && (
        <>
          {/* Host grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {HOSTS.map(host => (
              <button
                key={host.id}
                onClick={() => setSelectedHost(host)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition text-center ${
                  selectedHost.id === host.id
                    ? "border-indigo-500 bg-indigo-50 shadow-sm"
                    : "border-gray-100 bg-white hover:border-indigo-200 hover:bg-gray-50"
                }`}
              >
                <Avatar host={host} size="md" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">{host.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{host.title}</p>
                  <span className="inline-block mt-1.5 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {host.duration} min
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Booking panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
            {/* Left: host details */}
            <div className="w-full lg:w-1/3 p-6 sm:p-8 bg-gray-50 border-r border-gray-100">
              <div className="mb-6 flex items-start gap-4">
                <Avatar host={selectedHost} size="lg" />
                <div>
                  <p className="text-sm font-medium text-gray-500">{selectedHost.title}</p>
                  <h2 className="text-xl font-bold text-gray-900 mt-0.5">{selectedHost.name}</h2>
                </div>
              </div>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span>{selectedHost.duration} min</span>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">Video call link sent upon confirmation.</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed pt-2 border-t border-gray-200">
                  {selectedHost.description}
                </p>
              </div>
            </div>

            {/* Right: calendar + time */}
            <div className="w-full lg:w-2/3 p-6 sm:p-8 flex flex-col md:flex-row gap-8">
              {/* Calendar */}
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
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} className="text-xs font-medium text-gray-400 py-2">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  <div className="p-2" /><div className="p-2" />
                  {days.map((date, i) => {
                    const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(date)}
                        className={`aspect-square flex items-center justify-center rounded-full text-sm font-medium transition ${
                          isSelected ? "bg-indigo-600 text-white shadow-md" : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                        }`}
                      >
                        {format(date, "d")}
                      </button>
                    );
                  })}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <button key={`pad-${i}`} className="aspect-square flex items-center justify-center rounded-full text-sm font-medium text-gray-300">
                      {format(addDays(today, 7 + i), "d")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="w-full md:w-48 flex-shrink-0">
                <h3 className="text-lg font-bold text-gray-900 mb-6 text-center md:text-left">
                  {format(selectedDate, "EEEE, MMM d")}
                </h3>
                <div className="h-[300px] overflow-y-auto pr-2 space-y-2">
                  {TIME_SLOTS.map(time => (
                    <div key={time} className="flex flex-col gap-2">
                      <button
                        onClick={() => setSelectedTime(selectedTime === time ? null : time)}
                        className={`w-full py-3 px-4 rounded-lg text-sm font-medium transition border ${
                          selectedTime === time
                            ? "bg-gray-800 border-gray-800 text-white"
                            : "bg-white border-indigo-200 text-indigo-700 hover:border-indigo-600"
                        }`}
                      >
                        {time}
                      </button>
                      {selectedTime === time && (
                        <button
                          onClick={handleConfirm}
                          className="w-full py-3 px-4 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition"
                        >
                          Confirm
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sync calendar */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">Sync with your Calendar</h3>
              <p className="text-sm text-gray-500 mt-1">Connect your Google or Outlook calendar to prevent double booking.</p>
            </div>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
              Connect Account
            </button>
          </div>
        </>
      )}

      {/* ── MY BOOKINGS TAB ── */}
      {tab === "bookings" && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 flex flex-col items-center text-center">
              <CalendarCheck className="w-12 h-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">No bookings yet</h3>
              <p className="text-sm text-gray-400 mb-6">Head over to "Book a Meeting" to schedule your first call.</p>
              <button
                onClick={() => setTab("book")}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Book a Meeting
              </button>
            </div>
          ) : (
            bookings.map(b => (
              <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5">
                <Avatar host={{ initials: b.hostInitials, color: b.hostColor }} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{b.meetingTitle}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5" /> {b.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {b.time}</span>
                    <span className="flex items-center gap-1"><Video className="w-3.5 h-3.5" /> {b.duration} min video call</span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                  <CheckCircle className="w-3.5 h-3.5" /> Confirmed
                </span>
                <button
                  onClick={() => deleteBooking(b.id)}
                  className="ml-2 text-gray-300 hover:text-red-500 transition flex-shrink-0"
                  title="Cancel booking"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
