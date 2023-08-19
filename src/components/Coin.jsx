import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loder from "./Loder";
import Error from "./Error";
import CoinCard from "./CoinCard";

export default function Coin() {
  let [coin, setCoin] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);
  let [page, setPage] = useState(1);
  let [currency, setCurrency] = useState("inr");
  let [curSymbol, setCurSymbol] = useState("₹");

  let btns = new Array(132).fill(1);

  let ChangePage = (a) => {
    return setPage(a);
  };

  useEffect(() => {
    let fetch = async () => {
      try {
        let { data } = await axios.get(
          `${server}//coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false&locale=en`
        );
        setCoin(data);

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
  }, [currency, page]);

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

          <HStack flexWrap={"wrap"} justifyContent={"space-evenly"}>
            {coin.map((item, index) => {
              return (
                <CoinCard
                  name={item.name}
                  img={item.image}
                  rank={item.market_cap_rank}
                  symbol={item.symbol}
                  price={item.current_price}
                  curSymbol={curSymbol}
                  key={item.id}
                  id={item.id}
                />
              );
            })}
          </HStack>
          <HStack overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => {
              return (
                <Button
                  bgColor={"blackAlpha.900"}
                  color={"white"}
                  key={index}
                  onClick={() => ChangePage(index + 1)}
                  css={{
                    "&:hover": {
                      backgroundColor: "#363232",
                    },
                  }}
                >
                  {index + 1}
                </Button>
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
}
