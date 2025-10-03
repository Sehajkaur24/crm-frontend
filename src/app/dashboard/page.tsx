import React from 'react';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-[#7555B1] mb-4">Welcome!</h2>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Users', count: 56 },
          { title: 'Total Leads', count: 128 },
          { title: 'Opportunities', count: 46 },
          { title: 'Pending Tasks', count: 9 },
        ].map((card, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-sm text-gray-500">{card.title}</h3>
            <p className="text-2xl font-semibold text-[#7555B1]">{card.count}</p>
          </div>
        ))}
      </div>

      {/* CRM Activity Summary (focused on events + tasks) */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-md font-semibold mb-2 text-[#7555B1]">Activity Summary</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>📅 Upcoming Events: 8</li>
          <li>✅ Completed Tasks: 23</li>
          <li>📌 Pending Tasks: 9</li>
        </ul>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-md font-semibold mb-2 text-[#7555B1]">Upcoming Deadlines</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>📌 Task: Submit proposal - Due Tomorrow</li>
          <li>📅 Event: Client Demo - Oct 2, 11:00 AM</li>
          <li>✅ Task: Contract Review - Due Oct 5</li>
        </ul>
      </div>


      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-md font-semibold mb-3 text-[#7555B1]">Quick Add</h3>
        <div className="flex gap-3">
          <button className="px-3 py-1 bg-[#7555B1] text-white rounded-lg text-sm hover:bg-[#5e4392] transition">
            + Lead
          </button>
          <button className="px-3 py-1 bg-[#7555B1] text-white rounded-lg text-sm hover:bg-[#5e4392] transition">
            + Task
          </button>
          <button className="px-3 py-1 bg-[#7555B1] text-white rounded-lg text-sm hover:bg-[#5e4392] transition">
            + Event
          </button>
        </div>
      </div>

 
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-bold text-[#7555B1] mb-2">Recent Activities</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>🔐 User John logged in at 10:00 AM</li>
          <li>✏️ Lead "Acme Corp" updated by Sarah</li>
          <li>✅ Task "Follow up with client" marked complete</li>
          <li>📅 Event "Q4 Planning" scheduled by Admin</li>
        </ul>
      </div>
    </div>
  );
}
