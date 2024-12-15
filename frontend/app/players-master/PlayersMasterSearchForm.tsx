type Props = {
  page: number;
  total: number;
  setPage: (value: number) => void;
}

export default function PlayersMasterSearchForm({
  page,
  total,
  setPage
}: Props) {

  const PAGE_SIZE = 3;
  return (
    <div className="flex items-center bg-white p-6 rounded shadow-md space-x-4">
      <input
        type="number"
        placeholder="page"
        min={1}
        max={total / PAGE_SIZE}
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
      />
    </div>
  )
};