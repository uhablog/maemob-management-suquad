'use client';

import { gql, useQuery } from '@apollo/client';

const STATUS_CHECK = gql`
  query {
    status
  }
`

export default function Home() {

  const { loading, error, data } = useQuery(STATUS_CHECK);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="text-left p-8 bg-white shadow-md rounded-lg max-3w-lg w-full h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Homepage</h1>
      <p className="text-gray-600">
        {data.status}
      </p>
    </div>
  );
}
