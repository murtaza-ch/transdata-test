import React, { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CWaitingList } from "../../components";
import { useGetWaitingList } from "../../queries/useGetWaitingList";

function WaitingList() {
  const toast = useToast();
  const { listId } = useParams();
  const { data, isLoading, isError, error } = useGetWaitingList(listId);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error!",
        description: error.message,
        variant: "subtle",
        status: "error",
      });
    }
  }, [error, isError, toast]);

  return <CWaitingList data={data} isLoading={isLoading} />;
}

export default WaitingList;
