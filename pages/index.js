
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [logEntry, setLogEntry] = useState({ customer: "", notes: "", booth: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (email) {
      fetch(`https://tulikajatrele1.app.n8n.cloud/webhook-test/922f548e-378e-4b3c-a578-bdf15307c0f6/get-assignments?email=${email}`)
        .then(res => res.json())
        .then(data => setAssignments(data));
    }
  }, [email]);

  const handleLogSubmit = () => {
    fetch("https://tulikajatrele1.app.n8n.cloud/webhook-test/90e6e378-5a50-44da-9e60-c727d904bf98/submit-log", {
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
    <main className="p-6 space-y-6 font-sans">
      <div className="max-w-xl mx-auto space-y-4">
        <h2 className="text-xl font-semibold">🔍 Check Your Booth Assignments</h2>
        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Enter your Verkada email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {assignments.length > 0 && (
          <table className="w-full border mt-4">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Booth</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Backup</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, i) => (
                <tr key={i}>
                  <td className="border p-2">{a.Date}</td>
                  <td className="border p-2">{a["Booth #"]}</td>
                  <td className="border p-2">{a["Start Time"]}–{a["End Time"]}</td>
                  <td className="border p-2">{a["Backup BD"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {email && (
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold">📝 Log Customer Interaction</h2>
          <input
            className="border p-2 w-full"
            placeholder="Customer Name"
            value={logEntry.customer}
            onChange={e => setLogEntry({ ...logEntry, customer: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Booth #"
            value={logEntry.booth}
            onChange={e => setLogEntry({ ...logEntry, booth: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Notes"
            value={logEntry.notes}
            onChange={e => setLogEntry({ ...logEntry, notes: e.target.value })}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleLogSubmit}
          >
            Submit
          </button>
          {submitted && <p className="text-green-600">✅ Log submitted!</p>}
        </div>
      )}
    </main>
  );
}
