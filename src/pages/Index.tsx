import { rescuers, vehicles, incidents } from "@/data/mockData";
import { IncidentBanner } from "@/components/IncidentBanner";
import { RescuersList } from "@/components/RescuersList";
import { VehicleGrid } from "@/components/VehicleGrid";
import { DashboardMap } from "@/components/DashboardMap";

const Dashboard = () => {
  const activeRescuers = rescuers.filter((r) => r.status === "active");
  const latestIncident = incidents.find((i) => i.status === "active") || incidents[0];

  return (
    <div className="space-y-6">
      {/* Latest incident banner */}
      <IncidentBanner incident={latestIncident} />

      {/* Main content: map + rescuers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardMap rescuers={activeRescuers} incidents={incidents.filter(i => i.status === "active")} />
        </div>
        <div>
          <RescuersList rescuers={activeRescuers} title="Ratownicy na zmianie" />
        </div>
      </div>

      {/* Vehicles */}
      <VehicleGrid vehicles={vehicles} />
    </div>
  );
};

export default Dashboard;
