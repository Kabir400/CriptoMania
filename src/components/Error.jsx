import React from "react";
import error from "../assets/gif/error.gif";
import { Alert, AlertIcon } from "@chakra-ui/react";
export default function Error() {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={error} height={"239px"} />
      </div>
      <Alert
        status="error"
        position={"fixed"}
        bottom={"4"}
        left={"50%"}
        w={"70%"}
        transform={"translateX(-50%)"}
      >
        <AlertIcon />
        Error While Fetching The Data!
      </Alert>
    </>
  );
}
