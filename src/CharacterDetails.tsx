import { useEffect, useState } from "react";

// Define the types we need
type Character = {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
  image: string;
};

type Episode = {
  id: number;
  name: string;
  episode: string; // Example: "S01E01"
};

function CharacterDetails({ character }: { character: Character }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const urls = character.episode;
    const episodeIds = urls.map((url) => {
      const parts = url.split("/");
      return parts[parts.length - 1];
    });
    const joinedIds = episodeIds.join(",");

    fetch(`https://rickandmortyapi.com/api/episode/${joinedIds}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEpisodes(data);
        } else {
          setEpisodes([data]);
        }
      });
  }, [character]);

  return (
    <div
      style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}
    >
      <div>
        <p>
          <strong>Name:</strong> {character.name}
        </p>
        <p>
          <strong>Gender:</strong> {character.gender}
        </p>
        <p>
          <strong>Status:</strong> {character.status}
        </p>
        <p>
          <strong>Species:</strong> {character.species}
        </p>
        <p>
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p>
          <strong>Location:</strong> {character.location.name}
        </p>
        <p>
          <strong>Episodes:</strong>
        </p>
        <table
          border={1}
          cellPadding={10}
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th>Name</th>
              <th>Season</th>
              <th>Episode</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map((ep) => {
              const match = ep.episode.match(/^S(\d+)E(\d+)$/);
              const season = match ? match[1] : "N/A";
              const episodeNum = match ? match[2] : "N/A";

              return (
                <tr key={ep.id}>
                  <td>{ep.name}</td>
                  <td>{season}</td>
                  <td>{episodeNum}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <img
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          //borderRadius: "50%",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
        src={character.image}
        alt={character.name}
      />
    </div>
  );
}

export default CharacterDetails;
