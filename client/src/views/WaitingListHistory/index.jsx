import React, { useEffect } from "react";
import { CWaitingListHistory } from "../../components";
import { useGetDailyWaitingList } from "../../queries";
import { useToast } from "@chakra-ui/react";

function WaitingListHistory() {
  const toast = useToast();
  const { data, isLoading, isError, error } = useGetDailyWaitingList();

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

  return <CWaitingListHistory isLoading={isLoading} data={data} />;
}

export default WaitingListHistory;
