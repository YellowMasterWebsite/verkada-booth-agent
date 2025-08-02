
// Verkada Booth Assignment Tracker - Updated UI with Aesthetic Design Principles

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 p-6 space-y-8">
      <motion.div 
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">🎯 Booth Assignment Portal</h1>
        <p className="text-gray-600 mt-2">Search your schedule and log your interactions seamlessly.</p>
        <Input
          type="email"
          placeholder="Enter your Verkada email"
          className="mt-4 shadow rounded-xl"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </motion.div>

      {assignments.length > 0 && (
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }}
        >
          <Card className="rounded-2xl shadow-lg border border-blue-100">
            <CardContent>
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">📋 Your Assignments</h2>
              <Table>
                <TableHead className="bg-blue-100 text-blue-800">
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Booth #</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Backup</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assignments.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell>{a.date}</TableCell>
                      <TableCell>{a.booth}</TableCell>
                      <TableCell>{a.start}–{a.end}</TableCell>
                      <TableCell>{a.backup}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {email && (
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
        >
          <Card className="rounded-2xl shadow-md border border-green-100 mt-8">
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold text-green-700">📝 Log Customer Interaction</h2>
              <Input
                placeholder="Customer Name"
                className="shadow rounded"
                value={logEntry.customer}
                onChange={e => setLogEntry({ ...logEntry, customer: e.target.value })}
              />
              <Input
                placeholder="Booth #"
                className="shadow rounded"
                value={logEntry.booth}
                onChange={e => setLogEntry({ ...logEntry, booth: e.target.value })}
              />
              <Input
                placeholder="Notes / Topics Discussed"
                className="shadow rounded"
                value={logEntry.notes}
                onChange={e => setLogEntry({ ...logEntry, notes: e.target.value })}
              />
              <Button onClick={handleLogSubmit} className="w-full bg-green-600 hover:bg-green-700">
                Submit Log
              </Button>
              {submitted && <p className="text-green-600 font-medium">✅ Log submitted!</p>}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
