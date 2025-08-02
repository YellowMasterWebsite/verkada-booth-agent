
// Verkada Booth Assignment Tracker - Minimal Tailwind UI

import { useEffect, useState } from "react";

export default function BoothDashboard() {
  const [email, setEmail] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [logEntry, setLogEntry] = useState({ customer: "", notes: "", booth: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (email) {
      fetch(`/api/get-assignments?email=${email}`)
        .then(res => res.json())
        .then(data => setAssignments(data));
    }
  }, [email]);

  const handleLogSubmit = () => {
    fetch("/api/submit-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...logEntry, bd: email })
    }).then(() => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
      setLogEntry({ customer: "", notes: "", booth: "" });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 p-6 space-y-10">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800">🎯 Booth Assignment Portal</h1>
        <p className="text-gray-600 mt-2">Search your schedule and log your interactions seamlessly.</p>
        <input
          type="email"
          placeholder="Enter your Verkada email"
          className="mt-4 p-3 border border-gray-300 rounded-xl shadow w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      {assignments.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6 border border-blue-100">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">📋 Your Assignments</h2>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Booth #</th>
                <th className="p-2 border">Time</th>
                <th className="p-2 border">Backup</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={i} className="text-center">
                  <td className="p-2 border">{a.date}</td>
                  <td className="p-2 border">{a.booth}</td>
                  <td className="p-2 border">{a.start}–{a.end}</td>
                  <td className="p-2 border">{a.backup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {email && (
        <div className="max-w-2xl mx-auto bg-white shadow rounded-xl p-6 border border-green-100">
          <h2 className="text-xl font-semibold text-green-700 mb-4">📝 Log Customer Interaction</h2>
          <input
            placeholder="Customer Name"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            value={logEntry.customer}
            onChange={e => setLogEntry({ ...logEntry, customer: e.target.value })}
          />
          <input
            placeholder="Booth #"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            value={logEntry.booth}
            onChange={e => setLogEntry({ ...logEntry, booth: e.target.value })}
          />
          <input
            placeholder="Notes / Topics Discussed"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            value={logEntry.notes}
            onChange={e => setLogEntry({ ...logEntry, notes: e.target.value })}
          />
          <button
            onClick={handleLogSubmit}
            className="w-full p-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Submit Log
          </button>
          {submitted && <p className="text-green-600 font-medium mt-3">✅ Log submitted!</p>}
        </div>
      )}
    </div>
  );
}
