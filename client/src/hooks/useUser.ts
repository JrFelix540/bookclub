import { useEffect } from "react";
import Router from "next/router";
import { useQuery } from "@apollo/client";
import { MeDocument } from "@/generated/graphql";

export function useUser({ redirect = false }: { redirect?: boolean }) {
  const { data, loading } = useQuery(MeDocument);

  useEffect(() => {
    if (redirect && !loading && !data?.me) {
      Router.push("/auth/sign-in");
    }
  }, [data]);

  return {
    me: data?.me,
    loading,
  };
}
