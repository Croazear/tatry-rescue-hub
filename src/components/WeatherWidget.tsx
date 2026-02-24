import { Cloud, Thermometer, Wind, Droplets, Mountain } from "lucide-react";

const weatherData = {
  temp: -8,
  feelsLike: -14,
  wind: 45,
  humidity: 78,
  conditions: "Snow, fog above 1800m",
  warning: "Avalanche risk: level 3/5",
};

export function WeatherWidget() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Mountain className="w-4 h-4 text-info" />
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Weather – Tatras</h3>
        <span className="ml-auto text-xs text-muted-foreground">24.02.2026, 15:00</span>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-info" />
          <div>
            <p className="text-lg font-bold">{weatherData.temp}°C</p>
            <p className="text-xs text-muted-foreground">Feels like {weatherData.feelsLike}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">{weatherData.wind} km/h</p>
            <p className="text-xs text-muted-foreground">Wind</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">{weatherData.humidity}%</p>
            <p className="text-xs text-muted-foreground">Humidity</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-semibold">{weatherData.conditions}</p>
          </div>
        </div>
        <div className="ml-auto px-3 py-1.5 rounded-md bg-warning/20 border border-warning/30">
          <p className="text-xs font-semibold text-warning">{weatherData.warning}</p>
        </div>
      </div>
    </div>
  );
}
