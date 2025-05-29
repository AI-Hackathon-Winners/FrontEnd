import React from 'react'
import  { useState, useRef,  useEffect } from 'react';
import { FiDownload, FiPlus, FiTrash, FiSettings } from 'react-icons/fi';
import { useReactToPrint } from 'react-to-print';

const Invoice = () => {
   const [recipient, setRecipient] = useState('');
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [invoiceId, setInvoiceId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [sender, setSender] = useState({
    name: 'WebWhiz Creations',
    address: 'Accra, Ghana',
    email: 'hello@webwhiz.com',
    phone: '+233 000 000 000'
  });
  const [history, setHistory] = useState([]);
  const invoiceRef = useRef();

  useEffect(() => {
    setInvoiceId(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
    setInvoiceDate(new Date().toISOString().split('T')[0]);
    const saved = localStorage.getItem('invoiceHistory');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveInvoice = () => {
    const newInvoice = {
      invoiceId,
      invoiceDate,
      recipient,
      sender,
      items,
      total: items.reduce((sum, item) => sum + item.quantity * item.price, 0)
    };
    const updatedHistory = [newInvoice, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('invoiceHistory', JSON.stringify(updatedHistory));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === 'name' ? value : parseFloat(value);
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: 'Invoice',
    onAfterPrint: saveInvoice
  });

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-800">🧾 Invoice Creator</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2 text-sm text-purple-600 border border-purple-600 px-4 py-2 rounded-full hover:bg-purple-100"
        >
          <FiSettings /> Edit Sender Info
        </button>
      </div>

      {showSettings && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Sender Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={sender.name}
              onChange={(e) => setSender({ ...sender, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Address"
              value={sender.address}
              onChange={(e) => setSender({ ...sender, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email"
              value={sender.email}
              onChange={(e) => setSender({ ...sender, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Phone"
              value={sender.phone}
              onChange={(e) => setSender({ ...sender, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>
      )}

       {/* History Viewer */}
      {history.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold text-purple-700 mb-4">Invoice History</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {history.map((inv, idx) => (
              <li key={idx} className="border rounded px-4 py-2 bg-gray-50">
                <strong>{inv.invoiceId}</strong> • {inv.invoiceDate} • To: {inv.recipient} • Total: GHS {inv.total.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Invoice Form */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice ID</label>
            <input
              type="text"
              value={invoiceId}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={invoiceDate}
              disabled
              className="w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-600 focus:outline-none"
          />
        </div>

        {/* Item List */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2 items-end">
              <input
                type="text"
                placeholder="Item name"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                className="w-1/2 px-4 py-2 border rounded-md focus:ring-purple-600 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                min={1}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                className="w-1/6 px-2 py-2 border rounded-md focus:ring-purple-600 focus:outline-none"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                min={0}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                className="w-1/4 px-4 py-2 border rounded-md focus:ring-purple-600 focus:outline-none"
              />
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-4 inline-flex items-center gap-2 text-sm bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
          >
            <FiPlus /> Add Item
          </button>
        </div>
      </div>

      {/* Preview + Download */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div ref={invoiceRef} className="text-sm text-gray-800">
          <h2 className="text-xl font-bold text-purple-800 mb-2">Invoice</h2>
          <p><span className="font-semibold">Invoice ID:</span> {invoiceId}</p>
          <p><span className="font-semibold">Date:</span> {invoiceDate}</p>

          <div className="mt-4">
            <p className="font-semibold text-gray-700">From:</p>
            <p>{sender.name}</p>
            <p>{sender.address}</p>
            <p>{sender.email}</p>
            <p>{sender.phone}</p>
          </div>

          <div className="mt-4">
            <p className="font-semibold text-gray-700">To:</p>
            <p>{recipient || 'N/A'}</p>
          </div>

          <table className="w-full mt-4 border-t border-b text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Item</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-1">{item.name || '—'}</td>
                  <td className="py-1">{item.quantity}</td>
                  <td className="py-1">GHS {item.price.toFixed(2)}</td>
                  <td className="py-1">GHS {(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="py-2 text-right font-semibold">Total</td>
                <td className="py-2 font-bold text-purple-800">GHS {total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-yellow-400 text-purple-900 px-6 py-2 rounded-full hover:bg-yellow-300 font-semibold"
          >
            <FiDownload /> Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export default Invoice