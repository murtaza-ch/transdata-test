import React from "react";
import {
  Spinner,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CWaitingListHistory({ isLoading, data }) {
  return (
    <VStack minH="100vh" justifyContent="center">
      {isLoading ? (
        <Spinner />
      ) : (
        <VStack py="10" spacing="6" w="full" maxW="5xl">
          <Heading fontSize="2xl">Daily Waiting Lists History</Heading>
          <Button as={Link} to="/">
            Back Home
          </Button>
          {data?.map((list) => (
            <HStack
              border="2px"
              borderColor="gray.50"
              rounded="md"
              p="4"
              shadow="sm"
              w="full"
              key={list._id}
              justifyContent="space-between"
            >
              <VStack textAlign="left" alignItems="flex-start">
                <Text>Created At</Text>
                <Text fontWeight="semibold">
                  {list.createdAt.split("T")[0]}
                </Text>
              </VStack>
              <VStack textAlign="center">
                <Text>Registerd Puppies</Text>
                <Text fontWeight="semibold">{list.totalPuppies}</Text>
              </VStack>
              <VStack textAlign="center">
                <Text>Total Served</Text>
                <Text fontWeight="semibold">{list.done}</Text>
              </VStack>
              <VStack textAlign="center">
                <Text>Processing Service</Text>
                <Text fontWeight="semibold">{list.processing}</Text>
              </VStack>
              <VStack textAlign="center">
                <Text>Waiting Service</Text>
                <Text fontWeight="semibold">{list.waiting}</Text>
              </VStack>
              <VStack textAlign="center">
                <Text>Missed Turn</Text>
                <Text fontWeight="semibold">{list.missedTurn}</Text>
              </VStack>
              <Button
                as={Link}
                to={`/waiting-list/${list._id}`}
                colorScheme="blue"
                variant="ghost"
              >
                View
              </Button>
            </HStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
}

export default CWaitingListHistory;
