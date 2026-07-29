export default function DashboardCard({
  title,
  value
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3>{title}</h3>
      <p className="text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}
