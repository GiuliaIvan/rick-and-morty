import type { Episode } from "../types/episode";

type Props = {
  episodes: Episode[];
};

function EpisodeTable({ episodes }: Props) {
  return (
    <>
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
    </>
  );
}

export default EpisodeTable;
