'use client';

import { FootballApiPlayer } from '@/types/footballApiPlayer';
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';

const GET_FOOTBALL_API_PLAYERS = gql`
  query FootballAPIPlayers($season: Float!, $teamId: Float!, $page: Float!) {
    footballAPIPlayers(season: $season, teamId: $teamId, page: $page) {
      footballapi_player_id
      footballapi_team_id
      player_name
      birth_date
      nationality
      height
      weight
    }
  }
`;


export default function PlayersPage() {

  const [ season, setSeason ] = useState<number>(2024);
  const [ teamId, setTeamId ] = useState<number>();
  const [ page, setPage ] = useState<number>(1);

  const [ getFootballApiPlayers, { loading, data, error }] = useLazyQuery(GET_FOOTBALL_API_PLAYERS);

  const handleSearch = () => {
    getFootballApiPlayers({
      variables: {
        season,
        teamId,
        page
      }
    });
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Player Search</h1>
      <div className="flex items-center bg-white p-6 rounded shadow-md space-x-4">
        <input
          type="number"
          placeholder="season"
          value={season}
          onChange={(e) => setSeason(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="teamId"
          value={teamId}
          onChange={(e) => setTeamId(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="page"
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="mt-6 w-full bg-white p-4 rounded shadow-md">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {data && data.footballAPIPlayers ? (
          <div className="overflow-x-auto">
            <div className='max-h-96 overflow-y-auto border border-gray-300 rounded'>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border-b text-left">Player ID</th>
                    <th className="px-4 py-2 border-b text-left">Team ID</th>
                    <th className="px-4 py-2 border-b text-left">Name</th>
                    <th className="px-4 py-2 border-b text-left">Birth Date</th>
                    <th className="px-4 py-2 border-b text-left">Nationality</th>
                    <th className="px-4 py-2 border-b text-left">Height</th>
                    <th className="px-4 py-2 border-b text-left">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {data.footballAPIPlayers.map((player: FootballApiPlayer) => (
                    <tr key={player.footballapi_player_id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{player.footballapi_player_id}</td>
                      <td className="px-4 py-2 border-b">{player.footballapi_team_id}</td>
                      <td className="px-4 py-2 border-b">{player.player_name}</td>
                      <td className="px-4 py-2 border-b">{player.birth_date}</td>
                      <td className="px-4 py-2 border-b">{player.nationality}</td>
                      <td className="px-4 py-2 border-b">{player.height || 'N/A'}</td>
                      <td className="px-4 py-2 border-b">{player.weight || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !loading && <p>No player found.</p>
        )}
      </div>
    </div>
  )
};
