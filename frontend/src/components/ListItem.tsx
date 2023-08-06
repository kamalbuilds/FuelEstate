import { useState } from "react";
import { ContractAbi } from "../contracts";
import { bn } from "fuels";
import { Box, Button, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react";

interface ListItemsProps {
  contract: ContractAbi | null;
}

export default function ListItem({ contract }: ListItemsProps) {
  const toast = useToast();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [areaSqFt, setAreaSqFt] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [price, setPrice] = useState<string>("0");
  const [status, setStatus] = useState<'success' | 'error' | 'loading' | 'none'>('none');

  const testData = {
    name: "Luxury Apt",
    location: "NewYork Cit",
    area_sq_ft: "2000",
    bedrooms: 3,
    bathrooms: 2,
    description: "Veryshortd",
    images_url: "https://rb.gy/ufpa5",
  };
      // A beautiful luxury apartment in the heart of the city.

  type PropertyMetadata = {
    name: string;
    location: string;
    area_sq_ft: string;
    bedrooms: number;
    bathrooms: number;
    description: string;
    images_url: string[];
    };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading')
    if (contract !== null) {
      try {
        const metadata: PropertyMetadata = {
          name,
          location,
          area_sq_ft: areaSqFt,
          bedrooms,
          bathrooms,
          description,
          images_url: imagesUrl,
        };
        const priceInput = bn.parseUnits(price.toString());
        console.log(metadata);
        // @ts-ignore
        await contract.functions.list_property(priceInput, metadata).call();
        setStatus('success');
        showToast("success", "Item successfully listed!");
      } catch (e) {
        console.log("ERROR:", e);
        setStatus('error');
        showToast("error", "Error listing item. Please try again.");
      }
    } else {
      console.log("ERROR: Contract is null");
    }
  }

  async function test() {
    if (contract !== null) {
      try {
        let priceInput = bn.parseUnits(price.toString());
        await contract.functions.list_property(priceInput, testData).call();
        setStatus('success');
        showToast("success", "Item successfully listed!");
      } catch (e) {
        console.log("ERROR:", e);
        setStatus('error');
        showToast("error", "Error listing item. Please try again.");
      }
    } else {
      console.log("ERROR: Contract is null");
    }
  }

  function showToast(status: 'success' | 'error', message: string) {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
    <Box p={8}>
      <Text fontSize="2xl" fontWeight="bold">List an Item</Text>
      {status === 'none' &&
        <form onSubmit={handleSubmit}>
          <FormControl mt={4} p={12}>
            <FormLabel htmlFor="name">Name:</FormLabel>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="location">Location:</FormLabel>
            <Input
              id="location"
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="areaSqFt">Area (Sq Ft):</FormLabel>
            <Input
              id="areaSqFt"
              type="text"
              required
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="bedrooms">Bedrooms:</FormLabel>
            <Input
              id="bedrooms"
              type="number"
              required
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="bathrooms">Bathrooms:</FormLabel>
            <Input
              id="bathrooms"
              type="number"
              required
              value={bathrooms}
              onChange={(e) => setBathrooms(Number(e.target.value))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="description">Description:</FormLabel>
            <Input
              id="description"
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="imagesUrl">Images URLs:</FormLabel>
            <Input
              id="imagesUrl"
              type="text"
              required
              value={imagesUrl.join(",")}
              onChange={(e) => setImagesUrl(e.target.value.split(","))}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel htmlFor="price">Item Price:</FormLabel>
            <Input
              id="price"
              type="number"
              required
              min="0"
              step="any"
              inputMode="decimal"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>

          <Button type="submit" mt={4} colorScheme="blue">List item</Button>
          <Button onClick={test} mt={4} colorScheme="blue">Test</Button>
        </form>
      }

      {status === 'success' && <Text mt={4} color="green">Item successfully listed!</Text>}
      {status === 'error' && <Text mt={4} color="red">Error listing item. Please try again.</Text>}
      {status === 'loading' && <Text mt={4}>Listing item...</Text>}
    </Box>
    </div>
  )
}
