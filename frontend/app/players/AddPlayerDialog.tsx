import { Auth0User } from "@/types/auth0User";
import { FootballApiPlayer } from "@/types/footballApiPlayer";
import { gql, useLazyQuery, useMutation } from "@apollo/client"
import { useEffect, useState } from "react";

const GET_AUTH0_USERS = gql`
  query {
    auth0Users {
      name
      email
      user_id
    }
  }
`

const CREATE_PLAYER = gql`
  mutation CreatePlayer (
    $footballapiPlayerId: String!
    $footballapiTeamId: String!
    $playerName: String!
    $teamAuth0UserId: String!
    $birthDate: String!
    $nationality: String!
    $height: String!
    $weight: String!
  ) {
    createPlayer(
      footballapiPlayerId: $footballapiPlayerId
      footballapiTeamId: $footballapiTeamId
      playerName: $playerName
      teamAuth0UserId: $teamAuth0UserId
      birthDate: $birthDate
      nationality: $nationality
      height: $height
      weight: $weight
    )
  }
`

type Props = {
  player: FootballApiPlayer;
  onClose: () => void;
}

export default function AddPlayerDialog({ player, onClose }: Props) {
  const [ auth0Users, setAuth0Users ] = useState<Auth0User[]>([]);
  const [ selectedUserId, setSelectedUserId ] = useState<string>('');
  const [ getUsers ] = useLazyQuery(GET_AUTH0_USERS, {
    onCompleted: (data) => setAuth0Users(data.auth0Users),
  });
  const [ createPlayer ] = useMutation(CREATE_PLAYER);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleAddPlayer = async () => {
    try {
      const variables = {
        footballapiPlayerId: player.footballapi_player_id,
        footballapiTeamId: player.footballapi_team_id,
        playerName: player.player_name,
        teamAuth0UserId: selectedUserId,
        birthDate: player.birth_date,
        nationality: player.nationality,
        height: player.height || 'N/A',
        weight: player.weight || 'N/A',
      };
  
      const result = await createPlayer({ variables });
      console.log(result);
      alert(result.data.createPlayer);
      onClose();
    } catch (error) {
      console.error(error);
      alert('Error adding player');
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Player</h2>
        <p>{`Player: ${player.player_name}`}</p>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full p2 border border-gray-300 rounded mt-4"
        >
          <option value="" disabled>Select User</option>
          {auth0Users.map((user: Auth0User) => (
            <option key={user.user_id} value={user.user_id}>
              {user.name} {user.email}
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
            onClick={handleAddPlayer}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};