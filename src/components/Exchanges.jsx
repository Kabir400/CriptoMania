import React, { useEffect, useState } from "react";
import { server } from "../index";
import axios from "axios";
import { Container, HStack } from "@chakra-ui/react";
import Loder from "./Loder";
import Error from "./Error";
import ExchangeCard from "./ExchangeCard";
import { wrap } from "framer-motion";

export default function Exchanges() {
  let [exchanges, setExchanges] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(false);

  useEffect(() => {
    let fetch = async () => {
      try {
        let { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);

        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (error) {
    return <Error />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loder />
      ) : (
        <>
          <HStack flexWrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((item, index) => {
              return (
                <ExchangeCard
                  name={item.name}
                  img={item.image}
                  rank={item.trust_score_rank}
                  url={item.url}
                  key={item.id}
                />
              );
            })}
          </HStack>
        </>
      )}
    </Container>
  );
}
