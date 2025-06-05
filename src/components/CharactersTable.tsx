import type { Character } from "../types/character";
import CharacterRow from "./CharacterRow";
import { Fragment } from "react";

type Props = {
  charactersToShow: Character[];
  expandedId: number | null;
  onToggleExpand: (id: number) => void;
};

function CharacterTable({
  charactersToShow,
  expandedId,
  onToggleExpand,
}: Props) {
  return (
    <table
      border={1}
      cellPadding={10}
      style={{ borderCollapse: "collapse", width: "100%" }}
    >
      <thead>
        <tr style={{ textAlign: "left" }}>
          <th>Name</th>
          <th>Gender</th>
          <th>Status</th>
          <th>Species</th>
          <th>Location</th>
          <th>Episodes</th>
        </tr>
      </thead>
      <tbody>
        {charactersToShow.map((char) => (
          <Fragment key={char.id}>
            <tr
              onClick={() => onToggleExpand(char.id)}
              style={{ cursor: "pointer" }}
            >
              <td>
                {expandedId === char.id ? "▼" : "▶"} &nbsp;{char.name}
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
                  <CharacterRow character={char} />
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default CharacterTable;
