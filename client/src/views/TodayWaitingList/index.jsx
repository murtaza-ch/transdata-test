import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { CTodayWaitingList } from "../../components";
import {
  useGetTodayWaitingList,
  useRegisterPuppy,
  useUpdatePuppyStatus,
} from "../../queries";

function TodayWaitingList() {
  const toast = useToast();
  const { listId } = useParams();
  const [name, setName] = useState();
  const [service, setService] = useState();
  const [value, setValue] = useState();
  const [puppId, setPuppyId] = useState();
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isLoading, isError, error, refetch } = useGetTodayWaitingList({
    listId,
    search,
    order,
  });
  const { mutate, isLoading: mutationLoading } = useRegisterPuppy();
  const { mutate: mutatePuppyStatus, isLoading: mutatePuppyLoading } =
    useUpdatePuppyStatus();

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

  const handlePuppyStatus = (value, puppyId) => {
    setPuppyId(puppyId);
    setValue(value);
    mutatePuppyStatus(
      {
        listId,
        puppyId,
        status: value,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const handleCreatePuppy = () => {
    mutate(
      {
        name,
        service,
        listId,
      },
      {
        onSuccess: () => {
          onClose();
          refetch();
        },
      }
    );
  };

  return (
    <CTodayWaitingList
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      name={name}
      setName={setName}
      service={service}
      setService={setService}
      data={data}
      isLoading={isLoading}
      value={value}
      setValue={handlePuppyStatus}
      handleCreatePuppy={handleCreatePuppy}
      mutationLoading={mutationLoading}
      mutatePuppyLoading={mutatePuppyLoading}
      puppId={puppId}
      search={search}
      setSearch={setSearch}
      order={order}
      setOrder={setOrder}
    />
  );
}

export default TodayWaitingList;
