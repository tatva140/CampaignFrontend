export interface AzkarCategoryListModel {
  items: CategoryList[];
  page: number;
  pageSize: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}
export interface CategoryList {
  id: string;
  iconUrl: string;
  name: string;
  hasSubCategories: boolean;
}
