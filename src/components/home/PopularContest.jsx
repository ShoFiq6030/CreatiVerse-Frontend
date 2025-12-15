import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../../api/axiosSecure";
import ContestCard from "../common/ContestCard";
import Loading from "./../common/Loading";

export default function PopularContest() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contest/get-popular-contests");
      return res.data.data;
    },
  });
  // console.log(data);
  if (error) return <div>{error.message}</div>;

  return (
    <div className="my-10">
      <h2 className="text-center p-10 text-3xl font-semibold">
        Popular Contest
      </h2>
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((contest) => (
          <ContestCard contest={contest} key={contest._id} />
        ))}
      </div>
    </div>
  );
}
