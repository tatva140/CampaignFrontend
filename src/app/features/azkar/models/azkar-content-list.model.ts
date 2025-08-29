export interface AzkarContentListModel {
  items: ContentList[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}
export interface ContentList {
  id: string;
  description: string;
  repeat: number;
  isBookmarked: boolean;
  audioUrl: string;
}
