'use client';

import { useEffect, useState } from 'react';
import { databases } from '@/lib/appwrite';
import { Query } from 'appwrite';

interface Event {
  $id: string;
  op: string;
  desc: string;
  date: string;
  age: number;
  tx: string;
}

export default function EventsTable() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    op: '',
    desc: '',
    date: '',
    age: '',
    tx: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        'event'
      );
      setEvents(response.documents as Event[]);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    return (
      event.op.toLowerCase().includes(filters.op.toLowerCase()) &&
      event.desc.toLowerCase().includes(filters.desc.toLowerCase()) &&
      event.tx.toLowerCase().includes(filters.tx.toLowerCase()) &&
      (filters.age === '' || event.age === parseInt(filters.age)) &&
      (filters.date === '' || event.date.includes(filters.date))
    );
  });

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 grid grid-cols-5 gap-4">
        {Object.keys(filters).map((key) => (
          <input
            key={key}
            type={key === 'age' ? 'number' : 'text'}
            placeholder={`Filter ${key}`}
            className="p-2 border rounded"
            onChange={(e) => setFilters(prev => ({
              ...prev,
              [key]: e.target.value
            }))}
          />
        ))}
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Operation</th>
            <th className="px-6 py-3 border-b">Description</th>
            <th className="px-6 py-3 border-b">Date</th>
            <th className="px-6 py-3 border-b">Age</th>
            <th className="px-6 py-3 border-b">Transaction</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.$id}>
              <td className="px-6 py-4 border-b">{event.op}</td>
              <td className="px-6 py-4 border-b">{event.desc}</td>
              <td className="px-6 py-4 border-b">
                {new Date(event.date).toLocaleString()}
              </td>
              <td className="px-6 py-4 border-b">{event.age}</td>
              <td className="px-6 py-4 border-b">{event.tx}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
