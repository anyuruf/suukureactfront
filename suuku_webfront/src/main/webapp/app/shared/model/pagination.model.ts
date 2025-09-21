export interface SortFunction {
  (field: string): () => void;
}

export interface HandlePagination {
  (currentPage: number): void;
}
