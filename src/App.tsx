import { useEffect, useState } from "react";
import type { Character } from "./types/character";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import CharacterTable from "./components/CharactersTable";

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Will get from API
  const [loading, setLoading] = useState(true); // To show a loading state

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);

      if (search === "") {
        // Fetch only one page
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await res.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
        setAllCharacters([]); // Clear previous search data
      } else {
        // Search active: fetch ALL characters once
        let all: Character[] = [];
        let nextUrl: string | null =
          "https://rickandmortyapi.com/api/character";

        while (nextUrl) {
          const res = await fetch(nextUrl);
          const data = await res.json();
          all = [...all, ...data.results];
          nextUrl = data.info.next;
        }

        setAllCharacters(all);
      }

      setLoading(false);
    };

    fetchCharacters();
  }, [page, search]);

  function toggleExpand(id: number) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  // const charactersToShow = (search === "" ? characters : allCharacters).filter(
  //   (char) => char.name.toLowerCase().startsWith(search.toLowerCase())
  // );

  const charactersToShow =
    search === ""
      ? characters
      : allCharacters.filter((char) =>
          char.name.toLowerCase().startsWith(search.toLowerCase())
        );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          style={{ maxWidth: "400px", width: "100%", height: "auto" }}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Rick_and_Morty.svg"
          alt="Rick and Morty logo png"
        />
      </div>

      <h1>Characters</h1>

      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : charactersToShow.length === 0 ? (
        <p>No character found.</p>
      ) : (
        <CharacterTable
          charactersToShow={charactersToShow}
          expandedId={expandedId}
          onToggleExpand={toggleExpand}
        />
      )}

      {/* Pagination buttons - only show when not searching */}
      {search === "" && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default App;
