import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-start">
      <div>version: 1.0.2</div>
      <div>contractId: {process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS}</div>
    </div>
  );
};

export default Home;
