import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
  Heading,
  Progress,
  Badge,
  VStack,
  HStack,
  Spacer,
  Circle,
  Center,
  theme,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, Legend, LineChart, Line } from 'recharts';

function TopbarStats({ stats }) {
  return (
    <Flex bg="white" p={4} rounded="md" shadow="md" mb={6} align="center" gap={8} wrap="wrap">
      <Box>
        <Text fontSize="lg" fontWeight="bold">Total Hours Watched</Text>
        <Text fontSize="2xl">{stats.totalHours}</Text>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold">Top 3 Genres</Text>
        <HStack spacing={4} mt={1}>
          {stats.topGenres.map((genre) => (
            <Badge key={genre.name} colorScheme="purple" px={3} py={1} borderRadius="full">
              {genre.name}
            </Badge>
          ))}
        </HStack>
      </Box>
      <Box>
        <Text fontSize="lg" fontWeight="bold">Top 3 Directors</Text>
        <VStack align="start" spacing={0} mt={1}>
          {stats.topDirectors.map((director) => (
            <Text key={director.name}>{director.name}</Text>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
}

function GenreDistributionChart({ data }) {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <Heading size="md" mb={4}>Genre Distribution</Heading>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Action" stackId="a" fill="#8884d8" />
          <Bar dataKey="Fantasy" stackId="a" fill="#82ca9d" />
          <Bar dataKey="Documentary" stackId="a" fill="#ffc658" />
          <Bar dataKey="Triller" stackId="a" fill="#d0a9f5" />
          <Bar dataKey="Comedy" stackId="a" fill="#f56a6a" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

function LeadersOfMonth({ leaders }) {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md">
      <Heading size="md" mb={4}>Leaders of August</Heading>
      <Flex gap={4} overflowX="auto">
        {leaders.map((movie) => (
          <Box key={movie.title} minW="120px" textAlign="center">
            <Box
              as="img"
              src={movie.poster}
              alt={movie.title}
              borderRadius="md"
              boxShadow="md"
              mb={2}
              maxH="160px"
              mx="auto"
            />
            <Text fontWeight="semibold" fontSize="sm" noOfLines={2}>{movie.title}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

function FavoriteMovieCard({ movie }) {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md" flex="1">
      <Heading size="sm" mb={2}>Your favorite movie</Heading>
      <Flex>
        <Box as="img" src={movie.poster} alt={movie.title} boxSize="100px" borderRadius="md" mr={4} />
        <Box flex="1">
          <Text fontWeight="bold">{movie.title}</Text>
          <Text color="gray.500" fontSize="sm">{movie.genre}</Text>
          <HStack spacing={1} mt={2}>
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} color={i < movie.rating ? 'yellow.400' : 'gray.300'} />
            ))}
          </HStack>
        </Box>
        <Center boxSize="60px" border="2px" borderColor="blue.400" borderRadius="full" ml={4}>
          <Text fontWeight="bold">{movie.timesWatched} times</Text>
        </Center>
      </Flex>
    </Box>
  );
}

function ActivityTimeCard({ activity }) {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md" flex="1">
      <Heading size="sm" mb={2}>Total activity time</Heading>
      <Text fontSize="2xl" fontWeight="bold">{activity.time}</Text>
      <Text color="green.500" fontSize="sm" mt={1}>{activity.change} Change from previous year</Text>
      <ResponsiveContainer width="100%" height={60}>
        <LineChart data={activity.data}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

function ViewedFromListCard({ percent }) {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md" flex="1" textAlign="center">
      <Heading size="sm" mb={2}>Viewed from list</Heading>
      <Circle size="80px" borderWidth="8px" borderColor="red.400" borderTopColor="blue.400" mx="auto" mb={2}>
        <Text fontSize="xl" fontWeight="bold">{percent}%</Text>
      </Circle>
    </Box>
  );
}

function RecentlyViewedList({ movies }) {
  return (
    <Box bg="white" p={4} rounded="md" shadow="md" mt={6}>
      <Flex justify="space-between" mb={4}>
        <Heading size="md">Recently viewed</Heading>
        <Text fontSize="sm" color="gray.500">{movies.length} movies</Text>
      </Flex>
      <Box>
        {movies.map((movie) => (
          <Flex key={movie.title} align="center" py={2} borderBottom="1px solid" borderColor="gray.200">
            <Box as="img" src={movie.poster} alt={movie.title} boxSize="50px" borderRadius="md" mr={4} />
            <Box flex="1">
              <Text fontWeight="bold">{movie.title}</Text>
              <HStack spacing={2} fontSize="sm" color="gray.500">
                <Text>{movie.genre}</Text>
                <Text>{movie.date}</Text>
              </HStack>
            </Box>
            <Box>
              <Progress value={movie.progress} size="sm" width="120px" />
            </Box>
            <Box ml={4}>
              {movie.favorite ? (
                <StarIcon color="yellow.400" />
              ) : (
                <StarIcon color="gray.300" />
              )}
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}

function Dashboard({ data }) {
  return (
    <Box>
      <Grid templateColumns="3fr 2fr" gap={6}>
        <GridItem>
          <GenreDistributionChart data={data.genreDistribution} />
        </GridItem>
        <GridItem>
          <LeadersOfMonth leaders={data.leadersOfMonth} />
        </GridItem>
      </Grid>

      <Flex mt={6} gap={6}>
        <FavoriteMovieCard movie={data.favoriteMovie} />
        <ActivityTimeCard activity={data.activityTime} />
        <ViewedFromListCard percent={data.viewedFromListPercent} />
      </Flex>

      <RecentlyViewedList movies={data.recentlyViewed} />
    </Box>
  );
}

function App() {
  const [libraries, setLibraries] = useState([]);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLibraries() {
      try {
        const response = await fetch('/api/libraries');
        if (!response.ok) {
          throw new Error('Failed to fetch libraries');
        }
        const libs = await response.json();
        setLibraries(libs);
        if (libs.length > 0) {
          setSelectedLibrary(libs[0].key);
        }
      } catch (err) {
        setError(err.message);
      }
    }
    fetchLibraries();
  }, []);

  useEffect(() => {
    async function fetchStats() {
      if (!selectedLibrary) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/stats/${selectedLibrary}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const statsData = await response.json();
        setData(statsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [selectedLibrary]);

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  if (loading || !data) {
    return <Text>Loading...</Text>;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box bg="gray.50" minH="100vh" p={6}>
        <Box mb={4}>
          <Text mb={2} fontWeight="bold">Select Library</Text>
          <select
            value={selectedLibrary || ''}
            onChange={(e) => setSelectedLibrary(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            {libraries.map((lib) => (
              <option key={lib.key} value={lib.key}>
                {lib.title}
              </option>
            ))}
          </select>
        </Box>
        <TopbarStats stats={data} />
        <Dashboard data={data} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
