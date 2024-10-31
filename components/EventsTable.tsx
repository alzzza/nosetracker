import React, { useState, useMemo } from 'react';
import { Event } from '../types';

interface EventsTableProps {
  events: Event[];
}

export default function EventsTable({ events }: EventsTableProps) {
  const [filters, setFilters] = useState({
    op: '',
    desc: '',
    date: '',
    age: '',
    tx: ''
  });

  // Filtered data using useMemo for performance
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      return (
        // Operator filter
        event.op.toLowerCase().includes(filters.op.toLowerCase()) &&
        // Description filter
        event.desc.toLowerCase().includes(filters.desc.toLowerCase()) &&
        // Date filter (if date is provided)
        (filters.date === '' || 
          new Date(event.date).toLocaleDateString().includes(filters.date)) &&
        // Age filter
        (filters.age === '' || 
          event.age.toString().includes(filters.age)) &&
        // Treatment filter
        event.tx.toLowerCase().includes(filters.tx.toLowerCase())
      );
    });
  }, [events, filters]);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full">
      {/* Filter inputs */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <input
          type="text"
          name="op"
          placeholder="Filter by Operator"
          value={filters.op}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="desc"
          placeholder="Filter by Description"
          value={filters.desc}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="date"
          placeholder="Filter by Date"
          value={filters.date}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="age"
          placeholder="Filter by Age"
          value={filters.age}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="tx"
          placeholder="Filter by Treatment"
          value={filters.tx}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Operator</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Treatment</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{event.op}</td>
                <td className="px-4 py-2">{event.desc}</td>
                <td className="px-4 py-2">
                  {new Date(event.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{event.age}</td>
                <td className="px-4 py-2">{event.tx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
