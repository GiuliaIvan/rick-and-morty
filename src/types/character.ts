export type Character = {
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