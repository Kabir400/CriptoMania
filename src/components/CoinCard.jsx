import React from "react";
import { VStack, Image, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function CoinCard(props) {
  return (
    <Link to={`/coins/${props.id}`}>
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
          Rank:{props.rank}
        </Heading>
        <Text noOfLines={1} fontFamily={"fantasy"}>
          {props.name}
        </Text>
        <Text noOfLines={1} fontFamily={"fantasy"}>
          {props.price ? `${props.curSymbol} ${props.price}` : `NA`}
        </Text>
      </VStack>
      ;
    </Link>
  );
}
