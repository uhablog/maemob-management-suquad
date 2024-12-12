'use client';

import { FootballApiPlayer } from '@/types/footballApiPlayer';
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import PlayersTable from './PlayersTable';
import SearchForm from './SearchForm';
import AddPlayerDialog from './AddPlayerDialog';

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
  const [ teamId, setTeamId ] = useState<number>(529);
  const [ page, setPage ] = useState<number>(1);
  const [selectedPlayer, setSelectedPlayer] = useState<FootballApiPlayer | null>(null);

  const [ getFootballApiPlayers, { loading, data, error }] = useLazyQuery(GET_FOOTBALL_API_PLAYERS);

  const handleSearch = () => {
    console.log('handleSearch');
    console.log(teamId);
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
      <SearchForm
        season={season}
        teamId={teamId}
        page={page}
        setSeason={setSeason}
        setTeamId={setTeamId}
        setPage={setPage}
        onSearch={handleSearch}
      />
      <PlayersTable
        loading={loading}
        error={error}
        data={data?.footballAPIPlayers}
        onAdd={(player) => setSelectedPlayer(player)}
      />
      { selectedPlayer && (
        <AddPlayerDialog
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  )
};
