import React from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";

import { BiMenuAltLeft } from "react-icons/bi";
export default function Header() {
  return (
    <>
      <HStack
        p={"4"}
        shadow={"base"}
        bgColor={"black"}
        gap={"40px"}
        display={["none", "none", "flex"]}
      >
        <Button variant={"unstyled"} color={"white"}>
          <Link to={"/"}>Home</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
          <Link to={"/exchanges"}>Exchanges</Link>
        </Button>
        <Button variant={"unstyled"} color={"white"}>
          <Link to={"/coin"}>Coin</Link>
        </Button>
      </HStack>
      <Menue />
    </>
  );
}

let Menue = () => {
  let { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <HStack
        p={"4"}
        shadow={"base"}
        bgColor={"black"}
        display={["block", "block", "none"]}
        color={"white"}
        onClick={onOpen}
      >
        <BiMenuAltLeft height={"31px"} />
      </HStack>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} zIndex={1000}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cripto Menia</DrawerHeader>
          <DrawerBody>
            <VStack alignItems={"flex-start"}>
              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"blackAlpha"}
              >
                <Link to={"/"}>Home</Link>
              </Button>
              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"blackAlpha"}
              >
                <Link to={"/exchanges"}>Exchanges</Link>
              </Button>
              <Button
                onClick={onClose}
                variant={"ghost"}
                colorScheme={"blackAlpha"}
              >
                <Link to={"/coin"}>Coin</Link>
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
