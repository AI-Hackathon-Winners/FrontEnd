import React, { useState, useRef } from 'react';
import {
  FiSearch,
  FiEye,
  FiRepeat,
  FiMic,
  FiStopCircle,
  FiArrowLeft
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Conversations = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      channel: 'Email',
      participant: 'john@example.com',
      relationship: 'Investor',
      summary: 'Welcomed John to Bondly and introduced core features.',
      tone: 'Positive',
      date: '2025-05-12',
    },
    {
      id: 2,
      channel: 'Zoom',
      participant: 'jane@example.com',
      relationship: 'Customer',
      summary: 'Followed up after investor call; awaiting feedback.',
      tone: 'Neutral',
      date: '2025-05-18',
    },
  ]);
  const [channel, setChannel] = useState('');
  const [participant, setParticipant] = useState('');
  const [relationship, setRelationship] = useState('');
  const [summary, setSummary] = useState('');
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();
  
  

  // Remove automatic detection function since user inputs manually

  const handleSummarize = () => {
    // For demo, just set fixed summary and tone
    setSummary('The sender expresses strong interest  and requests more details to explore potential support.');
    setTone('Excited');
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
        setInputText(data.transcription);
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
            setInputText(data.transcription);
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
      console.error('Microphone access error:', err);
      alert('Microphone permission denied or not supported.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

   const handleGenerateFollowUp = () => {
  const followUpData = {
    channel: channel.trim() || 'Unknown',
    participant: participant.trim() || 'Unknown',
    relationship: relationship.trim() || 'Unknown',
    summary: summary.trim() || 'No summary provided',
  };

  // Navigate with state
  navigate('/followup', { state: followUpData });

  // Delay clearing to avoid premature UI changes
  setTimeout(() => {
    setChannel('');
    setParticipant('');
    setRelationship('');
    setSummary('');
  }, 0);
};


  

    return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
      >
        <FiArrowLeft /> Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-purple-800 mt-12">Conversation History</h1>
      </div>

      {/* Search */}
      <div className="flex items-center w-full md:max-w-md mb-8 border border-purple-300 rounded-full bg-white px-4 py-2 shadow-sm">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search by participant, channel, or tone..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Conversation Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-md mb-12">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Channel</th>
              <th className="p-4">Participant</th>
               <th className="p-4">Relationship</th>
              <th className="p-4">Summary</th>
              <th className="p-4">Tone</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {conversations.map((conv) => (
              <tr key={conv.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{conv.channel}</td>
                <td className="p-4">{conv.participant}</td>
                 <td className="p-4">{conv.relationship}</td>
                <td className="p-4">{conv.summary}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    conv.tone === 'Positive'
                      ? 'bg-green-100 text-green-700'
                      : conv.tone === 'Neutral'
                      ? 'bg-yellow-100 text-yellow-700'
                      : conv.tone === 'Excited'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {conv.tone}
                  </span>
                </td>
                <td className="p-4">{conv.date}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="text-purple-700 hover:underline" title="View Details">
                    <FiEye />
                  </button>
                 <button
                      onClick={handleGenerateFollowUp}
                      className="text-indigo-700 hover:underline"
                      title="Generate Follow-Up"
                 >
                      <FiRepeat />
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summarizer Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4 text-purple-800">AI Summarizer & Sentiment Detector</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste or record conversation notes..."
          rows={6}
          className="w-full rounded-lg border px-4 py-3 text-sm bg-gray-50"
        ></textarea>

            {/* Input fields for Channel and Participant */}
<div className="mt-4 flex flex-col md:flex-row gap-4">
   <input
        type="text"
        value={channel}
        onChange={(e) => setChannel(e.target.value)}
        placeholder="Channel (e.g., Email, Zoom)"
        className="w-full p-2 border rounded"
      />
    <input
        type="text"
        value={participant}
        onChange={(e) => setParticipant(e.target.value)}
        placeholder="Participant Name/Email"
        className="w-full p-2 border rounded"
      />
       <select
        value={relationship}
        onChange={(e) => setRelationship(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Relationship</option>
        <option value="Investor">Investor</option>
        <option value="Customer">Customer</option>
        <option value="Partner">Partner</option>
      </select>
</div>

        <div className="mt-4 flex justify-between flex-wrap gap-4">
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
            className="text-sm file:bg-purple-700 file:text-white file:px-4 file:py-1 file:rounded-full file:cursor-pointer"
          />

          <div className="flex gap-3 ml-auto">
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
                <FiStopCircle /> Stop
              </button>
            )}

            <button
              onClick={handleSummarize}
              className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
            >
              Generate Summary
            </button>
          </div>
        </div>

        {summary && (
          <div className="mt-6">
            <h3 className="font-semibold text-purple-800">Summary:</h3>
            <p className="text-sm text-gray-700 mt-1">{summary}</p>
            <h3 className="font-semibold text-purple-800 mt-4">Detected Tone:</h3>
            <p className="text-sm text-gray-700 mt-1">{tone}</p>
           
          </div>
        )}

               {summary && tone && channel && participant && (
          <button
            onClick={() => {
              const newConv = {
                id: Date.now(),
                channel: channel || 'Unknown',
                participant: participant || 'Unknown',
                relationship: relationship || 'Unknown',
                summary,
                tone,
                date: new Date().toISOString().split('T')[0],
              };
              setConversations((prev) => [newConv, ...prev]);
              setChannel('');
              setParticipant('');
              setRelationship('');
              setSummary('');
              setTone('');
              setInputText('');
            }}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
          >
            Save Conversation
          </button>
        )}

      </div>
    </div>
  );
};

export default Conversations;
