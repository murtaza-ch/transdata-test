import React from "react";
import {
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  HStack,
  Input,
  Select,
  Divider,
  Stack,
  Radio,
  RadioGroup,
  Spinner,
  SimpleGrid,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { TiArrowUnsorted } from "react-icons/ti";
import moment from "moment";
import { Link } from "react-router-dom";

function CTodayWaitingList({
  isOpen,
  onOpen,
  onClose,
  name,
  setName,
  service,
  setService,
  data,
  isLoading,
  setValue,
  handleCreatePuppy,
  mutationLoading,
  mutatePuppyLoading,
  puppId,
  search,
  setSearch,
  order,
  setOrder,
}) {
  return (
    <VStack w="full">
      <VStack maxW="6xl" w="full" minH="100vh" py="12">
        <HStack w="full" alignItems="center" justifyContent="space-between">
          <Text fontSize="xl" fontWeight="semibold">
            Today's Stats
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
        <HStack w="full" justifyContent="flex-end">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch />}
            />
            <Input
              type="tel"
              placeholder="Search puppy by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
          <Button
            onClick={() =>
              setOrder((prev) => {
                return prev === "ASC" ? "DSC" : "ASC";
              })
            }
          >
            <TiArrowUnsorted size={32} />
          </Button>
          <Button minW="200px" onClick={onOpen} colorScheme="blue">
            Register New Puppy
          </Button>
        </HStack>
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
                <Text>Update Status</Text>
                <RadioGroup
                  onChange={(value) => setValue(value, puppy._id)}
                  value={puppy.status}
                  isDisabled={mutatePuppyLoading && puppId === puppy._id}
                >
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

        <Modal isOpen={isOpen} onClose={onOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Puppy Details</ModalHeader>
            <ModalBody>
              <VStack>
                <Input
                  type="text"
                  placeholder="Enter Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Select
                  placeholder="Select Service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                >
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                  <option value="S4">S4</option>
                </Select>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                isLoading={mutationLoading}
                colorScheme="blue"
                onClick={handleCreatePuppy}
              >
                Register
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </VStack>
  );
}

export default CTodayWaitingList;
