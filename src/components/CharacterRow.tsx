import { useEffect, useState } from "react";
import type { Character } from "../types/character";
import type { Episode } from "../types/episode";
import CharacterInfo from "./CharacterInfo";

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

export default CharacterDetails;
