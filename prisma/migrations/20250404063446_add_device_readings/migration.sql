-- CreateTable
CREATE TABLE "DeviceReading" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceReading_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeviceReading_deviceId_idx" ON "DeviceReading"("deviceId");

-- CreateIndex
CREATE INDEX "DeviceReading_timestamp_idx" ON "DeviceReading"("timestamp");

-- AddForeignKey
ALTER TABLE "DeviceReading" ADD CONSTRAINT "DeviceReading_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("device_id") ON DELETE CASCADE ON UPDATE CASCADE;
