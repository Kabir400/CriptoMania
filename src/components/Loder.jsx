import React from "react";
import loader from "../assets/gif/loader.gif";

export default function Loder() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={loader} style={{ height: "200px" }} />
    </div>
  );
}
