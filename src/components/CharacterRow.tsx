import { useEffect, useState } from "react";
import type { Character } from "../types/character";
import type { Episode } from "../types/episode";
import CharacterInfo from "./CharacterInfo";

function CharacterRow({ character }: { character: Character }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const urls = character.episode;
        const episodeIds = urls.map((url) => url.split("/").pop());
        const joinedIds = episodeIds.join(",");

        const res = await fetch(
          `https://rickandmortyapi.com/api/episode/${joinedIds}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error status ${res.status}`);
        }

        const data = await res.json();

        setEpisodes(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    };

    fetchEpisodes();
  }, [character]);

  return (
    <div
      style={{ display: "flex", gap: "16px", justifyContent: "space-between" }}
    >
      <div>
        <CharacterInfo character={character} episodes={episodes} />
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

export default CharacterRow;
