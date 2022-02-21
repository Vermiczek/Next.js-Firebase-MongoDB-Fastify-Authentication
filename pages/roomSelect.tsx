import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div
      onClick={() => {
        router.push("/rooms/1");
      }}
    >
      XDDDDDDD
    </div>
  );
};

export default Home;
