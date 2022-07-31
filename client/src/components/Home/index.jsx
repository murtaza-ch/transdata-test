import React from "react";
import { Link } from "react-router-dom";
import { Button, HStack, VStack, Heading } from "@chakra-ui/react";

function CHome({ onCreate, isLoading }) {
  return (
    <VStack spacing="10" h="100vh" alignItems="center" justifyContent="center">
      <Heading fontWeight="semibold" fontSize="2xl">
        Welcome to Puppy Spa
      </Heading>
      <HStack>
        <Button minW="260px" as={Link} to="/waiting-list-history">
          View Waiting List History
        </Button>
        <Button
          onClick={onCreate}
          isLoading={isLoading}
          minW="260px"
          colorScheme="blue"
          loadingText="Creating"
        >
          Create Today's Waiting List
        </Button>
      </HStack>
    </VStack>
  );
}

export default CHome;
