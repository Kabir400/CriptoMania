import { Box } from "@chakra-ui/react";
import React from "react";
import btc from "../assets/btc.png";
import { Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <Box
      w={"full"}
      h={"90vh"}
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Image
        src={btc}
        filter={"grayscale(1)"}
        width={"250px"}
        className="img"
      ></Image>

      <Text fontSize={"25px"} fontWeight={"500"} mt={"-17px"}>
        Cripto Menia
      </Text>
    </Box>
  );
}
