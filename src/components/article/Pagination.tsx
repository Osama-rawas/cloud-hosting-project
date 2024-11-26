import Link from "next/link";

interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}
const Pagination = async ({ pages, pageNumber, route }: PaginationProps) => {
  const pageArray: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pageArray.push(i);
  }
  const prev = pageNumber - 1;
  const next = pageNumber + 1;
  return (
    <div className="flex items-center justify-center mt-2 mb-10">
      {pageNumber !== 1 && (
        <Link
          href={`${route}${prev}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Prev
        </Link>
      )}
      {pageArray.map((page: number) => (
        <Link
          href={`${route}${page}`}
          className={`${
            pageNumber === page ? "bg-gray-400" : ""
          } border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition`}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}${next}`}
          className="border border-gray-700 text-gray-700 py-1 px-3 font-bold text-xl cursor-pointer hover:bg-gray-200 transition"
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
