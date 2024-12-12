import { PlayerMaster } from "@/types/playerMaster";
// import { gql, useLazyQuery } from "@apollo/client";

// const GET_CONVENTIONS = gql`
//   query GetConventions($page: Float!) {
//     getConventions(page: $page) {
//       page
//       total
//       conventions {
//         conventionId
//         conventionName
//         heldDate
//       }
//     }
//   }
// `;

type Props = {
  player: PlayerMaster;
  onClose: () => void;
}

export default function AddSquadDialog({
  player,
  onClose
}: Props) {

  // const [ getConventions, {loading, data, error}] = useLazyQuery(GET_CONVENTIONS);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Squad</h2>
        <p>{`Player: ${player.playerName}`}</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
