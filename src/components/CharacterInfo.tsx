import type { Character } from "../types/character";
import type { Episode } from "../types/episode";
import EpisodeTable from "./EpisodeTable";
import { Fragment } from "react";

type Props = {
  character: Character;
  episodes: Episode[];
};

function CharacterInfo({ character, episodes }: Props) {
  return (
    <Fragment>
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
      <EpisodeTable episodes={episodes} />
    </Fragment>
  );
}

export default CharacterInfo;
