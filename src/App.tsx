import { Fragment, useEffect, useState } from "react";
import CharacterDetails from "./CharacterDetails";

type Character = {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  location: { name: string };
  origin: { name: string };
  image: string;
  episode: string[];
};

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?name=${search}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results);
        } else {
          setCharacters([]);
        }
      });
  }, [search]);

  function toggleExpand(id: number) {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  }

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
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "16px", width: "300px" }}
      />
      <table
        border={1}
        cellPadding={10}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          <tr style={{textAlign: "left"}}>
            <th>Name</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Species</th>
            <th>Location</th>
            <th>Episodes</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((char) => (
            <Fragment key={char.id}>
              <tr
                onClick={() => toggleExpand(char.id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  {expandedId === char.id ? "▼" : "▶"} &nbsp;
                  {char.name}
                </td>
                <td>{char.gender}</td>
                <td>{char.status}</td>
                <td>{char.species}</td>
                <td>{char.location.name}</td>
                <td>{char.episode.length}</td>
              </tr>

              {expandedId === char.id && (
                <tr>
                  <td colSpan={6}>
                    <CharacterDetails character={char} />
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
