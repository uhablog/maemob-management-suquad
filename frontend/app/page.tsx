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

  console.log(data);

  return (
    <main>
      <h1>GraphQL Response:</h1>
      <p>{data.status}</p>
    </main>
  );
}
