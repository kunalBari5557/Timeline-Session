import React from "react";
import {
  FaClipboard,
  FaDesktop,
  FaMicrophone,
  FaVideo,
  FaWifi,
} from "react-icons/fa";
import { Switch } from "antd";

const participants = [
  {
    name: "Arjun Kava",
    id: "ABC001",
    date: "11 July 2024, 11:59",
    duration: "20 Mins",
    timeline: [
      { icon: <FaDesktop />, time: "12:00" },
      { icon: <FaMicrophone />, time: "12:02" },
      { icon: <FaVideo />, time: "12:08" },
      { icon: <FaWifi />, time: "12:16", count: 3 },
    ],
  },
  {
    name: "Nikhil Chavda",
    id: "ABC002",
    date: "11 July 2024, 11:59",
    duration: "20 Mins",
    timeline: [
      { icon: <FaDesktop />, time: "12:00", count: 2 },
      { icon: <FaWifi />, time: "12:09" },
    ],
  },
  {
    name: "Ahmed Bhesaniya",
    id: "ABC003",
    date: "11 July 2024, 11:59",
    duration: "20 Mins",
    timeline: [
      { icon: <FaDesktop />, time: "12:00" },
      { icon: <FaVideo />, time: "12:08" },
      { icon: <FaWifi />, time: "12:16", count: 2 },
    ],
  },
];

function App() {
  return (
    <div className="w-full h-screen bg-[#1F1F1F] text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#393939] pb-2 mb-4">
        <div className="flex items-center gap-2">
          <FaClipboard className="text-white text-lg" />
          <h1 className="text-lg font-bold underline">
            Participants wise Session Timeline
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Show participant timeline</span>
          <Switch defaultChecked />
        </div>
      </div>

      {/* Timeline */}
      <div className="grid grid-cols-13 gap-2">
        {/* Timeline Header */}
        <div className="col-span-13 flex justify-between text-sm border-b border-[#393939] pb-2">
          {Array.from({ length: 11 }, (_, i) => (
            <div key={i} className="w-[80px] text-center">
              {`12:${String(i).padStart(2, "0")}`}
            </div>
          ))}
        </div>

        {/* Participant Rows */}
        {participants.map((participant, index) => (
          <div
            key={index}
            className="col-span-13 grid grid-cols-13 items-center gap-2 py-4 border-b border-[#393939]"
          >
            {/* Participant Details */}
            <div className="col-span-3 flex flex-col gap-1">
              <span className="text-base font-bold">{`${participant.name} (${participant.id})`}</span>
              <span className="text-sm">{participant.date}</span>
              <span className="text-sm">Duration {participant.duration}</span>
            </div>

            {/* Timeline */}
            <div className="col-span-9 flex items-center relative">
              {participant.timeline.map((event, eventIndex) => (
                <div key={eventIndex} className="relative flex items-center">
                  <div className="w-[2px] h-[30px] bg-blue-500 absolute left-1/2 -translate-x-1/2"></div>
                  <div
                    className="w-[25px] h-[25px] rounded-full bg-blue-500 flex items-center justify-center text-white z-10"
                    style={{ left: `${eventIndex * 80}px` }}
                  >
                    {event.count ? (
                      <span className="relative text-sm">{event.count}</span>
                    ) : (
                      event.icon
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View Details */}
            <div className="col-span-1 flex justify-end">
              <a href="#" className="text-blue-500 text-sm">
                View details &gt;
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
