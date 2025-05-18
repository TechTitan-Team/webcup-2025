import { useState } from 'react';

export default function useSharedUsers() {
  const [sharedUsers] = useState([
    {
      id: 1,
      name: "Thomas Dupont",
      initial: "T",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      name: "Marie Lambert",
      initial: "M",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      name: "Jean Martin",
      initial: "J",
      color: "bg-purple-100 text-purple-600",
    },
  ]);

  return { sharedUsers };
} 