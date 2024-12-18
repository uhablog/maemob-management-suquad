import { Convention } from "@/types/convention";
import { PlayerMaster } from "@/types/playerMaster";
import { Team } from "@/types/team";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_CONVENTIONS = gql`
  query GetConventions($page: Float!) {
    getConventions(page: $page) {
      page
      total
      conventions {
        conventionId
        conventionName
        heldDate
      }
    }
  }
`;

const GET_TEAMS = gql`
  query GetTeams($conventionId: String!) {
    getTeams(conventionId: $conventionId) {
      teams {
        teamId
        teamName
      }
    }
  }
`;

const CREATE_SQUAD = gql`
  mutation CreateSquad(
    $teamId: String!
    $playerId: String!
  ) {
    createSquad(
      teamId: $teamId
      playerId: $playerId
    )
  }
`;

type Props = {
  player: PlayerMaster;
  onClose: () => void;
}

export default function AddSquadDialog({
  player,
  onClose
}: Props) {

  const [ page, setPage ] = useState(1);
  const [ conventions, setConventions ] = useState<Convention[]>([]);
  const [ teams, setTeams ] = useState<Team[]>([]);
  const [ selectedConvention, setSelectedConvention ] = useState<string>();
  const [ selectedTeam, setSelectedTeam ] = useState<string>();

  // 大会取得クエリの実行
  const {
    loading: getConventionsLoading,
    error: getConventionsError
  } = useQuery(GET_CONVENTIONS, {
    variables: { page },
    onCompleted: (data) => {
      setConventions(data.getConventions.conventions);
      setSelectedConvention(data.getConventions.conventions[0].conventionId);
      return;
    }
  });

  // チーム取得のクエリ
  const {
    loading: getTeamsLoading,
    error: getTeamsError
  } = useQuery(GET_TEAMS, {
    variables: {
      conventionId: selectedConvention
    },
    onCompleted: (data) => {
      setTeams(data.getTeams.teams);
      setSelectedTeam(data.getTeams.teams[0].teamId);
      return;
    }
  });

  const [ createSquad ] = useMutation(CREATE_SQUAD);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const onAssign = async () => {
    console.log('onAssign');

    try {
      const variables = {
        teamId: selectedTeam,
        playerId: player.playerId
      }
      console.log(variables);

      const result = await createSquad({ variables });
      console.log(result);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error adding squad!!');
    }

  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Squad</h2>
        <p>{`Player: ${player.playerName}`}</p>

        {getConventionsLoading && <p>Loading tournaments...</p>}
        {getConventionsError && <p className="text-red-500">Error loading tournaments</p>}

        <select
          value={selectedConvention}
          onChange={(e) => setSelectedConvention(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="" disabled>Select Convention</option>
          {conventions.map((convention) => (
            <option key={convention.conventionId} value={convention.conventionId}>
              {convention.conventionName}
            </option>
          ))}
        </select>

        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>

        {getTeamsLoading && <p>Loading Teams...</p>}
        {getTeamsError && <p className="text-red-500">Error Loading teams</p>}

        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          <option value="" disabled>Select Team</option>
          {teams.map((team) => (
            <option key={team.teamId} value={team.teamId}>
              {team.teamName}
            </option>
          ))}
        </select>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onAssign}
            disabled={!selectedConvention || !selectedTeam}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  )
}
