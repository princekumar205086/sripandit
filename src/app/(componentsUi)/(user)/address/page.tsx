// my address page for user
"use client";
import React,{ useState } from "react";
import Layout from "../layout";
import Addresses from "./Address";
import useAuthentication from "@/app/helper/authenticationHelper";

const MyAddresses = () => {
  const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null);
  // Check if the user is logged in and has the role of USER
  useAuthentication({ allowedRoles: ["USER"], redirectTo: "/login" });
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
