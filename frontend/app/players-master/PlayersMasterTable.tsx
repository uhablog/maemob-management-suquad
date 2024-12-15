import { PlayerMaster } from "@/types/playerMaster";
import { ApolloError } from "@apollo/client";

type Props = {
  loading: boolean;
  error: ApolloError | undefined;
  data?: PlayerMaster[];
  onAdd: (player: PlayerMaster) => void;
};

export default function PlayersMasterTable({
  loading,
  error,
  data,
  onAdd
}: Props) {

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">Error: {error.message}</p>

  return (
    <div className="mt-6 w-full bg-white p-4 rounded shadow-md">
      {data && data.length > 0 ? (
        <div className="overflow-x-auto">
          <div className='max-h-96 overflow-y-auto border border-gray-300 rounded'>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border-b text-left">Player ID</th>
                  <th className="px-4 py-2 border-b text-left">Player Name</th>
                  <th className="px-4 py-2 border-b text-left"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((player: PlayerMaster) => (
                  <tr key={player.playerId} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{player.playerId}</td>
                    <td className="px-4 py-2 border-b">{player.playerName}</td>
                    <td className="px-4 py-2 border-b">
                      <button
                        onClick={() => onAdd(player)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Add
                      </button>
                    </td>
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
  )
}