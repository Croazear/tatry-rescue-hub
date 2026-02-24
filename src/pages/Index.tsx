import { useRescuers, useVehicles, useIncidents } from "@/hooks/useConvexData";
import { IncidentBanner } from "@/components/IncidentBanner";
import { RescuersList } from "@/components/RescuersList";
import { VehicleGrid } from "@/components/VehicleGrid";
import { DashboardMap } from "@/components/DashboardMap";
import { WeatherWidget } from "@/components/WeatherWidget";

const Dashboard = () => {
  const { data: rescuers } = useRescuers();
  const { data: vehicles } = useVehicles();
  const { data: incidents } = useIncidents();

  const activeRescuers = rescuers.filter((r) => r.status === "active");
  const latestIncident = incidents.find((i) => i.status === "active") || incidents[0];

  return (
    <div className="space-y-6">
      {latestIncident && <IncidentBanner incident={latestIncident} />}
      <WeatherWidget />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardMap rescuers={activeRescuers} incidents={incidents.filter(i => i.status === "active")} />
        </div>
        <div>
          <RescuersList rescuers={activeRescuers} title="Ratownicy na zmianie" />
        </div>
      </div>
      <VehicleGrid vehicles={vehicles} />
    </div>
  );
};

export default Dashboard;
