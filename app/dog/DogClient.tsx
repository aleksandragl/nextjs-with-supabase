"use client";

import { useState, useEffect } from "react";

type Props = {
  image: string;
};

export default function DogClient({ image }: Props) {
  const [dog, setDog] = useState(image);

  const fetchDog = async () => {
    const res = await fetch("/api/dog");
    const data = await res.json();
    setDog(data.message);
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <img src={dog} alt="Dog" className="max-w-xs rounded-lg shadow-md" />
      <button
        onClick={fetchDog}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Fetch New Dog!!!!!!!
      </button>
    </div>
  );
}
