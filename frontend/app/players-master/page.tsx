'use client';
import { PlayerMaster } from "@/types/playerMaster";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import PlayersMasterTable from "./PlayersMasterTable";
import PlayersMasterSearchForm from "./PlayersMasterSearchForm";
import AddSquadDialog from "./AddSquadDialog";

const GET_PLAYER_MASTER = gql`
  query GetPlayers($page: Float!){
    getPlayers(page: $page) {
      page
      total
      players {
        playerId
        playerName
      }
    }
  }
`;

export default function PlayerMasterPage() {
  const [ page, setPage ] = useState<number>(1);
  const [ selectedPlayer, setSelectedPlayer ] = useState<PlayerMaster | null>(null);

  const { loading, data, error } = useQuery(GET_PLAYER_MASTER, {
    variables: { page }
  });

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Player Master Search</h1>
      <PlayersMasterSearchForm
        page={page}
        total={data?.getPlayers.total || 10}
        setPage={setPage}
      />
      <PlayersMasterTable
        loading={loading}
        error={error}
        data={data?.getPlayers.players}
        onAdd={(player) => setSelectedPlayer(player)}
      />
      { selectedPlayer && (
        <AddSquadDialog
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  )
}