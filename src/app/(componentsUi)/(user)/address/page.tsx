// my address page for user
"use client";
import React,{ useState } from "react";
import Layout from "../layout";
import Addresses from "./Address";

const MyAddresses = () => {
  const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null);
  const handleDefaultAddressChange = (addressId: number) => {
    setDefaultAddressId(addressId);
  };

  return (
    <Layout>
      <Addresses onSelectDefaultAddress={handleDefaultAddressChange} />
    </Layout>
  );
};

export default MyAddresses;
