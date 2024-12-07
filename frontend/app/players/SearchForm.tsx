type Props = {
  season: number;
  teamId: number;
  page: number;
  setSeason: (value: number) => void;
  setTeamId: (value: number) => void;
  setPage: (value: number) => void;
  onSearch: () => void;
};

const teams = [
  { id: 529, name: 'FCB' },
  { id: 530, name: 'ATM' },
  { id: 531, name: 'Atheletic' },
  { id: 532, name: 'Valencia' },
  { id: 533, name: 'Villareal' },
  { id: 541, name: 'Real Madrid' },
]

export default function SearchForm({
  season,
  teamId,
  page,
  setSeason,
  setTeamId,
  setPage,
  onSearch
}: Props) {
  return (
    <div className="flex items-center bg-white p-6 rounded shadow-md space-x-4">
    <input
      type="number"
      placeholder="season"
      value={season}
      onChange={(e) => setSeason(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
    <select
      value={teamId}
      onChange={(e) => setTeamId(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    >
      {teams.map((team) => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ))}
    </select>
    <input
      type="number"
      placeholder="page"
      value={page}
      onChange={(e) => setPage(Number(e.target.value))}
      className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
    />
    <button
      onClick={onSearch}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Search
    </button>
  </div>
  )
};