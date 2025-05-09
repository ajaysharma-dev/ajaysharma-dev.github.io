import { FunctionComponent } from "react";

export type PaginationProps = {
  page: number;
  pages: number;
  onPagechange: (page: number) => void;
};

const Pagination: FunctionComponent<PaginationProps> = ({
  page,
  pages,
  onPagechange,
}) => {
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {Array.from({ length: pages }).map((_, number) => (
          <li
            className={`px-2 py-1 ${page === number + 1 ? "bg-gray-200" : ""}`}
            key={number}
          >
            <button
              className="cursor-pointer"
              onClick={() => onPagechange(number + 1)}
            >
              {number + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
