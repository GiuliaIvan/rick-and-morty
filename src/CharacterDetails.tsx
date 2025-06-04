import { useEffect, useState } from "react";

// Define the types we need
type Character = {
  name: string;
  image: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
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
    <div style={{ display: "flex", gap: "16px" }}>
      <img
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
        src={character.image}
        alt={character.name}
      />
      <div>
        <p>
          <strong>Origin:</strong> {character.origin.name}
        </p>
        <p>
          <strong>Location:</strong> {character.location.name}
        </p>
        <p>
          <strong>Episodes:</strong>
        </p>
        <ul>
          {episodes.map((ep) => (
            <li key={ep.id}>
              {ep.name} ({ep.episode})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CharacterDetails;
