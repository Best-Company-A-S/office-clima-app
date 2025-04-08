"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Thermometer,
  Droplet,
  BarChart,
  Activity,
  Clock,
  Loader2,
  Plus,
  X,
  ArrowLeftRight,
  ChevronDown,
  Settings,
  BarChart3,
} from "lucide-react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { DeviceReadingsChart } from "@/components/DeviceReadingsChart";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { format, subDays, subHours, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DeviceData {
  id: string;
  deviceId: string;
  temperature: number;
  humidity: number;
  createdAt: string;
  roomId?: string;
}

interface DeviceReading {
  id: string;
  temperature: number;
  humidity: number;
  deviceId: string;
  createdAt: string;
}

interface RoomData {
  id: string;
  name: string;
  type: string | null;
  size: number | null;
  capacity: number | null;
  devices?: any[];
  _count?: {
    devices: number;
  };
}

interface DailyTrend {
  time: string;
  temperature: number;
  humidity: number;
  timestamp: Date;
}

interface ClimateQuality {
  status: "excellent" | "good" | "moderate" | "poor" | "bad";
  emoji: string;
  message: string;
  color: string;
  details?: {
    roomVolume?: number;
    requiredAirflow?: number;
    co2Load?: number;
    idealTempRange?: [number, number];
    idealHumidityRange?: [number, number];
  };
}

interface DeviceInfo {
  id: string;
  name: string;
  roomId?: string;
  roomName?: string;
}

// Define the room climate calculation function
const calculateRoomClimate = (
  size: number,
  capacity: number,
  roomType: string,
  height: number = 2.5 // Default ceiling height in meters if not provided
): {
  roomVolume: number;
  requiredAirflow: number;
  co2Load: number;
  idealTempRange: [number, number];
  idealHumidityRange: [number, number];
  recommendedACH: number;
} => {
  // Room dimensions estimation (assuming square room if only size is given)
  const roomLength = Math.sqrt(size);
  const roomWidth = Math.sqrt(size);

  // Room volume in cubic meters
  const roomVolume = size * height;

  // Define ACH (Air Changes per Hour) based on room type
  const roomTypeSettings: {
    [key: string]: {
      ach: number;
      idealTemp: [number, number];
      idealHumidity: [number, number];
    };
  } = {
    house: { ach: 8, idealTemp: [20, 22], idealHumidity: [40, 60] },
    office: { ach: 15, idealTemp: [20, 22], idealHumidity: [40, 60] },
    meeting_room: { ach: 15, idealTemp: [20, 22], idealHumidity: [40, 60] },
    classroom: { ach: 12, idealTemp: [20, 24], idealHumidity: [40, 60] },
    conference: { ach: 12, idealTemp: [20, 22], idealHumidity: [40, 60] },
    hospital: { ach: 15, idealTemp: [20, 22], idealHumidity: [40, 60] },
    lab: { ach: 20, idealTemp: [20, 22], idealHumidity: [40, 60] },
    gym: { ach: 20, idealTemp: [18, 22], idealHumidity: [40, 60] },
    restaurant: { ach: 20, idealTemp: [18, 22], idealHumidity: [40, 60] },
    library: { ach: 12, idealTemp: [20, 22], idealHumidity: [40, 60] },
    common_area: { ach: 10, idealTemp: [20, 22], idealHumidity: [40, 60] },
    other: { ach: 12, idealTemp: [20, 22], idealHumidity: [40, 60] },
  };

  // Use type mapping or default to office settings
  const settings = roomTypeSettings[roomType] || roomTypeSettings.office;

  // Required airflow in CFM (Cubic Feet per Minute)
  const roomVolumeInFt3 = roomVolume * 35.3147; // Convert m³ to ft³
  const requiredAirflow = (roomVolumeInFt3 * settings.ach) / 60;

  // CO₂ load calculation based on number of people
  const co2Load = capacity * 0.005; // CO₂ load in m³/min (average person produces 0.005 m³/min)

  return {
    roomVolume,
    requiredAirflow,
    co2Load,
    idealTempRange: settings.idealTemp,
    idealHumidityRange: settings.idealHumidity,
    recommendedACH: settings.ach,
  };
};

const Dashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [deviceData, setDeviceData] = useState<DeviceData[]>([]);
  const [dailyTrendData, setDailyTrendData] = useState<DailyTrend[]>([]);
  const [comfortData, setComfortData] = useState<ClimateQuality>({
    status: "moderate",
    emoji: "😐",
    message: "Moderate Climate",
    color: "text-yellow-500",
  });
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [settings, setSettings] = useState<{
    temperatureUnit: string;
    humidityUnit: string;
  }>({
    temperatureUnit: "C",
    humidityUnit: "%",
  });

  // Comparison related states
  const [allRooms, setAllRooms] = useState<RoomData[]>([]);
  const [allDevices, setAllDevices] = useState<DeviceInfo[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState<"rooms">("rooms"); // Only allow rooms
  const [comparisonData, setComparisonData] = useState<{
    [key: string]: {
      name: string;
      color: string;
      data: DailyTrend[];
    };
  }>({});
  const [isComparing, setIsComparing] = useState(false);
  const [isLoadingComparison, setIsLoadingComparison] = useState(false);
  const [comparisonOptions, setComparisonOptions] = useState({
    showLegend: true,
    showGrid: true,
    normalizeScales: false,
    smoothCurves: true,
    showAverage: false,
    includeHumidity: true,
  });

  // Generate random color for each item in comparison
  const getRandomColor = () => {
    const colors = [
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 206, 86)",
      "rgb(75, 192, 192)",
      "rgb(153, 102, 255)",
      "rgb(255, 159, 64)",
      "rgb(199, 199, 199)",
      "rgb(83, 102, 255)",
      "rgb(255, 102, 166)",
      "rgb(102, 255, 166)",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Chart configuration
  const dailyTrendConfig: ChartConfig = {
    temperature: {
      label: "Temperature",
      icon: Thermometer,
      theme: {
        light: "hsl(340, 70%, 50%)",
        dark: "hsl(340, 70%, 60%)",
      },
    },
    humidity: {
      label: "Humidity",
      icon: Droplet,
      theme: {
        light: "hsl(220, 70%, 50%)",
        dark: "hsl(220, 70%, 60%)",
      },
    },
  };

  // Calculate comfort index based on temperature and humidity
  const calculateComfortIndex = (
    temperature: number,
    humidity: number
  ): number => {
    // Simple comfort index based on temperature and humidity
    // Higher values are more comfortable (scale 0-100)

    // Optimal temperature is around 21-23°C
    const tempFactor = 100 - Math.abs(temperature - 22) * 5;

    // Optimal humidity is around 40-60%
    const humidFactor = 100 - Math.abs(humidity - 50) * 1.2;

    // Combined comfort value (weighted average)
    return Math.min(100, Math.max(0, tempFactor * 0.6 + humidFactor * 0.4));
  };

  // Calculate activity level based on temperature and humidity changes
  const calculateActivityLevel = (readings: DeviceReading[]): number => {
    if (readings.length < 2) return 0;

    // Calculate variance in measurements (more variance = more activity)
    const temperatures = readings.map((r) => r.temperature);
    const humidities = readings.map((r) => r.humidity);

    const tempVariance = calculateVariance(temperatures);
    const humidVariance = calculateVariance(humidities);

    // Scale to a 0-100 value
    return Math.min(100, Math.max(0, tempVariance * 10 + humidVariance * 0.5));
  };

  // Helper function to calculate variance
  const calculateVariance = (values: number[]): number => {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map((val) => Math.pow(val - avg, 2));
    return Math.sqrt(
      squareDiffs.reduce((sum, val) => sum + val, 0) / values.length
    );
  };

  // Define room climate assessment function using the room data
  const assessRoomClimate = (
    temperature: number,
    humidity: number,
    room: RoomData | null
  ): ClimateQuality => {
    // Debug information
    console.log("Climate assessment inputs:", { temperature, humidity, room });

    // Default values for when room data is missing
    const defaultClimate: ClimateQuality = {
      status: "moderate",
      emoji: "😐",
      message: "Moderate Climate",
      color: "text-yellow-500",
    };

    // If we don't have room data or essential room data is missing, use basic assessment
    if (!room || room.size === null || room.capacity === null || !room.type) {
      console.log("Using basic climate assessment due to missing room data");
      return assessBasicClimate(temperature, humidity);
    }

    try {
      // Calculate detailed room climate metrics
      const roomMetrics = calculateRoomClimate(
        room.size,
        room.capacity,
        room.type
      );

      console.log("Room climate metrics:", roomMetrics);

      // Get ideal ranges
      const [tempMin, tempMax] = roomMetrics.idealTempRange;
      const [humidMin, humidMax] = roomMetrics.idealHumidityRange;

      // Calculate deviation from ideal ranges (0 = perfect, higher = worse)
      let tempDeviation = 0;
      if (temperature < tempMin) {
        tempDeviation = tempMin - temperature;
      } else if (temperature > tempMax) {
        tempDeviation = temperature - tempMax;
      }

      let humidDeviation = 0;
      if (humidity < humidMin) {
        humidDeviation = (humidMin - humidity) / 5; // Scale humidity deviation
      } else if (humidity > humidMax) {
        humidDeviation = (humidity - humidMax) / 5; // Scale humidity deviation
      }

      // Factor in room size per person for air quality consideration
      const spacePerPerson = room.size / room.capacity;
      const spaceDeviation = Math.max(0, 4 - spacePerPerson) / 2; // 4 m² per person is a good baseline

      // Combine deviations to get overall score (lower is better)
      const combinedDeviation = tempDeviation + humidDeviation + spaceDeviation;

      console.log("Climate deviations:", {
        tempDeviation,
        humidDeviation,
        spaceDeviation,
        combinedDeviation,
      });

      // Determine climate quality based on combined deviation
      let result: ClimateQuality;

      if (combinedDeviation < 1) {
        result = {
          status: "excellent",
          emoji: "😊",
          message: "Excellent Climate",
          color: "text-green-500",
        };
      } else if (combinedDeviation < 2.5) {
        result = {
          status: "good",
          emoji: "🙂",
          message: "Good Climate",
          color: "text-green-400",
        };
      } else if (combinedDeviation < 4) {
        result = {
          status: "moderate",
          emoji: "😐",
          message: "Moderate Climate",
          color: "text-yellow-500",
        };
      } else if (combinedDeviation < 6) {
        result = {
          status: "poor",
          emoji: "🙁",
          message: "Poor Climate",
          color: "text-orange-500",
        };
      } else {
        result = {
          status: "bad",
          emoji: "😫",
          message: "Bad Climate",
          color: "text-red-500",
        };
      }

      // Add detailed metrics to the result
      result.details = {
        roomVolume: roomMetrics.roomVolume,
        requiredAirflow: Math.round(roomMetrics.requiredAirflow),
        co2Load: parseFloat(roomMetrics.co2Load.toFixed(3)),
        idealTempRange: roomMetrics.idealTempRange,
        idealHumidityRange: roomMetrics.idealHumidityRange,
      };

      console.log("Final climate assessment:", result);
      return result;
    } catch (error) {
      console.error("Error in detailed room assessment:", error);
      // Fallback to basic assessment if something goes wrong
      return assessBasicClimate(temperature, humidity);
    }
  };

  // Function for basic climate assessment when room data is not available
  const assessBasicClimate = (
    temperature: number,
    humidity: number
  ): ClimateQuality => {
    console.log("Basic climate assessment with:", { temperature, humidity });

    // Default ideal ranges
    const tempMin = 20;
    const tempMax = 24;
    const humidMin = 40;
    const humidMax = 60;

    // Calculate deviation from ideal ranges (0 = perfect, higher = worse)
    let tempDeviation = 0;
    if (temperature < tempMin) {
      tempDeviation = tempMin - temperature;
    } else if (temperature > tempMax) {
      tempDeviation = temperature - tempMax;
    }

    let humidDeviation = 0;
    if (humidity < humidMin) {
      humidDeviation = (humidMin - humidity) / 5; // Scale humidity deviation
    } else if (humidity > humidMax) {
      humidDeviation = (humidity - humidMax) / 5; // Scale humidity deviation
    }

    // Combine deviations to get overall score (lower is better)
    const combinedDeviation = tempDeviation + humidDeviation;

    console.log("Basic climate deviations:", {
      tempDeviation,
      humidDeviation,
      combinedDeviation,
    });

    // Determine climate quality based on combined deviation - more responsive scale
    if (combinedDeviation < 0.5) {
      return {
        status: "excellent",
        emoji: "😊",
        message: "Excellent Climate",
        color: "text-green-500",
      };
    } else if (combinedDeviation < 1.5) {
      return {
        status: "good",
        emoji: "🙂",
        message: "Good Climate",
        color: "text-green-400",
      };
    } else if (combinedDeviation < 3) {
      return {
        status: "moderate",
        emoji: "😐",
        message: "Moderate Climate",
        color: "text-yellow-500",
      };
    } else if (combinedDeviation < 5) {
      return {
        status: "poor",
        emoji: "🙁",
        message: "Poor Climate",
        color: "text-orange-500",
      };
    } else {
      return {
        status: "bad",
        emoji: "😫",
        message: "Bad Climate",
        color: "text-red-500",
      };
    }
  };

  useEffect(() => {
    const fetchComparisonData = async () => {
      if (!selectedItems.length || !isComparing) return;

      setIsLoadingComparison(true);
      const teamId = searchParams.get("teamId");
      if (!teamId) return;

      const newComparisonData: any = {};

      try {
        for (const itemId of selectedItems) {
          let endpoint = "";
          let itemName = "";
          const color = getRandomColor();

          // Only fetch room data since we're only comparing rooms
          const room = allRooms.find((r) => r.id === itemId);
          if (!room) continue;

          itemName = room.name;
          endpoint = `/api/devices/readings/stats?roomId=${itemId}&period=day`;

          const response = await axios.get(endpoint);

          let trendData: DailyTrend[] = [];

          if (response.data?.timeSeriesData?.length > 0) {
            // Process room statistics data
            trendData = response.data.timeSeriesData.map((item: any) => {
              const timestamp = item.hour ? parseISO(item.hour) : new Date();
              return {
                time: format(timestamp, "HH:mm"),
                // Round values to 1 decimal place for cleaner display
                temperature: parseFloat(
                  parseFloat(item.avg_temperature || 0).toFixed(1)
                ),
                humidity: parseFloat(
                  parseFloat(item.avg_humidity || 0).toFixed(0)
                ),
                timestamp,
              };
            });
          }

          if (trendData.length > 0) {
            newComparisonData[itemId] = {
              name: itemName,
              color,
              data: trendData,
            };
          }
        }

        setComparisonData(newComparisonData);
      } catch (error) {
        console.error("Failed to fetch comparison data:", error);
      } finally {
        setIsLoadingComparison(false);
      }
    };

    fetchComparisonData();
  }, [selectedItems, isComparing, allRooms]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const teamId = searchParams.get("teamId");
      const roomId = searchParams.get("roomId");

      if (!teamId) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch all rooms for the team (for comparison)
        try {
          const roomsResponse = await axios.get(`/api/rooms?teamId=${teamId}`);
          console.log("Fetched rooms for team:", roomsResponse.data);
          setAllRooms(roomsResponse.data);
        } catch (error) {
          console.error("Failed to fetch rooms:", error);
          setAllRooms([]);
        }

        // Fetch all devices for the team (for comparison)
        try {
          // First try to get devices from rooms that we already fetched
          const devicesFromRooms: DeviceInfo[] = [];

          // Check if we have rooms with devices
          if (allRooms.length > 0) {
            for (const room of allRooms) {
              if (room.devices && Array.isArray(room.devices)) {
                const roomDevices = room.devices.map((device: any) => ({
                  id: device.device_id,
                  name:
                    device.name || `Device ${device.device_id.substring(0, 8)}`,
                  roomId: room.id,
                  roomName: room.name,
                }));
                devicesFromRooms.push(...roomDevices);
              }
            }
          }

          // If we have devices from rooms, use those
          if (devicesFromRooms.length > 0) {
            console.log("Using devices from rooms:", devicesFromRooms);
            setAllDevices(devicesFromRooms);
          } else {
            // Otherwise, fetch devices for this room
            if (roomId) {
              const roomResponse = await axios.get(`/api/rooms/${roomId}`);
              if (
                roomResponse.data.devices &&
                Array.isArray(roomResponse.data.devices)
              ) {
                const roomDevices = roomResponse.data.devices.map(
                  (device: any) => ({
                    id: device.device_id,
                    name:
                      device.name ||
                      `Device ${device.device_id.substring(0, 8)}`,
                    roomId: roomId,
                    roomName: roomResponse.data.name,
                  })
                );
                console.log("Using devices from current room:", roomDevices);
                setAllDevices(roomDevices);
              }
            } else {
              // Mock data for testing if nothing else works
              console.log("Using mock device data for testing");
              setAllDevices([
                {
                  id: "test-device-1",
                  name: "Test Device 1",
                  roomId: "mock-room-1",
                  roomName: "Mock Room 1",
                },
                {
                  id: "test-device-2",
                  name: "Test Device 2",
                  roomId: "mock-room-2",
                  roomName: "Mock Room 2",
                },
              ]);
            }
          }
        } catch (error) {
          console.error("Failed to fetch devices:", error);
          setAllDevices([]);
        }

        // Fetch room data if roomId is available
        if (roomId) {
          try {
            const roomResponse = await axios.get(`/api/rooms/${roomId}`);
            console.log("Room data:", roomResponse.data);
            setRoomData(roomResponse.data);
          } catch (roomError) {
            console.error("Failed to fetch room data:", roomError);
            setRoomData(null);
          }
        }

        // Fetch settings for temperature and humidity units
        const settingsResponse = await axios.get(
          `/api/teams/${teamId}/settings`
        );
        setSettings({
          temperatureUnit: settingsResponse.data.temperatureUnit || "C",
          humidityUnit: settingsResponse.data.humidityUnit || "%",
        });

        // First try the stats endpoint which is what DeviceReadingsChart uses
        try {
          const statsEndpoint = roomId
            ? `/api/devices/readings/stats?roomId=${roomId}&period=day`
            : `/api/devices/readings/stats?teamId=${teamId}&period=day`;

          console.log("Fetching stats from:", statsEndpoint);
          const statsResponse = await axios.get(statsEndpoint);

          if (statsResponse.data?.overallStats) {
            console.log(
              "Stats data received:",
              statsResponse.data.overallStats
            );
            // Use stats for current temperature/humidity display
            const latestStats = [];

            if (
              statsResponse.data.overallStats.avg_temperature !== undefined &&
              statsResponse.data.overallStats.avg_humidity !== undefined
            ) {
              const statData = {
                id: "stats-summary",
                deviceId: "stats-summary",
                temperature: parseFloat(
                  statsResponse.data.overallStats.avg_temperature
                ),
                humidity: parseFloat(
                  statsResponse.data.overallStats.avg_humidity
                ),
                createdAt: new Date().toISOString(),
              };

              console.log("Using stats data for display:", statData);
              latestStats.push(statData);
              setDeviceData(latestStats);
            }
          }

          // Continue processing for dailyTrendData and comfortData as before
          // This will still work even if we're using stats data for the main display
        } catch (statsError) {
          console.error("Failed to fetch from stats endpoint:", statsError);
          // If stats endpoint fails, fall back to regular device readings
        }

        // If we still don't have data, try the device readings endpoint as fallback
        if (deviceData.length === 0) {
          try {
            let readingsEndpoint = roomId
              ? `/api/devices/readings?roomId=${roomId}`
              : `/api/devices/readings?teamId=${teamId}`;

            console.log("Falling back to readings endpoint:", readingsEndpoint);
            const readingsResponse = await axios.get(readingsEndpoint);

            if (readingsResponse.data && readingsResponse.data.length > 0) {
              console.log("Device readings response:", readingsResponse.data);

              // Process the readings with proper type annotation
              const processedReadings = readingsResponse.data.map(
                (reading: any) => ({
                  ...reading,
                  temperature:
                    typeof reading.temperature === "string"
                      ? parseFloat(reading.temperature)
                      : reading.temperature,
                  humidity:
                    typeof reading.humidity === "string"
                      ? parseFloat(reading.humidity)
                      : reading.humidity,
                })
              );

              // Set the current device data, sorted by timestamp (newest first)
              const latestReadings = [...processedReadings]
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .slice(0, 10);

              console.log("Latest readings:", latestReadings);
              setDeviceData(latestReadings);
            }
          } catch (readingsError) {
            console.error("Failed to fetch device readings:", readingsError);
            setDeviceData([]);
          }
        }

        // Process data for daily trends (last 24 hours)
        // Either use the detailed time-series data from API or generate from readings
        let trendData: DailyTrend[] = [];

        try {
          // Try to get hourly data from the stats endpoint
          const hourlyResponse = await axios.get(
            `/api/devices/readings/stats?${
              roomId ? "roomId=" + roomId : "teamId=" + teamId
            }&period=day`
          );

          if (hourlyResponse.data?.timeSeriesData?.length > 0) {
            // Use the time series data from the API
            trendData = hourlyResponse.data.timeSeriesData.map((item: any) => {
              const timestamp = item.hour ? parseISO(item.hour) : new Date();
              return {
                time: format(timestamp, "HH:mm"),
                temperature: parseFloat(item.avg_temperature || 0),
                humidity: parseFloat(item.avg_humidity || 0),
                timestamp,
              };
            });
          }
        } catch (error) {
          console.error("Failed to fetch hourly data:", error);
          // Fall back to generating data points if the API call fails
        }

        // If no data from API, create trend data from available readings
        if (trendData.length === 0 && deviceData.length > 0) {
          // Group readings by hour
          const hourlyGroups: { [key: string]: DeviceReading[] } = {};

          // Sort readings by time
          const sortedReadings = [...deviceData].sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

          // Generate hourly data points for the last 24 hours
          for (let i = 24; i >= 0; i--) {
            const hourDate = subHours(new Date(), i);
            const hourKey = format(hourDate, "yyyy-MM-dd-HH");

            // Find readings from this hour
            const hourReadings = sortedReadings.filter((r) => {
              const readingDate = new Date(r.createdAt);
              return format(readingDate, "yyyy-MM-dd-HH") === hourKey;
            });

            if (hourReadings.length > 0) {
              // Calculate average for this hour
              const avgTemp =
                hourReadings.reduce((sum, r) => sum + r.temperature, 0) /
                hourReadings.length;
              const avgHumid =
                hourReadings.reduce((sum, r) => sum + r.humidity, 0) /
                hourReadings.length;

              trendData.push({
                time: format(hourDate, "HH:mm"),
                temperature: parseFloat(avgTemp.toFixed(1)),
                humidity: parseFloat(avgHumid.toFixed(1)),
                timestamp: hourDate,
              });
            } else if (i < 24) {
              // No readings for this hour, extrapolate from previous if we have some data
              const prevIndex = trendData.length - 1;
              if (prevIndex >= 0) {
                // Simple linear extrapolation (slight random variation)
                const variation = Math.random() * 0.4 - 0.2; // -0.2 to +0.2
                trendData.push({
                  time: format(hourDate, "HH:mm"),
                  temperature: parseFloat(
                    (trendData[prevIndex].temperature + variation).toFixed(1)
                  ),
                  humidity: parseFloat(
                    (trendData[prevIndex].humidity + variation * 2).toFixed(1)
                  ),
                  timestamp: hourDate,
                });
              }
            }
          }
        }

        // Ensure we have at least 7 data points for a meaningful chart
        if (trendData.length < 7 && deviceData.length > 0) {
          // Use the latest reading to generate a simulated 24-hour trend
          const latest = deviceData[0];
          trendData = [];

          for (let i = 24; i >= 0; i -= 4) {
            const hourDate = subHours(new Date(), i);
            const tempVariation = Math.sin((i / 24) * Math.PI * 2) * 1.5;
            const humidVariation = Math.cos((i / 24) * Math.PI * 2) * 5;

            trendData.push({
              time: format(hourDate, "HH:mm"),
              temperature: parseFloat(
                (latest.temperature + tempVariation).toFixed(1)
              ),
              humidity: parseFloat(
                (latest.humidity + humidVariation).toFixed(1)
              ),
              timestamp: hourDate,
            });
          }
        }

        // Set daily trend data, sorted by time
        trendData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        setDailyTrendData(trendData);

        // Process data for climate quality using room data
        let climateQuality: ClimateQuality = {
          status: "moderate",
          emoji: "😐",
          message: "Moderate Climate",
          color: "text-yellow-500",
        };

        try {
          // If we have temperature and humidity data, assess the climate
          if (dailyTrendData.length > 0) {
            // Get the most recent reading
            const latestReading = dailyTrendData[dailyTrendData.length - 1];
            climateQuality = assessRoomClimate(
              latestReading.temperature,
              latestReading.humidity,
              roomData
            );

            console.log("Climate assessment with room data:", climateQuality);
          }
        } catch (error) {
          console.error("Failed to assess climate quality:", error);
        }

        // Store the result
        setComfortData(climateQuality);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  // Calculate averages - update to handle empty arrays and ensure numeric values
  const averageTemperature = deviceData.length
    ? deviceData.reduce((acc, device) => {
        const temp =
          typeof device.temperature === "string"
            ? parseFloat(device.temperature)
            : device.temperature;
        return acc + (isNaN(temp) ? 0 : temp);
      }, 0) / deviceData.length
    : 0;

  const averageHumidity = deviceData.length
    ? deviceData.reduce((acc, device) => {
        const humid =
          typeof device.humidity === "string"
            ? parseFloat(device.humidity)
            : device.humidity;
        return acc + (isNaN(humid) ? 0 : humid);
      }, 0) / deviceData.length
    : 0;

  // Use roomId from URL or fallback
  const roomId = searchParams.get("roomId") || "";

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your climate data</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {!isComparing ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 flex-shrink-0"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  <span>Compare Rooms</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-[440px] p-0">
                <SheetHeader className="p-6 pb-2">
                  <SheetTitle>Compare Room Climate</SheetTitle>
                  <SheetDescription>
                    Select rooms to compare their climate data
                  </SheetDescription>
                </SheetHeader>

                <div className="px-6 py-4 border-t">
                  <h3 className="text-sm font-medium mb-3">
                    Select Rooms
                    {allRooms.length === 0 && (
                      <span className="text-xs font-normal text-muted-foreground ml-2">
                        (No rooms available)
                      </span>
                    )}
                  </h3>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {allRooms.length > 0 ? (
                      allRooms.map((room) => (
                        <div
                          key={room.id}
                          className={`
                            flex items-center justify-between p-3 rounded-md transition-colors
                            ${
                              selectedItems.includes(room.id)
                                ? "bg-primary/10 border-primary/30"
                                : "hover:bg-muted"
                            }
                            border cursor-pointer
                          `}
                          onClick={() => {
                            setSelectedItems((prev) =>
                              prev.includes(room.id)
                                ? prev.filter((id) => id !== room.id)
                                : [...prev, room.id]
                            );
                          }}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 mr-3 flex items-center justify-center rounded-sm border ${
                                selectedItems.includes(room.id)
                                  ? "bg-primary border-primary"
                                  : "border-input"
                              }`}
                            >
                              {selectedItems.includes(room.id) && (
                                <CheckIcon className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">
                                {room.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {room.type
                                  ? room.type.replace("_", " ")
                                  : "Room"}{" "}
                                · {room._count?.devices || 0} device
                                {room._count?.devices !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                        <BarChart className="h-10 w-10 mb-2 opacity-20" />
                        <p className="text-sm">
                          No rooms available in this team
                        </p>
                        <p className="text-xs mt-1">
                          You need to create rooms first
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 py-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Display Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-humidity" className="text-sm">
                        Include humidity data
                      </Label>
                      <Switch
                        id="show-humidity"
                        checked={comparisonOptions.includeHumidity}
                        onCheckedChange={(checked) =>
                          setComparisonOptions((prev) => ({
                            ...prev,
                            includeHumidity: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="smooth-curves" className="text-sm">
                        Smooth curves
                      </Label>
                      <Switch
                        id="smooth-curves"
                        checked={comparisonOptions.smoothCurves}
                        onCheckedChange={(checked) =>
                          setComparisonOptions((prev) => ({
                            ...prev,
                            smoothCurves: checked,
                          }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="normalize-scales" className="text-sm">
                        Normalize scales
                      </Label>
                      <Switch
                        id="normalize-scales"
                        checked={comparisonOptions.normalizeScales}
                        onCheckedChange={(checked) =>
                          setComparisonOptions((prev) => ({
                            ...prev,
                            normalizeScales: checked,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <SheetFooter className="px-6 py-4 border-t">
                  <SheetClose asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      disabled={selectedItems.length === 0}
                    >
                      Cancel
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="w-full"
                      size="sm"
                      disabled={selectedItems.length === 0}
                      onClick={() => {
                        if (selectedItems.length > 0) {
                          setIsComparing(true);
                        }
                      }}
                    >
                      Compare {selectedItems.length} Room
                      {selectedItems.length !== 1 ? "s" : ""}
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                onClick={() => setIsComparing(false)}
              >
                <X className="h-4 w-4 mr-1" />
                Stop Comparing
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Settings className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only">Settings</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader>
                    <SheetTitle>Comparison Settings</SheetTitle>
                    <SheetDescription>
                      Customize how the comparison charts are displayed
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-legend" className="text-sm">
                          Show legend
                        </Label>
                        <Switch
                          id="show-legend"
                          checked={comparisonOptions.showLegend}
                          onCheckedChange={(checked) =>
                            setComparisonOptions((prev) => ({
                              ...prev,
                              showLegend: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-grid" className="text-sm">
                          Show grid
                        </Label>
                        <Switch
                          id="show-grid"
                          checked={comparisonOptions.showGrid}
                          onCheckedChange={(checked) =>
                            setComparisonOptions((prev) => ({
                              ...prev,
                              showGrid: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="include-humidity" className="text-sm">
                          Include humidity data
                        </Label>
                        <Switch
                          id="include-humidity"
                          checked={comparisonOptions.includeHumidity}
                          onCheckedChange={(checked) =>
                            setComparisonOptions((prev) => ({
                              ...prev,
                              includeHumidity: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smooth-curves" className="text-sm">
                          Smooth curves
                        </Label>
                        <Switch
                          id="smooth-curves"
                          checked={comparisonOptions.smoothCurves}
                          onCheckedChange={(checked) =>
                            setComparisonOptions((prev) => ({
                              ...prev,
                              smoothCurves: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="normalize-scales" className="text-sm">
                          Normalize scales
                        </Label>
                        <Switch
                          id="normalize-scales"
                          checked={comparisonOptions.normalizeScales}
                          onCheckedChange={(checked) =>
                            setComparisonOptions((prev) => ({
                              ...prev,
                              normalizeScales: checked,
                            }))
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="show-average" className="text-sm">
                          Show average line
                        </Label>
                        <Switch
                          id="show-average"
                          checked={comparisonOptions.showAverage}
                          onCheckedChange={(checked) =>
                            setComparisonOptions((prev) => ({
                              ...prev,
                              showAverage: checked,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>

      {isComparing && (
        <div className="bg-muted/40 border rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-sm font-medium mr-3">Comparing Rooms:</span>
            <div className="flex flex-wrap gap-1 max-w-[500px]">
              {selectedItems.map((id) => {
                const room = allRooms.find((r) => r.id === id);
                if (!room) return null;

                const compData = comparisonData[id];
                const color = compData?.color || "#888";

                return (
                  <Badge
                    key={id}
                    variant="outline"
                    className="gap-1 py-1 pl-2 pr-1"
                    style={{ borderColor: color }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mr-1"
                      style={{ backgroundColor: color }}
                    ></div>
                    {room.name}
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <button
                            className="h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-muted ml-1"
                            onClick={() =>
                              setSelectedItems((prev) =>
                                prev.filter((i) => i !== id)
                              )
                            }
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove from comparison</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  <span className="text-xs">Add more</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90vw] sm:w-[440px] p-0">
                {/* Same content as the initial selection sheet, but without device selection tab */}
                <SheetHeader className="p-6 pb-2">
                  <SheetTitle>Add More Rooms</SheetTitle>
                  <SheetDescription>
                    Select additional rooms to compare
                  </SheetDescription>
                </SheetHeader>

                <div className="px-6 py-4 border-t">
                  <h3 className="text-sm font-medium mb-3">
                    Select Rooms
                    {allRooms.length === 0 && (
                      <span className="text-xs font-normal text-muted-foreground ml-2">
                        (No rooms available)
                      </span>
                    )}
                  </h3>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {allRooms.length > 0 ? (
                      allRooms.map((room) => (
                        <div
                          key={room.id}
                          className={`
                            flex items-center justify-between p-3 rounded-md transition-colors
                            ${
                              selectedItems.includes(room.id)
                                ? "bg-primary/10 border-primary/30"
                                : "hover:bg-muted"
                            }
                            border cursor-pointer
                          `}
                          onClick={() => {
                            setSelectedItems((prev) =>
                              prev.includes(room.id)
                                ? prev.filter((id) => id !== room.id)
                                : [...prev, room.id]
                            );
                          }}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 mr-3 flex items-center justify-center rounded-sm border ${
                                selectedItems.includes(room.id)
                                  ? "bg-primary border-primary"
                                  : "border-input"
                              }`}
                            >
                              {selectedItems.includes(room.id) && (
                                <CheckIcon className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm">
                                {room.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {room.type
                                  ? room.type.replace("_", " ")
                                  : "Room"}{" "}
                                · {room._count?.devices || 0} device
                                {room._count?.devices !== 1 ? "s" : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                        <BarChart className="h-10 w-10 mb-2 opacity-20" />
                        <p className="text-sm">
                          No rooms available in this team
                        </p>
                        <p className="text-xs mt-1">
                          You need to create rooms first
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <SheetFooter className="px-6 py-4 border-t">
                  <SheetClose asChild>
                    <Button className="w-full" size="sm">
                      Done
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      )}

      {/* Rest of the dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Trends Chart */}
        <Card
          className={`bg-card/80 backdrop-blur-sm ${
            isComparing ? "md:col-span-2" : ""
          }`}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {isComparing ? `Temperature Comparison` : "Daily Trends"}
              </CardTitle>
              <div className="flex items-center gap-2">
                {isComparing && isLoadingComparison && (
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Loader2 className="h-3 w-3 animate-spin mr-1" />
                    Loading...
                  </div>
                )}
                <BarChart className="h-5 w-5 text-primary" />
              </div>
            </div>
            <CardDescription>
              {isComparing
                ? `Comparing temperature data for ${selectedItems.length} rooms`
                : "Temperature and humidity over the last 24 hours"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isComparing && isLoadingComparison ? (
              <div className="h-[300px] w-full flex flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground text-sm">
                  Loading comparison data...
                </p>
              </div>
            ) : isComparing && Object.keys(comparisonData).length > 0 ? (
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                  >
                    {comparisonOptions.showGrid && (
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="var(--border)"
                        opacity={0.3}
                      />
                    )}
                    <XAxis
                      dataKey="time"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                      allowDuplicatedCategory={false}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                      domain={
                        comparisonOptions.normalizeScales
                          ? [
                              (dataMin: number) => Math.floor(dataMin - 2),
                              (dataMax: number) => Math.ceil(dataMax + 2),
                            ]
                          : ["auto", "auto"]
                      }
                      width={30}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--background)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                      labelStyle={{
                        color: "var(--foreground)",
                        fontWeight: "bold",
                      }}
                      formatter={(value, name) => [
                        `${
                          typeof value === "number" ? value.toFixed(1) : value
                        }°${settings.temperatureUnit}`,
                        name,
                      ]}
                      wrapperStyle={{
                        zIndex: 1000,
                      }}
                    />
                    {comparisonOptions.showLegend && <Legend />}

                    {Object.entries(comparisonData).map(
                      ([itemId, { name, color, data }]) => (
                        <Line
                          key={itemId}
                          type={
                            comparisonOptions.smoothCurves
                              ? "monotone"
                              : "linear"
                          }
                          data={data}
                          name={name}
                          dataKey="temperature"
                          stroke={color}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{
                            r: 6,
                            stroke: color,
                            strokeWidth: 2,
                            fill: "var(--background)",
                          }}
                          isAnimationActive={true}
                        />
                      )
                    )}

                    {comparisonOptions.showAverage &&
                      Object.keys(comparisonData).length > 1 && (
                        <Line
                          type={
                            comparisonOptions.smoothCurves
                              ? "monotone"
                              : "linear"
                          }
                          dataKey="avgTemp"
                          stroke="var(--primary)"
                          strokeDasharray="5 5"
                          name="Average"
                          strokeWidth={2}
                          dot={false}
                          data={(() => {
                            // Calculate average temperature for each time point
                            const allTimes = new Set<string>();
                            const timeToReadings: { [key: string]: number[] } =
                              {};

                            // Collect all time points and readings
                            Object.values(comparisonData).forEach(
                              ({ data }) => {
                                data.forEach((point) => {
                                  allTimes.add(point.time);
                                  if (!timeToReadings[point.time]) {
                                    timeToReadings[point.time] = [];
                                  }
                                  timeToReadings[point.time].push(
                                    point.temperature
                                  );
                                });
                              }
                            );

                            // Calculate averages
                            return Array.from(allTimes)
                              .sort()
                              .map((time) => {
                                const readings = timeToReadings[time];
                                // Round average to 1 decimal place
                                const avgTemp = parseFloat(
                                  (
                                    readings.reduce(
                                      (sum, temp) => sum + temp,
                                      0
                                    ) / readings.length
                                  ).toFixed(1)
                                );
                                return {
                                  time,
                                  avgTemp,
                                };
                              });
                          })()}
                        />
                      )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : isComparing && selectedItems.length > 0 ? (
              <div className="h-[300px] flex items-center justify-center flex-col p-6 text-center">
                <div className="text-muted-foreground mb-2">
                  No data available for selected rooms
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsComparing(false)}
                >
                  Return to normal view
                </Button>
              </div>
            ) : dailyTrendData.length > 0 ? (
              <ChartContainer
                config={dailyTrendConfig}
                className="h-[200px] w-full"
              >
                <AreaChart data={dailyTrendData} accessibilityLayer>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--border)"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="time"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    yAxisId="left"
                    orientation="left"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-temperature)"
                        stopOpacity={0.5}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-temperature)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="colorHumid" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-humidity)"
                        stopOpacity={0.5}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-humidity)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="temperature"
                    stroke="var(--color-temperature)"
                    fillOpacity={1}
                    fill="url(#colorTemp)"
                    isAnimationActive={true}
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="humidity"
                    stroke="var(--color-humidity)"
                    fillOpacity={1}
                    fill="url(#colorHumid)"
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ChartContainer>
            ) : (
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                <p>No temperature data available for the last 24 hours</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Climate Quality or Humidity Comparison Card - hide when comparing */}
        {!isComparing && (
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  Climate Quality
                </CardTitle>
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>Current room climate assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-[200px] text-center relative">
                <div className="text-7xl mb-2">{comfortData.emoji}</div>
                <h3 className={`text-2xl font-bold ${comfortData.color} mb-1`}>
                  {comfortData.message}
                </h3>

                {/* Current Temperature and Humidity */}
                <div className="flex justify-center gap-6 mb-2 text-sm">
                  <div className="flex items-center">
                    <Thermometer className="h-4 w-4 mr-1 text-rose-400" />
                    <span>
                      {dailyTrendData.length > 0
                        ? `${dailyTrendData[
                            dailyTrendData.length - 1
                          ].temperature.toFixed(1)}°${settings.temperatureUnit}`
                        : `--°${settings.temperatureUnit}`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Droplet className="h-4 w-4 mr-1 text-blue-400" />
                    <span>
                      {dailyTrendData.length > 0
                        ? `${dailyTrendData[
                            dailyTrendData.length - 1
                          ].humidity.toFixed(0)}${settings.humidityUnit}`
                        : `--${settings.humidityUnit}`}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground max-w-xs mb-2">
                  {comfortData.status === "excellent" &&
                    "Perfect temperature and humidity for this room type!"}
                  {comfortData.status === "good" &&
                    "Very comfortable climate conditions for this room."}
                  {comfortData.status === "moderate" &&
                    "Climate is acceptable but could be improved."}
                  {comfortData.status === "poor" &&
                    "Climate conditions need adjustment for comfort."}
                  {comfortData.status === "bad" &&
                    "Climate conditions are uncomfortable and need immediate attention."}
                </p>

                {comfortData.details && (
                  <div className="text-xs text-muted-foreground flex flex-col gap-1 border-t border-border pt-2 mt-1 w-full">
                    <div className="flex justify-between">
                      <span>Ideal temperature:</span>
                      <span className="font-medium">
                        {comfortData.details.idealTempRange?.[0]}-
                        {comfortData.details.idealTempRange?.[1]}°
                        {settings.temperatureUnit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Room type:</span>
                      <span className="font-medium capitalize">
                        {roomData?.type?.replace("_", " ") || "Unknown"}
                      </span>
                    </div>
                    {roomData?.size && roomData?.capacity && (
                      <div className="flex justify-between">
                        <span>Space per person:</span>
                        <span className="font-medium">
                          {(roomData.size / roomData.capacity).toFixed(1)} m²
                        </span>
                      </div>
                    )}
                    {comfortData.details.requiredAirflow && (
                      <div className="flex justify-between">
                        <span>Required airflow:</span>
                        <span className="font-medium">
                          {comfortData.details.requiredAirflow} CFM
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Humidity comparison chart - Show only when comparing and humidity is enabled */}
        {isComparing && comparisonOptions.includeHumidity && (
          <Card className="bg-card/80 backdrop-blur-sm md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  Humidity Comparison
                </CardTitle>
                <Droplet className="h-5 w-5 text-primary" />
              </div>
              <CardDescription>
                Comparing humidity data for {selectedItems.length} rooms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingComparison ? (
                <div className="h-[300px] w-full flex flex-col items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground text-sm">
                    Loading comparison data...
                  </p>
                </div>
              ) : Object.keys(comparisonData).length > 0 ? (
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
                    >
                      {comparisonOptions.showGrid && (
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="var(--border)"
                          opacity={0.3}
                        />
                      )}
                      <XAxis
                        dataKey="time"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        allowDuplicatedCategory={false}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        domain={
                          comparisonOptions.normalizeScales
                            ? [0, 100]
                            : ["auto", "auto"]
                        }
                        width={30}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--background)",
                          border: "1px solid var(--border)",
                          borderRadius: "4px",
                          fontSize: "12px",
                        }}
                        labelStyle={{
                          color: "var(--foreground)",
                          fontWeight: "bold",
                        }}
                        formatter={(value, name) => [
                          `${
                            typeof value === "number" ? value.toFixed(0) : value
                          }${settings.humidityUnit}`,
                          name,
                        ]}
                      />
                      {comparisonOptions.showLegend && <Legend />}

                      {Object.entries(comparisonData).map(
                        ([itemId, { name, color, data }]) => (
                          <Line
                            key={itemId}
                            type={
                              comparisonOptions.smoothCurves
                                ? "monotone"
                                : "linear"
                            }
                            data={data}
                            name={name}
                            dataKey="humidity"
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                              r: 6,
                              stroke: color,
                              strokeWidth: 2,
                              fill: "var(--background)",
                            }}
                            isAnimationActive={true}
                          />
                        )
                      )}

                      {comparisonOptions.showAverage &&
                        Object.keys(comparisonData).length > 1 && (
                          <Line
                            type={
                              comparisonOptions.smoothCurves
                                ? "monotone"
                                : "linear"
                            }
                            dataKey="avgHumid"
                            stroke="var(--primary)"
                            strokeDasharray="5 5"
                            name="Average"
                            strokeWidth={2}
                            dot={false}
                            data={(() => {
                              // Calculate average humidity for each time point
                              const allTimes = new Set<string>();
                              const timeToReadings: {
                                [key: string]: number[];
                              } = {};

                              // Collect all time points and readings
                              Object.values(comparisonData).forEach(
                                ({ data }) => {
                                  data.forEach((point) => {
                                    allTimes.add(point.time);
                                    if (!timeToReadings[point.time]) {
                                      timeToReadings[point.time] = [];
                                    }
                                    timeToReadings[point.time].push(
                                      point.humidity
                                    );
                                  });
                                }
                              );

                              // Calculate averages
                              return Array.from(allTimes)
                                .sort()
                                .map((time) => {
                                  const readings = timeToReadings[time];
                                  // Round average to whole numbers
                                  const avgHumid = parseFloat(
                                    (
                                      readings.reduce(
                                        (sum, humid) => sum + humid,
                                        0
                                      ) / readings.length
                                    ).toFixed(0)
                                  );
                                  return {
                                    time,
                                    avgHumid,
                                  };
                                });
                            })()}
                          />
                        )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <p>No humidity data available for comparison</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comparison Stats Cards Section */}
      {isComparing && Object.keys(comparisonData).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {Object.entries(comparisonData).map(
            ([itemId, { name, color, data }]) => {
              if (!data.length) return null;

              // Calculate averages
              const avgTemp =
                data.reduce((sum, item) => sum + item.temperature, 0) /
                data.length;
              const avgHumid =
                data.reduce((sum, item) => sum + item.humidity, 0) /
                data.length;

              // Find min/max
              const maxTemp = Math.max(...data.map((item) => item.temperature));
              const minTemp = Math.min(...data.map((item) => item.temperature));
              const maxHumid = Math.max(...data.map((item) => item.humidity));
              const minHumid = Math.min(...data.map((item) => item.humidity));

              // Find latest reading
              const latestReading = data[data.length - 1];

              // Calculate climate quality
              const climateQuality = assessBasicClimate(
                latestReading.temperature,
                latestReading.humidity
              );

              return (
                <Card
                  key={itemId}
                  className="bg-card/80 backdrop-blur-sm overflow-hidden"
                >
                  <div className="h-1" style={{ backgroundColor: color }}></div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium truncate">
                        {name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="text-xl" title={climateQuality.message}>
                          {climateQuality.emoji}
                        </div>
                        <Thermometer className="h-4 w-4" style={{ color }} />
                      </div>
                    </div>
                    <CardDescription>
                      Latest reading: {latestReading.time} · Room statistics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Latest Temp
                        </p>
                        <p className="text-xl font-bold flex items-center">
                          {latestReading.temperature.toFixed(1)}°
                          {settings.temperatureUnit}
                          <span className="text-xs ml-1 font-normal text-muted-foreground">
                            {avgTemp > latestReading.temperature
                              ? "↓"
                              : avgTemp < latestReading.temperature
                              ? "↑"
                              : "→"}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Latest Humidity
                        </p>
                        <p className="text-xl font-bold flex items-center">
                          {latestReading.humidity.toFixed(0)}
                          {settings.humidityUnit}
                          <span className="text-xs ml-1 font-normal text-muted-foreground">
                            {avgHumid > latestReading.humidity
                              ? "↓"
                              : avgHumid < latestReading.humidity
                              ? "↑"
                              : "→"}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Temperature Range
                        </p>
                        <p className="text-sm flex items-center justify-between">
                          <span>{minTemp.toFixed(1)}°</span>
                          <span className="text-xs px-2 opacity-50">to</span>
                          <span>
                            {maxTemp.toFixed(1)}°{settings.temperatureUnit}
                          </span>
                        </p>
                        <div className="w-full bg-muted h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full"
                            style={{
                              width: "100%",
                            }}
                          ></div>
                          <div
                            className="h-2.5 w-2.5 bg-background border-2 rounded-full relative -top-2"
                            style={{
                              borderColor: color,
                              marginLeft: `${Math.max(
                                0,
                                Math.min(
                                  100,
                                  ((latestReading.temperature - minTemp) /
                                    (maxTemp - minTemp)) *
                                    100
                                )
                              )}%`,
                              transform: "translateX(-50%)",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Humidity Range
                        </p>
                        <p className="text-sm flex items-center justify-between">
                          <span>{minHumid.toFixed(0)}</span>
                          <span className="text-xs px-2 opacity-50">to</span>
                          <span>
                            {maxHumid.toFixed(0)}
                            {settings.humidityUnit}
                          </span>
                        </p>
                        <div className="w-full bg-muted h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-gray-400 to-blue-500 rounded-full"
                            style={{
                              width: "100%",
                            }}
                          ></div>
                          <div
                            className="h-2.5 w-2.5 bg-background border-2 rounded-full relative -top-2"
                            style={{
                              borderColor: color,
                              marginLeft: `${Math.max(
                                0,
                                Math.min(
                                  100,
                                  ((latestReading.humidity - minHumid) /
                                    (maxHumid - minHumid)) *
                                    100
                                )
                              )}%`,
                              transform: "translateX(-50%)",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>
      )}

      {/* Full Device Readings Chart */}
      <div className="mt-6">
        {roomId && !isComparing && (
          <DeviceReadingsChart roomId={roomId} initialPeriod="day" />
        )}

        {isComparing &&
          Object.keys(comparisonData).length > 0 &&
          compareMode === "rooms" && (
            <Card className="bg-card/80 backdrop-blur-sm mt-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    Combined Climate Analysis
                  </CardTitle>
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>
                  Comparative analysis of selected rooms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedItems.map((itemId) => {
                    const roomInfo = allRooms.find((r) => r.id === itemId);
                    const roomData = comparisonData[itemId];

                    if (!roomInfo || !roomData || !roomData.data.length)
                      return null;

                    // Get latest readings
                    const latestData = roomData.data[roomData.data.length - 1];

                    // Calculate climate quality for this room
                    const climateQuality = assessBasicClimate(
                      latestData.temperature,
                      latestData.humidity
                    );

                    return (
                      <Card key={itemId} className="bg-background/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md font-medium">
                            {roomInfo.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="text-3xl">
                              {climateQuality.emoji}
                            </div>
                            <div
                              className={`text-sm font-medium ${climateQuality.color}`}
                            >
                              {climateQuality.message}
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {latestData.temperature.toFixed(1)}°
                            {settings.temperatureUnit} /
                            {latestData.humidity.toFixed(0)}
                            {settings.humidityUnit}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
};

export default Dashboard;
