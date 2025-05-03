export interface IGitHubUser {
   login: string;
   id: number;
   node_id: string;
   avatar_url: string;
   html_url: string;
   type: "User" | "Organization";
   site_admin: boolean;
   score?: number;
}
 
export interface IGitHubResponse {
   total_count: number;
   incomplete_results: boolean;
   items: IGitHubUser[];
}