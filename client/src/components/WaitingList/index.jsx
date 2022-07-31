import React from "react";
import {
  VStack,
  Text,
  HStack,
  Divider,
  Stack,
  Radio,
  RadioGroup,
  Spinner,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

function CWaitingList({ data, isLoading }) {
  return (
    <VStack w="full">
      <VStack maxW="6xl" w="full" minH="100vh" py="12">
        <HStack w="full" alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="semibold">
            Waiting List History
          </Text>
          <Button as={Link} to="/">
            Back Home
          </Button>
        </HStack>
        <HStack
          border="2px"
          borderColor="gray.50"
          rounded="md"
          p="4"
          shadow="sm"
          w="full"
          justifyContent="space-between"
        >
          <VStack textAlign="center">
            <Text>Registerd Puppies</Text>
            <Text fontWeight="semibold">{data?.stats?.totalPuppies || 0}</Text>
          </VStack>
          <VStack textAlign="center">
            <Text>Total Served</Text>
            <Text fontWeight="semibold">{data?.stats?.done || 0}</Text>
          </VStack>
          <VStack textAlign="center">
            <Text>Waiting Service</Text>
            <Text fontWeight="semibold">{data?.stats?.waiting || 0}</Text>
          </VStack>
          <VStack textAlign="center">
            <Text>Processing Service</Text>
            <Text fontWeight="semibold">{data?.stats?.processing || 0}</Text>
          </VStack>
          <VStack textAlign="center">
            <Text>Missing Turn</Text>
            <Text fontWeight="semibold">{data?.stats?.missedTurn || 0}</Text>
          </VStack>
        </HStack>
        <Divider />

        {isLoading ? (
          <Spinner />
        ) : (
          data?.puppiesList.puppiesList.map((puppy) => (
            <HStack
              key={puppy._id}
              fontSize="sm"
              border="2px"
              borderColor="gray.50"
              rounded="md"
              p="4"
              w="full"
              justifyContent="space-between"
            >
              <SimpleGrid columns={4} w="65%">
                <VStack textAlign="left" alignItems="flex-start">
                  <Text>Name</Text>
                  <Text fontWeight="semibold">{puppy.name}</Text>
                </VStack>
                <VStack textAlign="center">
                  <Text>Arrival At</Text>
                  <Text fontWeight="semibold">
                    {moment(puppy.createdAt).format("LT")}
                  </Text>
                </VStack>
                <VStack textAlign="center">
                  <Text>Service</Text>
                  <Text fontWeight="semibold">{puppy.service}</Text>
                </VStack>
                <VStack textAlign="center">
                  <Text>Status</Text>
                  <Text fontWeight="semibold">{puppy.status}</Text>
                </VStack>
              </SimpleGrid>

              <VStack textAlign="center" w="35%">
                <Text>Status</Text>
                <RadioGroup value={puppy.status} isDisabled>
                  <Stack direction="row">
                    <Radio value="WAITING">Waiting</Radio>
                    <Radio value="PROCESSING">Processing</Radio>
                    <Radio value="DONE">Done</Radio>
                    <Radio value="MISSED TURN">Missed Turn</Radio>
                  </Stack>
                </RadioGroup>
              </VStack>
            </HStack>
          ))
        )}
      </VStack>
    </VStack>
  );
}

export default CWaitingList;
