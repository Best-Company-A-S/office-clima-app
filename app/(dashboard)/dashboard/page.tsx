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
} from "lucide-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
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
    const fetchData = async () => {
      setIsLoading(true);
      const teamId = searchParams.get("teamId");
      const roomId = searchParams.get("roomId");

      if (!teamId) {
        setIsLoading(false);
        return;
      }

      try {
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
      <div>
        <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your climate data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Temperature Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Temperature</CardTitle>
              <Thermometer className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Average across all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {deviceData.length > 0
                ? `${averageTemperature.toFixed(1)}°${settings.temperatureUnit}`
                : `-- °${settings.temperatureUnit}`}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {deviceData.length} device{deviceData.length !== 1 ? "s" : ""}{" "}
              reporting
            </div>
          </CardContent>
        </Card>

        {/* Humidity Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Humidity</CardTitle>
              <Droplet className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Average across all devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {deviceData.length > 0
                ? `${averageHumidity.toFixed(0)}${settings.humidityUnit}`
                : `-- ${settings.humidityUnit}`}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {deviceData.length} device{deviceData.length !== 1 ? "s" : ""}{" "}
              reporting
            </div>
          </CardContent>
        </Card>

        {/* Last Updated Card */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Last Updated
              </CardTitle>
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>Most recent device readings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {deviceData.length > 0
                ? new Date(
                    Math.max(
                      ...deviceData.map((d) => new Date(d.createdAt).getTime())
                    )
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No data"}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {deviceData.length > 0
                ? new Date(
                    Math.max(
                      ...deviceData.map((d) => new Date(d.createdAt).getTime())
                    )
                  ).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section - charts or other data */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Trends Chart */}
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                Daily Trends
              </CardTitle>
              <BarChart className="h-5 w-5 text-primary" />
            </div>
            <CardDescription>
              Temperature and humidity over the last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dailyTrendData.length > 0 ? (
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

        {/* Climate Quality Card */}
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
      </div>

      {/* Full Device Readings Chart */}
      <div className="mt-6">
        {roomId && <DeviceReadingsChart roomId={roomId} initialPeriod="day" />}
      </div>
    </div>
  );
};

export default Dashboard;
