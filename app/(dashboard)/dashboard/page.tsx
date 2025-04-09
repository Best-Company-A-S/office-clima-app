"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  Info,
  Save,
  Layout,
  Edit,
  Eye,
  Trash2,
  Star,
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
import { Input } from "@/components/ui/input";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ResponsiveGridLayout = WidthProvider(Responsive);

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

// New interface for dashboard layout
interface DashboardLayout {
  id: string;
  name: string;
  isDefault: boolean;
  layout: {
    lg: GridItem[];
    md: GridItem[];
    sm: GridItem[];
  };
}

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
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

// Add a utility function at the top of the component to handle deep comparisons
const isEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (!a || !b) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!isEqual(a[key], b[key])) return false;
  }

  return true;
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

  // Dashboard layout states
  const [editLayoutMode, setEditLayoutMode] = useState(false);
  const [availableLayouts, setAvailableLayouts] = useState<DashboardLayout[]>(
    []
  );
  const [currentLayout, setCurrentLayout] = useState<DashboardLayout | null>(
    null
  );
  const [newLayoutName, setNewLayoutName] = useState("My Custom Layout");
  const [isSavingLayout, setIsSavingLayout] = useState(false);
  const [isLoadingLayouts, setIsLoadingLayouts] = useState(true);

  // Default layout configuration
  const defaultLayout: DashboardLayout = {
    id: "default",
    name: "Default Layout",
    isDefault: true,
    layout: {
      lg: [
        { i: "temperature-trend", x: 0, y: 0, w: 12, h: 8, minW: 6, minH: 4 },
        { i: "climate-quality", x: 0, y: 8, w: 12, h: 8, minW: 4, minH: 4 },
        { i: "device-readings", x: 0, y: 16, w: 12, h: 12, minW: 6, minH: 8 },
      ],
      md: [
        { i: "temperature-trend", x: 0, y: 0, w: 10, h: 7, minW: 6, minH: 4 },
        { i: "climate-quality", x: 0, y: 7, w: 10, h: 7, minW: 4, minH: 4 },
        { i: "device-readings", x: 0, y: 14, w: 10, h: 10, minW: 6, minH: 8 },
      ],
      sm: [
        { i: "temperature-trend", x: 0, y: 0, w: 6, h: 6, minW: 4, minH: 4 },
        { i: "climate-quality", x: 0, y: 6, w: 6, h: 6, minW: 4, minH: 4 },
        { i: "device-readings", x: 0, y: 12, w: 6, h: 8, minW: 4, minH: 6 },
      ],
    },
  };

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

  // Add refs to track loading states and prevent duplicate fetches
  const isLoadingRef = useRef(false);
  const lastFetchTimeRef = useRef(0);

  // Add these new refs at the top of the Dashboard component
  const comparisonRequestsInProgressRef = useRef<{ [key: string]: boolean }>(
    {}
  );
  const comparisonDataCacheRef = useRef<{
    [key: string]: { timestamp: number; data: any };
  }>({});
  const lastComparisonFetchTimeRef = useRef<number>(0);

  // Wrap the fetchData function in useCallback to prevent it from triggering renders
  const fetchData = useCallback(async () => {
    // Debounce fetches - don't allow more than one fetch every 10 seconds
    const now = Date.now();
    if (now - lastFetchTimeRef.current < 10000) {
      return;
    }

    // Don't fetch if already fetching
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;
    setIsLoading(true);
    lastFetchTimeRef.current = now;

    const teamId = searchParams.get("teamId");
    const roomId = searchParams.get("roomId");

    if (!teamId) {
      setIsLoading(false);
      isLoadingRef.current = false;
      return;
    }

    try {
      // Cache previous data for comparison
      const prevAllRooms = [...allRooms];
      const prevAllDevices = [...allDevices];
      const prevRoomData = roomData;
      const prevSettings = { ...settings };

      // Fetch all rooms for the team (for comparison)
      try {
        const roomsResponse = await axios.get(`/api/rooms?teamId=${teamId}`);
        const newRooms = roomsResponse.data;

        // Only update if rooms have changed to prevent unnecessary re-renders
        if (!isEqual(prevAllRooms, newRooms)) {
          console.log("Fetched rooms for team:", newRooms);
          setAllRooms(newRooms);
        }
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
        setAllRooms([]);
      }

      // Fetch all devices for the team (for comparison)
      try {
        // Get fresh devices directly from API without relying on allRooms state
        let devicesList: DeviceInfo[] = [];

        // Try to get devices for this room or team
        if (roomId) {
          const roomResponse = await axios.get(`/api/rooms/${roomId}`);
          if (
            roomResponse.data.devices &&
            Array.isArray(roomResponse.data.devices)
          ) {
            devicesList = roomResponse.data.devices.map((device: any) => ({
              id: device.device_id,
              name: device.name || `Device ${device.device_id.substring(0, 8)}`,
              roomId: roomId,
              roomName: roomResponse.data.name,
            }));
          }
        }

        // If we couldn't get devices, use a mock for testing
        if (devicesList.length === 0) {
          // Mock data for testing if nothing else works
          console.log("Using mock device data for testing");
          devicesList = [
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
          ];
        }

        // Only update if devices have changed
        if (!isEqual(prevAllDevices, devicesList)) {
          setAllDevices(devicesList);
        }
      } catch (error) {
        console.error("Failed to fetch devices:", error);
        setAllDevices([]);
      }

      // Fetch room data if roomId is available
      if (roomId) {
        try {
          const roomResponse = await axios.get(`/api/rooms/${roomId}`);
          const newRoomData = roomResponse.data;
          // Only update if room data has changed
          if (!isEqual(prevRoomData, newRoomData)) {
            console.log("Room data:", newRoomData);
            setRoomData(newRoomData);
          }
        } catch (roomError) {
          console.error("Failed to fetch room data:", roomError);
          setRoomData(null);
        }
      }

      // Fetch settings for temperature and humidity units
      const settingsResponse = await axios.get(`/api/teams/${teamId}/settings`);
      const newSettings = {
        temperatureUnit: settingsResponse.data.temperatureUnit || "C",
        humidityUnit: settingsResponse.data.humidityUnit || "%",
      };

      // Only update settings if they've changed
      if (!isEqual(prevSettings, newSettings)) {
        setSettings(newSettings);
      }

      // First try the stats endpoint which is what DeviceReadingsChart uses
      let deviceReadingsData: DeviceData[] = [];
      let trendData: DailyTrend[] = [];

      // Cache previous values for comparison
      const prevDeviceData = [...deviceData];
      const prevDailyTrendData = [...dailyTrendData];
      const prevComfortData = { ...comfortData };

      try {
        const statsEndpoint = roomId
          ? `/api/devices/readings/stats?roomId=${roomId}&period=day`
          : `/api/devices/readings/stats?teamId=${teamId}&period=day`;

        console.log("Fetching stats from:", statsEndpoint);
        const statsResponse = await axios.get(statsEndpoint);

        if (statsResponse.data?.overallStats) {
          console.log("Stats data received:", statsResponse.data.overallStats);
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
            deviceReadingsData = latestStats;
          }
        }

        // Try to get hourly data from the stats endpoint for trends
        if (statsResponse.data?.timeSeriesData?.length > 0) {
          // Use the time series data from the API
          trendData = statsResponse.data.timeSeriesData.map((item: any) => {
            const timestamp = item.hour ? parseISO(item.hour) : new Date();
            return {
              time: format(timestamp, "HH:mm"),
              temperature: parseFloat(item.avg_temperature || 0),
              humidity: parseFloat(item.avg_humidity || 0),
              timestamp,
            };
          });
        }
      } catch (statsError) {
        console.error("Failed to fetch from stats endpoint:", statsError);
        // If stats endpoint fails, fall back to regular device readings
      }

      // If we still don't have data, try the device readings endpoint as fallback
      if (deviceReadingsData.length === 0) {
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
            deviceReadingsData = latestReadings;
          }
        } catch (readingsError) {
          console.error("Failed to fetch device readings:", readingsError);
          deviceReadingsData = [];
        }
      }

      // Only update device data if it has changed
      if (!isEqual(prevDeviceData, deviceReadingsData)) {
        setDeviceData(deviceReadingsData);
      }

      // If no trend data from API, create trend data from available readings
      if (trendData.length === 0 && deviceReadingsData.length > 0) {
        // Group readings by hour
        const hourlyGroups: { [key: string]: DeviceReading[] } = {};

        // Sort readings by time
        const sortedReadings = [...deviceReadingsData].sort(
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
      if (trendData.length < 7 && deviceReadingsData.length > 0) {
        // Use the latest reading to generate a simulated 24-hour trend
        const latest = deviceReadingsData[0];
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
            humidity: parseFloat((latest.humidity + humidVariation).toFixed(1)),
            timestamp: hourDate,
          });
        }
      }

      // Process trend data and verify if it has changed before updating state
      if (!isEqual(prevDailyTrendData, trendData)) {
        // Set daily trend data, sorted by time
        trendData.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        setDailyTrendData(trendData);
      }

      // Process data for climate quality using room data
      let climateQuality: ClimateQuality = {
        status: "moderate",
        emoji: "😐",
        message: "Moderate Climate",
        color: "text-yellow-500",
      };

      try {
        // If we have temperature and humidity data, assess the climate
        if (trendData.length > 0) {
          // Get the most recent reading
          const latestReading = trendData[trendData.length - 1];
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

      // Only update comfort data if it has changed
      if (!isEqual(prevComfortData, climateQuality)) {
        // Store the result
        setComfortData(climateQuality);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [searchParams]); // Keep only searchParams as a dependency

  // Modify the useEffect to use the memoized fetchData function
  useEffect(() => {
    // Only fetch if not already loading
    if (!isLoadingRef.current) {
      fetchData();
    }
  }, [fetchData]);

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

  // Replace the fetchComparisonData function with this optimized version
  const fetchComparisonData = useCallback(async () => {
    if (!selectedItems.length || !isComparing) return;

    // Don't fetch if already loading comparison data
    if (isLoadingComparison) return;

    // Throttle API requests - only allow one fetch every 5 seconds
    const now = Date.now();
    if (now - lastComparisonFetchTimeRef.current < 5000) {
      console.log("Throttling comparison data fetch");
      return;
    }

    // Set the last fetch time
    lastComparisonFetchTimeRef.current = now;

    setIsLoadingComparison(true);
    const teamId = searchParams.get("teamId");
    if (!teamId) {
      setIsLoadingComparison(false);
      return;
    }

    const newComparisonData: any = { ...comparisonData };
    let dataChanged = false;

    try {
      const fetchPromises = selectedItems.map(async (itemId) => {
        // Skip if request already in progress for this item
        if (comparisonRequestsInProgressRef.current[itemId]) {
          return null;
        }

        // Check cache first (valid for 2 minutes)
        const cachedData = comparisonDataCacheRef.current[itemId];
        if (cachedData && now - cachedData.timestamp < 120000) {
          console.log(`Using cached data for ${itemId}`);
          if (
            !newComparisonData[itemId] ||
            !isEqual(newComparisonData[itemId], cachedData.data)
          ) {
            newComparisonData[itemId] = cachedData.data;
            dataChanged = true;
          }
          return null;
        }

        comparisonRequestsInProgressRef.current[itemId] = true;

        let endpoint = "";
        let itemName = "";
        const color = getRandomColor();

        // Only fetch room data since we're only comparing rooms
        const room = allRooms.find((r) => r.id === itemId);
        if (!room) {
          comparisonRequestsInProgressRef.current[itemId] = false;
          return null;
        }

        itemName = room.name;
        endpoint = `/api/devices/readings/stats?roomId=${itemId}&period=day`;

        try {
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
            const roomData = {
              name: itemName,
              color,
              data: trendData,
            };

            // Cache the data
            comparisonDataCacheRef.current[itemId] = {
              timestamp: now,
              data: roomData,
            };

            // Only update if data has changed
            if (
              !newComparisonData[itemId] ||
              !isEqual(newComparisonData[itemId], roomData)
            ) {
              newComparisonData[itemId] = roomData;
              dataChanged = true;
            }
          }
        } catch (error) {
          console.error(
            `Failed to fetch comparison data for room ${itemId}:`,
            error
          );
        } finally {
          comparisonRequestsInProgressRef.current[itemId] = false;
        }
      });

      // Wait for all fetch operations to complete
      await Promise.all(fetchPromises);

      // Only update state if data has actually changed to prevent render loops
      if (dataChanged && Object.keys(newComparisonData).length > 0) {
        console.log("Updating comparison data with:", newComparisonData);
        setComparisonData(newComparisonData);
      }
    } catch (error) {
      console.error("Failed to fetch comparison data:", error);
    } finally {
      setIsLoadingComparison(false);
    }
  }, [
    selectedItems,
    isComparing,
    allRooms,
    comparisonData,
    isLoadingComparison,
    searchParams,
  ]);

  // Modify the useEffect for comparison data to use a clean-up function and add a debounce
  useEffect(() => {
    let isMounted = true;
    let debounceTimer: NodeJS.Timeout | null = null;

    if (selectedItems.length > 0 && isComparing) {
      // Debounce the fetch to avoid rapid multiple calls
      debounceTimer = setTimeout(() => {
        if (isMounted) {
          fetchComparisonData();
        }
      }, 300);
    }

    return () => {
      isMounted = false;
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [fetchComparisonData, selectedItems.length, isComparing]);

  // Add this function near the fetchComparisonData function
  const getComparisonDebugInfo = () => {
    const now = Date.now();
    const cacheInfo = Object.entries(comparisonDataCacheRef.current).map(
      ([roomId, cacheItem]) => {
        const room = allRooms.find((r) => r.id === roomId);
        const age = Math.round((now - cacheItem.timestamp) / 1000);
        return {
          roomName: room?.name || roomId,
          age: `${age} sec ago`,
          isValid: age < 120,
          dataPoints: cacheItem.data.data?.length || 0,
        };
      }
    );

    return {
      cacheEntries: cacheInfo.length,
      roomsRequested: selectedItems.length,
      throttleStatus: `${Math.max(
        0,
        5 - Math.round((now - lastComparisonFetchTimeRef.current) / 1000)
      )} sec until next fetch`,
      requestsInProgress: Object.entries(
        comparisonRequestsInProgressRef.current
      ).filter(([_, inProgress]) => inProgress).length,
      cacheInfo,
    };
  };

  // Load saved dashboard layouts
  const loadDashboardLayouts = useCallback(async () => {
    const teamId = searchParams.get("teamId");
    if (!teamId) {
      setIsLoadingLayouts(false);
      return;
    }

    try {
      setIsLoadingLayouts(true);
      const response = await axios.get(`/api/teams/${teamId}/layouts`);

      if (response.data && response.data.length > 0) {
        setAvailableLayouts(response.data);

        // Find the default layout or use the first one
        const defaultLayout =
          response.data.find((layout: DashboardLayout) => layout.isDefault) ||
          response.data[0];
        setCurrentLayout(defaultLayout);
      } else {
        // If no layouts found, use the default one
        setAvailableLayouts([defaultLayout]);
        setCurrentLayout(defaultLayout);
      }
    } catch (error) {
      console.error("Failed to load dashboard layouts:", error);
      // If API fails, use the default layout
      setAvailableLayouts([defaultLayout]);
      setCurrentLayout(defaultLayout);
    } finally {
      setIsLoadingLayouts(false);
    }
  }, [searchParams]);

  // Save the current layout
  const saveCurrentLayout = async (makeDefault = false) => {
    const teamId = searchParams.get("teamId");
    if (!teamId || !currentLayout) return;

    try {
      setIsSavingLayout(true);

      // Determine if this is a new layout or updating an existing one
      const isNewLayout =
        currentLayout.id === "default" ||
        !availableLayouts.some((l) => l.id === currentLayout.id);

      const layoutToSave = {
        ...currentLayout,
        name: newLayoutName || currentLayout.name,
        isDefault: makeDefault,
        teamId,
      };

      if (isNewLayout) {
        // Create new layout
        const response = await axios.post(
          `/api/teams/${teamId}/layouts`,
          layoutToSave
        );
        if (response.data) {
          // Update the layout list with the new layout
          setAvailableLayouts((prev) => [...prev, response.data]);
          setCurrentLayout(response.data);
        }
      } else {
        // Update existing layout
        const response = await axios.put(
          `/api/teams/${teamId}/layouts/${currentLayout.id}`,
          layoutToSave
        );
        if (response.data) {
          // Update the layout in the list
          setAvailableLayouts((prev) =>
            prev.map((layout) =>
              layout.id === currentLayout.id ? response.data : layout
            )
          );
          setCurrentLayout(response.data);
        }
      }

      // If making this the default, update all other layouts
      if (makeDefault) {
        await axios.put(
          `/api/teams/${teamId}/layouts/default/${currentLayout.id}`
        );
      }

      setEditLayoutMode(false);
    } catch (error) {
      console.error("Failed to save layout:", error);
    } finally {
      setIsSavingLayout(false);
    }
  };

  // Handle layout change
  const handleLayoutChange = (layout: any, layouts: any) => {
    if (!editLayoutMode || !currentLayout) return;

    // Update the current layout with the new grid positions
    setCurrentLayout({
      ...currentLayout,
      layout: layouts,
    });
  };

  // Load dashboard layouts when team changes
  useEffect(() => {
    loadDashboardLayouts();
  }, [loadDashboardLayouts]);

  // Add new states for layout management
  const [isLayoutSettingsOpen, setIsLayoutSettingsOpen] = useState(false);
  const [layoutToRename, setLayoutToRename] = useState<DashboardLayout | null>(
    null
  );
  const [newLayoutNameInput, setNewLayoutNameInput] = useState("");
  const [layoutToDelete, setLayoutToDelete] = useState<DashboardLayout | null>(
    null
  );
  const [layoutToPreview, setLayoutToPreview] =
    useState<DashboardLayout | null>(null);
  const [isRenamingLayout, setIsRenamingLayout] = useState(false);
  const [isDeletingLayout, setIsDeletingLayout] = useState(false);

  // Add a new function to handle layout renaming
  const handleRenameLayout = async () => {
    if (!layoutToRename || !newLayoutNameInput.trim()) return;

    try {
      setIsRenamingLayout(true);
      const teamId = searchParams.get("teamId");
      if (!teamId) return;

      const response = await axios.put(
        `/api/teams/${teamId}/layouts/${layoutToRename.id}`,
        {
          name: newLayoutNameInput.trim(),
        }
      );

      if (response.data) {
        // Update the layout in the list
        setAvailableLayouts((prev) =>
          prev.map((layout) =>
            layout.id === layoutToRename.id
              ? { ...layout, name: newLayoutNameInput.trim() }
              : layout
          )
        );

        // Update current layout if it's the one being renamed
        if (currentLayout?.id === layoutToRename.id) {
          setCurrentLayout({
            ...currentLayout,
            name: newLayoutNameInput.trim(),
          });
        }

        // Reset states
        setLayoutToRename(null);
        setNewLayoutNameInput("");
      }
    } catch (error) {
      console.error("Failed to rename layout:", error);
    } finally {
      setIsRenamingLayout(false);
    }
  };

  // Add a function to handle layout deletion
  const handleDeleteLayout = async () => {
    if (!layoutToDelete) return;

    try {
      setIsDeletingLayout(true);
      const teamId = searchParams.get("teamId");
      if (!teamId) return;

      await axios.delete(`/api/teams/${teamId}/layouts/${layoutToDelete.id}`);

      // Remove the layout from the list
      setAvailableLayouts((prev) =>
        prev.filter((layout) => layout.id !== layoutToDelete.id)
      );

      // If the deleted layout was the current one, switch to another layout
      if (currentLayout?.id === layoutToDelete.id) {
        const newCurrentLayout = availableLayouts.find(
          (layout) => layout.id !== layoutToDelete.id
        );
        if (newCurrentLayout) {
          setCurrentLayout(newCurrentLayout);
        } else {
          setCurrentLayout(defaultLayout);
        }
      }

      // Reset state
      setLayoutToDelete(null);
    } catch (error) {
      console.error("Failed to delete layout:", error);
    } finally {
      setIsDeletingLayout(false);
    }
  };

  // Function to apply a layout preview as the current layout
  const applyPreviewedLayout = () => {
    if (layoutToPreview) {
      setCurrentLayout(layoutToPreview);
      setLayoutToPreview(null);
    }
  };

  if (isLoading || isLoadingLayouts) {
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
            <>
              {/* Layout customization buttons */}
              {editLayoutMode ? (
                <>
                  <div className="flex items-center border rounded-md pl-2 pr-1 h-9">
                    <Input
                      className="h-7 border-0 px-1 text-sm w-40"
                      placeholder="Layout name"
                      value={newLayoutName}
                      onChange={(e) => setNewLayoutName(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={() => setEditLayoutMode(false)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="h-9"
                    onClick={() => saveCurrentLayout(false)}
                    disabled={isSavingLayout}
                  >
                    {isSavingLayout ? (
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-1" />
                    )}
                    Save Layout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={() => setIsLayoutSettingsOpen(true)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only">
                      Layout Settings
                    </span>
                  </Button>
                  {availableLayouts.length > 1 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-9 flex-shrink-0"
                        >
                          <Layout className="h-4 w-4 mr-2" />
                          <span>{currentLayout?.name || "Select Layout"}</span>
                          <ChevronDown className="h-3 w-3 ml-1 opacity-70" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0" align="end">
                        <Command>
                          <CommandInput placeholder="Search layouts..." />
                          <CommandEmpty>No layouts found.</CommandEmpty>
                          <CommandGroup>
                            {availableLayouts.map((layout) => (
                              <CommandItem
                                key={layout.id}
                                onSelect={() => {
                                  setCurrentLayout(layout);
                                }}
                              >
                                <Layout className="h-4 w-4 mr-2" />
                                <span>{layout.name}</span>
                                {layout.id === currentLayout?.id && (
                                  <CheckIcon className="h-4 w-4 ml-auto" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9"
                    onClick={() => setEditLayoutMode(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    <span className="sr-only md:not-sr-only">
                      Customize Layout
                    </span>
                  </Button>
                </>
              )}

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
                    <h3 className="text-sm font-medium mb-3">
                      Display Options
                    </h3>
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
            </>
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

      {editLayoutMode && (
        <div className="bg-muted/40 border rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">Customize Dashboard Layout</h3>
            <div className="text-sm text-muted-foreground">
              Drag and resize the cards to customize your dashboard
            </div>
          </div>
        </div>
      )}

      {isComparing && (
        <div className="bg-muted/40 border rounded-lg p-3 flex items-center justify-between mb-4">
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
        </div>
      )}

      {isComparing && Object.keys(comparisonData).length > 0 && (
        <div className="mt-2 pt-2 border-t border-border text-xs text-muted-foreground">
          <details>
            <summary className="cursor-pointer hover:text-foreground">
              Debug information
            </summary>
            <div className="mt-1 space-y-1">
              <div>Cache entries: {getComparisonDebugInfo().cacheEntries}</div>
              <div>Throttle: {getComparisonDebugInfo().throttleStatus}</div>
              <div>
                Requests in progress:{" "}
                {getComparisonDebugInfo().requestsInProgress}
              </div>
              <div className="mt-2">
                {getComparisonDebugInfo().cacheInfo.map((info) => (
                  <div key={info.roomName} className="flex justify-between">
                    <span>{info.roomName}</span>
                    <span
                      className={
                        info.isValid ? "text-green-500" : "text-yellow-500"
                      }
                    >
                      {info.dataPoints} points, {info.age}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </div>
      )}

      {/* Layout Settings Sheet */}
      <Sheet open={isLayoutSettingsOpen} onOpenChange={setIsLayoutSettingsOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Dashboard Layouts</SheetTitle>
            <SheetDescription>
              Manage your custom dashboard layouts
            </SheetDescription>
          </SheetHeader>

          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium mb-1">Available Layouts</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {availableLayouts.map((layout) => (
                  <div
                    key={layout.id}
                    className={`
                      border rounded-md p-3 transition-colors
                      ${
                        layout.id === currentLayout?.id
                          ? "bg-primary/10 border-primary/30"
                          : "hover:bg-muted"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {layout.isDefault && (
                          <Badge variant="outline" className="text-xs">
                            Default
                          </Badge>
                        )}
                        <span className="font-medium truncate max-w-[180px]">
                          {layout.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setLayoutToPreview(layout);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Preview</TooltipContent>
                          </UITooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  setLayoutToRename(layout);
                                  setNewLayoutNameInput(layout.name);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Rename</TooltipContent>
                          </UITooltip>
                        </TooltipProvider>

                        {!layout.isDefault && (
                          <TooltipProvider>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-destructive/70 hover:text-destructive"
                                  onClick={() => setLayoutToDelete(layout)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </UITooltip>
                          </TooltipProvider>
                        )}

                        {!layout.isDefault && (
                          <TooltipProvider>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={async () => {
                                    const teamId = searchParams.get("teamId");
                                    if (!teamId) return;
                                    try {
                                      await axios.put(
                                        `/api/teams/${teamId}/layouts/default/${layout.id}`
                                      );

                                      // Update layouts in state
                                      setAvailableLayouts((prev) =>
                                        prev.map((l) => ({
                                          ...l,
                                          isDefault: l.id === layout.id,
                                        }))
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Failed to set default layout:",
                                        error
                                      );
                                    }
                                  }}
                                >
                                  <Star className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Set as default</TooltipContent>
                            </UITooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>

                    <div className="w-full h-24 bg-muted/50 rounded-md overflow-hidden relative border border-border/50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="grid grid-cols-12 gap-1 w-full h-full p-2">
                          {/* Simple visual representation of the layout */}
                          {layout.layout?.lg?.map((item) => (
                            <div
                              key={item.i}
                              className="bg-primary/20 rounded-sm border border-primary/30"
                              style={{
                                gridColumn: `span ${item.w} / span ${item.w}`,
                                gridRow: `span ${Math.min(
                                  item.h,
                                  4
                                )} / span ${Math.min(item.h, 4)}`,
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {layout.id === currentLayout?.id ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        disabled
                      >
                        <CheckIcon className="h-4 w-4 mr-2" />
                        Current Layout
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => {
                          setCurrentLayout(layout);
                          setIsLayoutSettingsOpen(false);
                        }}
                      >
                        Apply Layout
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <Button
                variant="default"
                size="sm"
                className="w-full"
                onClick={() => {
                  // Create a new layout object based on the default but with a unique ID
                  const newLayout = {
                    ...defaultLayout,
                    id: "new-" + Date.now(), // Temporary ID until saved
                    name: "New Layout",
                  };
                  // Set the new layout as current
                  setCurrentLayout(newLayout);
                  // Reset layout name input
                  setNewLayoutName("New Layout");
                  // Close the settings sheet
                  setIsLayoutSettingsOpen(false);
                  // Enable edit mode
                  setEditLayoutMode(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Layout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Layout Preview Dialog */}
      <Dialog
        open={layoutToPreview !== null}
        onOpenChange={(open) => !open && setLayoutToPreview(null)}
      >
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Preview: {layoutToPreview?.name}</DialogTitle>
            <DialogDescription>
              Preview this layout before applying it to your dashboard
            </DialogDescription>
          </DialogHeader>

          <div className="w-full bg-muted/20 rounded-md overflow-hidden h-[300px] relative border">
            <div className="grid grid-cols-12 gap-1 w-full h-full p-2">
              {layoutToPreview?.layout?.lg?.map((item) => (
                <div
                  key={item.i}
                  className="bg-primary/10 rounded border border-primary/20 flex items-center justify-center text-xs"
                  style={{
                    gridColumn: `span ${item.w} / span ${item.w}`,
                    gridRow: `span ${Math.min(item.h, 6)} / span ${Math.min(
                      item.h,
                      6
                    )}`,
                  }}
                >
                  {item.i === "temperature-trend" && (
                    <Thermometer className="h-5 w-5 mr-1 text-primary/70" />
                  )}
                  {item.i === "climate-quality" && (
                    <Activity className="h-5 w-5 mr-1 text-primary/70" />
                  )}
                  {item.i === "device-readings" && (
                    <BarChart className="h-5 w-5 mr-1 text-primary/70" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLayoutToPreview(null)}>
              Cancel
            </Button>
            <Button onClick={applyPreviewedLayout}>Apply Layout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Layout Dialog */}
      <Dialog
        open={layoutToRename !== null}
        onOpenChange={(open) => !open && setLayoutToRename(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Layout</DialogTitle>
            <DialogDescription>
              Enter a new name for the layout
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="layout-name" className="text-sm">
              Layout Name
            </Label>
            <Input
              id="layout-name"
              value={newLayoutNameInput}
              onChange={(e) => setNewLayoutNameInput(e.target.value)}
              placeholder="Enter layout name"
              className="mt-1"
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setLayoutToRename(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleRenameLayout}
              disabled={isRenamingLayout || !newLayoutNameInput.trim()}
            >
              {isRenamingLayout ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Rename
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Layout Confirmation */}
      <AlertDialog
        open={layoutToDelete !== null}
        onOpenChange={(open) => !open && setLayoutToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Layout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the layout &quot;
              {layoutToDelete?.name}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLayoutToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLayout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeletingLayout}
            >
              {isDeletingLayout ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {!isComparing && currentLayout && (
        <ResponsiveGridLayout
          className="layout"
          layouts={currentLayout.layout}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={40}
          isDraggable={editLayoutMode}
          isResizable={editLayoutMode}
          onLayoutChange={handleLayoutChange}
        >
          <div key="temperature-trend">
            <Card className="bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    Temperature & Humidity Trends
                  </CardTitle>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>24-hour trend for temperature and humidity</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>
                  24-hour temperature and humidity trend
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-98px)]">
                {dailyTrendData.length > 0 ? (
                  <ChartContainer
                    config={dailyTrendConfig}
                    className="h-full w-full"
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
                        <linearGradient
                          id="colorTemp"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
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
                        <linearGradient
                          id="colorHumid"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
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
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>No temperature data available for the last 24 hours</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div key="climate-quality">
            <Card className="bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    Climate Quality
                  </CardTitle>
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>
                  Current room climate assessment
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-98px)]">
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-7xl mb-2">{comfortData.emoji}</div>
                  <h3
                    className={`text-2xl font-bold ${comfortData.color} mb-1`}
                  >
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
                            ].temperature.toFixed(1)}°${
                              settings.temperatureUnit
                            }`
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
          </div>

          <div key="device-readings">
            <Card className="bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">
                    Device Readings
                  </CardTitle>
                  <Thermometer className="h-5 w-5 text-primary" />
                </div>
                <CardDescription>
                  Detailed device readings over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-98px)]">
                {roomId ? (
                  <DeviceReadingsChart roomId={roomId} initialPeriod="day" />
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <p>Select a room to view device readings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default Dashboard;
