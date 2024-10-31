import EventsTable from '@/components/EventsTable';
import { Event } from '@/types'; // Import your Event type

export default function DashboardPage() {
  const events: Event[] = [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events Dashboard</h1>
      <EventsTable events={events} />
    </div>
  );
}
