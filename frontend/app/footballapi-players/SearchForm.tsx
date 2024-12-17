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
  { id: 33, name: 'Manchester United' },
  { id: 34, name: 'Newcastle' },
  { id: 35, name: 'Bournemouth' },
  { id: 36, name: 'Fulham' },
  { id: 38, name: 'Watford' },
  { id: 39, name: 'Wolves' },
  { id: 40, name: 'Liverpool' },
  { id: 41, name: 'Southampton' },
  { id: 42, name: 'Arsenal' },
  { id: 44, name: 'Burnley' },
  { id: 45, name: 'Everton' },
  { id: 46, name: 'Leiceter' },
  { id: 47, name: 'Tottenham' },
  { id: 48, name: 'West Ham' },
  { id: 49, name: 'Chelsea' },
  { id: 50, name: 'ManchesterCity' },
  { id: 51, name: 'Brighton' },
  { id: 52, name: 'Crystal Palace' },
  { id: 55, name: 'Brentford' },
  { id: 63, name: 'Leeds' },
  { id: 65, name: 'Nottingham Forest' },
  { id: 79, name: 'Lille' },
  { id: 80, name: 'Lyon' },
  { id: 81, name: 'Marseille' },
  { id: 84, name: 'Nice' },
  { id: 85, name: 'Paris Saint Germain' },
  { id: 91, name: 'Monaco' },
  { id: 93, name: 'Rennes' },
  { id: 157, name: 'Bayern Munchen' },
  { id: 165, name: 'Borussia Dortmund' },
  { id: 168, name: 'Bayer Leverkusen' },
  { id: 169, name: 'Eintracht Frankfurt' },
  { id: 172, name: 'VfB Stuttgort' },
  { id: 173, name: 'RB Leipzig' },
  { id: 174, name: 'FC Schalke 04' },
  { id: 175, name: 'Hamburger SV' },
  { id: 194, name: 'Ajax' },
  { id: 197, name: 'PSV Eindhoven' },
  { id: 201, name: 'AZ Alkmaar' },
  { id: 202, name: 'Groningen' },
  { id: 209, name: 'Feyenoord' },
  { id: 211, name: 'Benfica' },
  { id: 212, name: 'FC Porto' },
  { id: 228, name: 'Sporting CP' },
  { id: 487, name: 'Lazio' },
  { id: 488, name: 'Sassuolo' },
  { id: 489, name: 'AC Milan' },
  { id: 492, name: 'Napoli' },
  { id: 496, name: 'Juventus' },
  { id: 497, name: 'AS Roma' },
  { id: 499, name: 'Atalanta' },
  { id: 502, name: 'Fiorentina' },
  { id: 503, name: 'Torino' },
  { id: 505, name: 'Inter' },
  { id: 529, name: 'FCB' },
  { id: 530, name: 'ATM' },
  { id: 531, name: 'Atheletic' },
  { id: 532, name: 'Valencia' },
  { id: 533, name: 'Villareal' },
  { id: 536, name: 'Sevilla' },
  { id: 541, name: 'Real Madrid' },
  { id: 543, name: 'Real Betis' },
  { id: 547, name: 'Girona' },
  { id: 548, name: 'Real Sociedad' },
  { id: 2932, name: 'Al-Hilal Saudi FC' },
  { id: 2938, name: 'Al-Ittihad FC' },
  { id: 2939, name: 'Al-Nassr' },
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