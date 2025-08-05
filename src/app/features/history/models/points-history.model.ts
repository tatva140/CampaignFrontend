export interface History {
  event : string;
  points: number;
  date:Date;
  campaignName : string;
  description: string;
  module: string;

}
export interface PointsHistoryListResponse {
  items: History[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}
