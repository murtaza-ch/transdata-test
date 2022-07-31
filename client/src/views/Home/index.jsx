import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { CHome } from "../../components";
import { useCreateWaitingList } from "../../queries";

function Home() {
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateWaitingList();

  const handleCreate = () => {
    mutate(
      {},
      {
        onSuccess: ({ data }) => {
          navigate(`/today-waiting-list/${data._id}`);
        },
        onError: (error) => {
          console.log(error);
          toast({
            title: "Error!",
            description: error.message,
          });
        },
      }
    );
  };

  return <CHome onCreate={handleCreate} isLoading={isLoading} />;
}

export default Home;
