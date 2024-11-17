"use client";

import { useState, useEffect } from "react";
import { Car, MapPin, Clock } from "lucide-react";

interface RideDetails {
  rideId: string;
  eventId: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: "pending" | "confirmed" | "completed";
  amount: string;
}

export default function RidesPage() {
  const [rides, setRides] = useState<RideDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRides();
  }, []);

  const loadRides = async () => {
    setLoading(true);
    try {
      // In a real app, fetch from your backend
      const mockRides: RideDetails[] = [
        {
          rideId: "0x123",
          eventId: "evt_1",
          pickupTime: new Date().toISOString(),
          pickupLocation: "123 Main St",
          dropoffLocation: "456 Market St",
          status: "pending",
          amount: "50 USDC",
        },
        // Add more mock rides...
      ];
      setRides(mockRides);
    } catch (error) {
      console.error("Failed to load rides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayRide = async (ride: RideDetails) => {
    // try {
    //   const connector = new AccountKitConnector({
    //     apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
    //     chain: arbitrum,
    //   });
    //   const email = prompt("Enter your email to pay for ride:");
    //   if (!email) return;
    //   await connector.connectWithPasskey(email);
    //   const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
    //   const data = `0x${ride.rideId}`; // scheduleRidePayment function signature
    //   await connector.sendTransaction(contractAddress, data);
    //   alert("Payment successful!");
    //   await loadRides();
    // } catch (error) {
    //   console.error("Payment failed:", error);
    //   alert("Failed to process payment");
    // }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Car className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold">Ride Management</h1>
      </div>

      {loading ? (
        <div className="text-center">Loading rides...</div>
      ) : (
        <div className="space-y-4">
          {rides.map((ride) => (
            <div
              key={ride.rideId}
              className="bg-white p-6 rounded-lg border space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Ride #{ride.rideId}</h3>
                <span
                  className={`
                  px-3 py-1 rounded-full text-sm
                  ${
                    ride.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : ride.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }
                `}
                >
                  {ride.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{new Date(ride.pickupTime).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{ride.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{ride.dropoffLocation}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <span className="text-lg font-semibold">{ride.amount}</span>
                  {ride.status === "pending" && (
                    <button
                      onClick={() => handlePayRide(ride)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
