import { Convention } from "@/types/convention";
import { PlayerMaster } from "@/types/playerMaster";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

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
  const [ selectedConvention, setSelectedConvention ] = useState<string>();
  const [ selectedTeam, setSelectedTeam ] = useState<string>();

  const [ getConventions, {loading, data, error}] = useLazyQuery(GET_CONVENTIONS, {
    variables: { page },
    onCompleted: (data) => setConventions(data.getConventions.conventions)
  });

  useEffect(() => {
    getConventions
  }, [ getConventions ]);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    getConventions({ variables: { page } });
  }, [page, getConventions]);

  const onAssign = () => {
    console.log(selectedConvention, selectedTeam);
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Add Squad</h2>

        {loading && <p>Loading tournaments...</p>}
        {error && <p className="text-red-500">Error loading tournaments</p>}

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

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onAssign()}
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
