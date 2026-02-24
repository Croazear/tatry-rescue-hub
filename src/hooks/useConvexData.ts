/**
 * Hooks to fetch data from Convex with fallback to mock data.
 * When VITE_CONVEX_URL is not set, mock data is used.
 */
import { useQuery } from "convex/react";
import { convex } from "@/lib/convex";
import * as mockData from "@/data/mockData";
import { api } from "../../convex/_generated/api";

export function useRescuers() {
  const convexData = convex ? useQuery(api.rescuers.list) : undefined;
  if (!convex) return { data: mockData.rescuers, isLoading: false };
  return { data: convexData ?? [], isLoading: convexData === undefined };
}

export function useVehicles() {
  const convexData = convex ? useQuery(api.vehicles.list) : undefined;
  if (!convex) return { data: mockData.vehicles, isLoading: false };
  return { data: convexData ?? [], isLoading: convexData === undefined };
}

export function useIncidents() {
  const convexData = convex ? useQuery(api.incidents.list) : undefined;
  if (!convex) return { data: mockData.incidents, isLoading: false };
  return { data: convexData ?? [], isLoading: convexData === undefined };
}

export function useZones() {
  const convexData = convex ? useQuery(api.zones.list) : undefined;
  if (!convex) return { data: mockData.zones, isLoading: false };
  return { data: convexData ?? [], isLoading: convexData === undefined };
}

export function useScheduleEntries() {
  const convexData = convex ? useQuery(api.scheduleEntries.list) : undefined;
  if (!convex) return { data: mockData.scheduleEntries, isLoading: false };
  return { data: convexData ?? [], isLoading: convexData === undefined };
}
