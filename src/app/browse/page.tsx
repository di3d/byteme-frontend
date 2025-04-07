"use client";

import { useEffect, useState } from "react";
import axios from "axios";


export default function Browse() {
  const [data, setData] = useState<any>(null); // Use appropriate type instead of `any`
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "http://localhost:5000/recommendation/all",
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8  min-h-screen text-white">
      <div className="w-full bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 py-12 px-6 rounded-xl mb-8">
        <h1 className="text-4xl font-extrabold mb-4">Community PC Builder</h1>
        <p className="text-lg">
          Build your perfect PC with recommendations from our community of
          enthusiasts
        </p>
      </div>
      <div>

        {data.data.map((item, index) => {
          return <div key={index}>{item["customer_id"]}</div>; // Add return here and use a unique key for each element
        })}
      </div>
    </div>
  );
}
