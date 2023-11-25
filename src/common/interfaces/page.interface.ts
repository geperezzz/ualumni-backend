export interface Page<T> {
  items: T[];
  meta: {
    pageNumber: number;
    itemsPerPage: number;
    numberOfItems: number;
    numberOfPages: number;
  };
}
