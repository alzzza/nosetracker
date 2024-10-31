import EventsTable from '@/components/EventsTable';

export default function DashboardPage() {
  const events = [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Events Dashboard</h1>
      <EventsTable events={events} />
    </div>
  );
}
