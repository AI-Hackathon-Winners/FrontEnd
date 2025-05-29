import React from 'react'
import { useState, useRef } from 'react';
import { FiSearch, FiPlus, FiEye, FiRepeat, FiMic, FiStopCircle } from 'react-icons/fi';


const Email = () => {
  const emails = [
    {
      id: 1,
      subject: 'Welcome to InsightCRM',
      recipient: 'john@example.com',
      body: 'Hi John, welcome to InsightCRM! We’re excited to have you on board.',
      status: 'Sent',
      sentAt: '2025-05-12',
    },
    {
      id: 2,
      subject: 'Follow-up on Demo',
      recipient: 'jane@example.com',
      body: 'Hi Jane, just following up on our demo. Let us know if you have any questions.',
      status: 'Scheduled',
      sentAt: '2025-05-18',
    },
  ];

  const [emailText, setEmailText] = useState('');
  const [summary, setSummary] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [form, setForm] = useState({ to: '', subject: '', body: '' });
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSummarize = () => {
    setSummary('This email is about welcoming the customer and introducing them to InsightCRM.');
    setSentiment('Positive');
  };

  const handleComposeChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleComposeSubmit = (e) => {
    e.preventDefault();
    alert(`Email sent to ${form.to} with subject "${form.subject}"`);
    setForm({ to: '', subject: '', body: '' });
    setShowComposeModal(false);
  };

  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const res = await fetch('http://localhost:5000/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.transcription) {
        setEmailText(data.transcription);
      } else {
        alert('Transcription failed.');
      }
    } catch (err) {
      console.error('Error uploading audio:', err);
      alert('Error transcribing audio.');
    }
  };

  const handleRecord = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          const res = await fetch('http://localhost:5000/api/transcribe', {
            method: 'POST',
            body: formData,
          });
          const data = await res.json();
          if (data.transcription) {
            setEmailText(data.transcription);
          } else {
            alert('Transcription failed.');
          }
        } catch (err) {
          console.error('Error uploading audio:', err);
          alert('Error transcribing audio.');
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Microphone permission denied or not supported.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
     <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-800">Emails</h1>
        <button
          onClick={() => setShowComposeModal(true)}
          className="flex items-center gap-2 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          <FiPlus /> Compose Email
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center w-full md:max-w-sm border border-purple-300 rounded-full bg-white px-4 py-2 shadow-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input type="text" placeholder="Search emails..." className="w-full outline-none text-sm" />
        </div>
        <select className="rounded-full px-4 py-2 border text-sm shadow-sm focus:ring-purple-500 focus:outline-none">
          <option value="">All Statuses</option>
          <option value="Sent">Sent</option>
          <option value="Failed">Failed</option>
          <option value="Scheduled">Scheduled</option>
        </select>
      </div>

      <div className="overflow-auto bg-white rounded-xl shadow-md mb-10">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Subject</th>
              <th className="p-4">Recipient</th>
              <th className="p-4">Status</th>
              <th className="p-4">Sent At</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{email.subject}</td>
                <td className="p-4">{email.recipient}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    email.status === 'Sent'
                      ? 'bg-green-100 text-green-700'
                      : email.status === 'Scheduled'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {email.status}
                  </span>
                </td>
                <td className="p-4">{email.sentAt}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button
                    className="text-purple-700 hover:underline"
                    title="View"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <FiEye />
                  </button>
                  {email.status !== 'Sent' && (
                    <button className="text-indigo-700 hover:underline" title="Resend">
                      <FiRepeat />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-purple-800">Summarize Email or Chat</h2>
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Paste customer email or chat here..."
          rows={6}
          className="w-full rounded-lg border px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        ></textarea>

       <div className="mt-4 flex justify-between items-center flex-wrap gap-4">
  {/* Left: File Upload */}
  <input
    type="file"
    accept="audio/*"
    onChange={handleAudioUpload}
    className="text-sm file:bg-purple-700 file:text-white file:px-4 file:py-1 file:rounded-full file:cursor-pointer"
  />

  {/* Right: Buttons Group */}
  <div className="flex gap-4 ml-auto">
    {!isRecording ? (
      <button
        onClick={handleRecord}
        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
      >
        <FiMic /> Record Voice
      </button>
    ) : (
      <button
        onClick={handleStopRecording}
        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
      >
        <FiStopCircle /> Stop Recording
      </button>
    )}

    <button
      onClick={handleSummarize}
      className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
    >
      Summarize
    </button>
  </div>
</div>


        {summary && (
          <div className="mt-6">
            <h3 className="font-semibold text-purple-800">Summary:</h3>
            <p className="text-sm text-gray-700 mt-1">{summary}</p>
            <h3 className="font-semibold text-purple-800 mt-4">Sentiment:</h3>
            <p className="text-sm text-gray-700 mt-1">{sentiment}</p>
          </div>
        )}
      </div>


      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-purple-800">Compose Email</h2>
            <form onSubmit={handleComposeSubmit} className="space-y-4">
              <input
                type="email"
                name="to"
                value={form.to}
                onChange={handleComposeChange}
                placeholder="Recipient email"
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleComposeChange}
                placeholder="Subject"
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <textarea
                name="body"
                value={form.body}
                onChange={handleComposeChange}
                placeholder="Write your email..."
                rows={6}
                required
                className="w-full rounded-lg border px-4 py-2 bg-gray-100"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 rounded-full border text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {selectedEmail && (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-purple-800 mb-4">Email Preview</h2>
            <p><span className="font-semibold text-gray-700">To:</span> {selectedEmail.recipient}</p>
            <p><span className="font-semibold text-gray-700">Subject:</span> {selectedEmail.subject}</p>
            <p><span className="font-semibold text-gray-700">Status:</span> {selectedEmail.status}</p>
            <p className="mt-4 text-sm text-gray-800 whitespace-pre-line border rounded-md p-4 bg-gray-50">
              {selectedEmail.body}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setSelectedEmail(null)}
                className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Email