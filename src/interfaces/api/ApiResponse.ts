export default interface ApiResponsePagination<T> {
   results: T,
   next?: string;
}