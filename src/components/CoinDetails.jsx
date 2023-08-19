import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import {
  Button,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Box,
  StatHelpText,
  StatArrow,
  Stat,
  Badge,
  Progress,
} from "@chakra-ui/react";
import Loder from "./Loder";
import Error from "./Error";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

export default function Coin() {
  let [coin, setCoin] = useState({});
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);

  let [currency, setCurrency] = useState("inr");
  let [curSymbol, setCurSymbol] = useState("₹");
  let [days, setDays] = useState("24h");
  let [chartArr, setChartArr] = useState([]);

  let btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  let { id } = useParams();

  useEffect(() => {
    let fetch = async () => {
      try {
        let { data } = await axios.get(`${server}//coins/${id}`);

        let { data: chartData } = await axios.get(
          `${server}//coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArr(chartData.prices);
        setLoading(false);

        setError(false);

        if (currency === "inr") {
          setCurSymbol("₹");
        } else if (currency === "eur") {
          setCurSymbol("€");
        } else {
          setCurSymbol("$");
        }
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    fetch();
  }, [currency, days]);

  if (error) {
    return <Error />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loder />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack alignItems={"flex-start"} spacing={"4"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0.7"}>
              Last Updated on {coin.market_data.last_updated}
            </Text>
            <Box
              display={"flex"}
              flexDirection={["column", "column", "row"]}
              justifyContent={"space-evenly"}
              alignItems={"center"}
              w={"full"}
              gap={["28px", "28px", "0"]}
            >
              <Box
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                }}
                minH={"150px"}
                w={["70%", "70%", "250px"]}
                display={"flex"}
                justifyContent={"space-around"}
                alignItems={"center"}
                ml={"5px"}
                flexDirection={["column", "row"]}
              >
                <VStack>
                  <Image
                    src={coin.image.large}
                    w={"64px"}
                    mt={["10px", "0"]}
                  ></Image>
                  <Badge
                    colorScheme="black"
                    fontSize={"14px"}
                  >{`#${coin.market_cap_rank}`}</Badge>
                </VStack>
                <VStack>
                  <Text fontWeight={"medium"}> {coin.name}</Text>
                  <Text fontWeight={"medium"}>
                    {curSymbol}
                    {coin.market_data.current_price[currency]}
                  </Text>
                  <Stat>
                    <StatHelpText>
                      <StatArrow
                        type={
                          coin.market_data.price_change_percentage_24h < 0
                            ? "decrease"
                            : "increase"
                        }
                      />
                      {coin.market_data.price_change_percentage_24h}%
                    </StatHelpText>
                  </Stat>
                </VStack>
              </Box>
              <VStack w={["70%", "70%", "30%"]}>
                <Progress value={50} colorScheme="teal" w={"full"}></Progress>
                <HStack justifyContent={"space-between"} w={"full"}>
                  <Badge
                    children={`${curSymbol}${coin.market_data.low_24h[currency]}`}
                    colorScheme="red"
                  ></Badge>
                  <Text>24H Range</Text>
                  <Badge
                    children={`${curSymbol}${coin.market_data.high_24h[currency]}`}
                    colorScheme="green"
                  ></Badge>
                </HStack>
                <Box w={"full"}>
                  <Item
                    title={"Max Supply"}
                    value={
                      coin.market_data.max_supply
                        ? coin.market_data.max_supply
                        : "NA"
                    }
                  ></Item>
                  <Item
                    title={"Circulating Supply"}
                    value={coin.market_data.circulating_supply}
                  ></Item>
                  <Item
                    title={"Market Cap"}
                    value={`${curSymbol}${coin.market_data.market_cap[currency]}`}
                  />
                  <Item
                    title={"All Time Low"}
                    value={`${curSymbol}${coin.market_data.atl[currency]}`}
                  />
                  <Item
                    title={"All Time High"}
                    value={`${curSymbol}${coin.market_data.ath[currency]}`}
                  />
                </Box>
              </VStack>
            </Box>
            <Chart curSymbol={curSymbol} arr={chartArr} days={days}  />
            <HStack
              justifyContent={"center"}
              w={"full"}
              flexWrap={"wrap"}
              mt={"10px"}
              mb={"10px"}
            >
              {btns.map((i) => {
                return (
                  <Button
                    value={i}
                    key={i}
                    onClick={(e) => {
                      setDays(e.target.value);
                      setLoading(true);
                    }}
                  >
                    {i}
                  </Button>
                );
              })}
            </HStack>
          </VStack>
        </>
      )}
    </Container>
  );
}

let Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} mt={"15px"}>
      <Text fontWeight={"medium"} fontFamily={"fantasy"}>
        {title}
      </Text>
      <Text fontWeight={"hairline"}>{value}</Text>
    </HStack>
  );
};
