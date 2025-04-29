export interface IMarvelCharacter {
   id: number;
   name: string;
   description: string;
   thumbnail: {
      path: string;
      extension: string;
   };
}
 
export interface IMarvelApiResponse {
   map(character: any): import("react").ReactNode;
   data: {
      results: IMarvelCharacter[];
      offset: number;
      limit: number;
      total: number;
   };
}