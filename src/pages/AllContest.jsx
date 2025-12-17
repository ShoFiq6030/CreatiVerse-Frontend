import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

import { useSearchParams } from "react-router";
import axiosSecure from "../api/axiosSecure";
import ContestCard from "../components/common/ContestCard";
import { categories } from "../constants/categories";
import Loading from "../components/common/Loading";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";

export default function AllContest() {
  const [searchParams] = useSearchParams();
  //   const location = useLocation();
  //   const navigate = useNavigate();

  const initialSearch = searchParams.get("search");
  const initialType = searchParams.get("type");

  const [searchInput, setSearchInput] = useState(initialSearch ?? "");

  const [type, setType] = useState(initialType);
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  //   const [loading, setLoading] = useState(isLoading);
  // const [totalCount, setTotalCount] = useState(0);
  // debounce function for search
  const debouncedSearch = useDebounce(searchInput, 1000);

  console.log(type);

  const { data, isLoading, error } = useQuery({
    queryKey: ["contests", debouncedSearch, type, sort, page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/get-contests", {
        params: {
          search: debouncedSearch || undefined,
          type: type || undefined,
          sort: sort || undefined,
          page,
          limit,
        },
      });
      return res.data.data;
    },
    keepPreviousData: true,
  });
  console.log(data);

  // sort options
  const sortOptions = [
    { value: "", label: "Relevance" },
    { value: "newest", label: "Newest" },
    { value: "deadline-asc", label: "Deadline (soonest)" },
    { value: "deadline-desc", label: "Deadline (latest)" },
    { value: "prize-desc", label: "Prize (high → low)" },
    { value: "prize-asc", label: "Prize (low → high)" },
  ];
  // console.log(searchInput, type, sort, page, limit);

  const totalPages = data?.total
    ? Math.max(1, Math.ceil(data?.total / limit))
    : 0;

  //   const syncUrl = (opts = {}) => {
  //     const q = new URLSearchParams({
  //       search: opts.search ?? activeSearch,
  //       type: opts.type ?? type,
  //       sort: opts.sort ?? sort,
  //       page: String(opts.page ?? page),
  //       limit: String(opts.limit ?? limit),
  //     }).toString();
  //     navigate(`/all-contest?${q}`, { replace: true });
  //   };

  const changePage = (p) => {
    setPage(p);
  };
  const getPageRange = () => {
    const maxPagesToShow = 5;

    if (!totalPages || totalPages <= 0) {
      return { pages: [], start: 0, end: 0 };
    }

    if (totalPages <= maxPagesToShow) {
      const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      return { pages, start: 1, end: totalPages };
    }

    let start = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    let end = start + maxPagesToShow - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - maxPagesToShow + 1;
    }

    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    return { pages, start, end };
  };
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    setPage(1);
  };

  const onSubmitSearch = (e) => {
    e?.preventDefault();
    setPage(1);
  };

  const handleSeeAll = () => {
    setPage(1);
    setLimit(data?.total);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* contest type dropdown */}
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="border rounded-full px-3 py-2"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          {/* sort option  */}
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="border rounded-full px-3 py-2"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>

          {/* <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded-full px-3 py-2"
          >
            {[8, 12, 24, 48].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select> */}
        </div>
        {/* search text input form  */}
        <form
          onSubmit={onSubmitSearch}
          className="flex items-center gap-3 flex-1 relative"
        >
          <input
            className="flex-1 border rounded-full px-4 py-2"
            placeholder="Search contests"
            value={searchInput}
            onChange={handleSearch}
            aria-label="Search contests"
          />
          <div className="absolute right-3">
            <IoSearch size={25} />
          </div>

          {/* <button
            className="bg-purple-600 text-white rounded-full px-4 py-2"
            type="submit"
          >
            Search
          </button> */}
        </form>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm ">
            <span className="font-bold text-xl">{data?.total}</span> contests
            found
          </p>
        </div>

        {data?.total > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => changePage(Math.max(1, page - 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page <= 1}
            >
              Prev
            </button>
            <div className="flex items-center gap-1">
              {/* compact numeric pagination */}
              {(() => {
                const { pages, start, end } = getPageRange();
                return (
                  <>
                    {start > 1 && (
                      <>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => changePage(1)}
                        >
                          1
                        </button>
                        {start > 2 && <span className="px-2">...</span>}
                      </>
                    )}

                    {pages.map((p) => (
                      <button
                        key={p}
                        onClick={() => changePage(p)}
                        className={`px-3 py-1 rounded ${
                          p === page ? "bg-purple-600 text-white" : "border"
                        }`}
                        aria-current={p === page ? "page" : undefined}
                      >
                        {p}
                      </button>
                    ))}

                    {end < totalPages && (
                      <>
                        {end < totalPages - 1 && (
                          <span className="px-2">...</span>
                        )}
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => changePage(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                );
              })()}
            </div>
            <button
              onClick={() => changePage(Math.min(totalPages, page + 1))}
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : data?.contests?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.contests?.map((contest) => (
            <ContestCard key={contest._id} contest={contest} />
          ))}
        </div>
      ) : (
        <p>No contests found. Try a different search or filter.</p>
      )}
      {data?.total === data?.contests?.length || (
        <div
          className="flex items-center justify-center"
          onClick={handleSeeAll}
        >
          <button className="  my-10 ">
            {" "}
            <p className="text-sm ">
              <span className="font-bold text-xl">{data?.total}</span> contests
              found
            </p>
            <span className="underline hover:cursor-pointer">Sell All...</span>
          </button>
        </div>
      )}

      {data?.total > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => changePage(Math.max(1, page - 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page <= 1}
          >
            Prev
          </button>

          <div>
            {(() => {
              const { pages, start, end } = getPageRange();
              return (
                <div className="flex items-center gap-1">
                  {start > 1 && (
                    <>
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => changePage(1)}
                      >
                        1
                      </button>
                      {start > 2 && <span className="px-2">...</span>}
                    </>
                  )}

                  {pages.map((p) => (
                    <button
                      key={p}
                      onClick={() => changePage(p)}
                      className={`px-3 py-1 rounded ${
                        p === page ? "bg-purple-600 text-white" : "border"
                      }`}
                      aria-current={p === page ? "page" : undefined}
                    >
                      {p}
                    </button>
                  ))}

                  {end < totalPages && (
                    <>
                      {end < totalPages - 1 && (
                        <span className="px-2">...</span>
                      )}
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => changePage(totalPages)}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
              );
            })()}
          </div>

          <button
            onClick={() => changePage(Math.min(totalPages, page + 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
