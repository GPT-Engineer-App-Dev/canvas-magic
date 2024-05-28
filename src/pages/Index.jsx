import { Container, Text, VStack, Box, Flex, Spacer, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFoo } from "../integrations/supabase/index.js";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data, error, isLoading } = useFoo();

  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="teal.500" color="white" p={4} align="center">
        <Box p="2">
          <Text fontSize="xl" fontWeight="bold">Brand</Text>
        </Box>
        <Spacer />
        <Box>
          <Button as={Link} to="/" variant="ghost" color="white" mr={4}>Home</Button>
          <Button as={Link} to="/about" variant="ghost" color="white" mr={4}>About</Button>
          <Button as={Link} to="/contact" variant="ghost" color="white" mr={4}>Contact</Button>
          <Button onClick={toggleColorMode} variant="ghost" color="white">
            {colorMode === "light" ? "Dark" : "Light"} Mode
          </Button>
        </Box>
      </Flex>
      <Container centerContent maxW="container.md" height="80vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="4xl" fontWeight="bold">Welcome to Our Website</Text>
          <Text fontSize="xl">This is a simple, clean, and responsive landing page.</Text>
          {isLoading && <Text>Loading...</Text>}
          {error && <Text color="red.500">Error: {error.message}</Text>}
          {data && <Text>Data: {JSON.stringify(data)}</Text>}
        </VStack>
      </Container>
    </Container>
  );
};

export default Index;