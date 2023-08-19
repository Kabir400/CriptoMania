import { VStack, Image, Heading, Text } from "@chakra-ui/react";
import React from "react";

export default function ExchangeCard(props) {
  return (
    <a href={props.url} target="blank">
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        m={"4"}
        transition={"all 0,3s"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image src={props.img} w={"10"} h={"10"} objectFit={"contain"} />
        <Heading size={"md"} noOfLines={1}>
          {props.rank}
        </Heading>
        <Text noOfLines={1} fontFamily={"fantasy"}>
          {props.name}
        </Text>
      </VStack>
    </a>
  );
}
