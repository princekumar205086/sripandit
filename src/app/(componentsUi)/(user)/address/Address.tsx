"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {
  addAddress,
  fetchAddresses,
  setDefaultAddress,
  deleteAddress,
  updateAddress,
} from "./action";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

interface FormData {
  addressline: string;
  addressline2: string;
  city: string;
  state: string;
  postalCode: string;
}

interface AddressProps {
  onSelectDefaultAddress: (addressId: number, addressesList?: any[]) => void;
  autoSelectSingle?: boolean;
}

const Addresses = ({
  onSelectDefaultAddress,
  autoSelectSingle = false,
}: AddressProps) => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number>(0);
  const [userId, setUserId] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    addressline: "",
    addressline2: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loadingPincode, setLoadingPincode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: any = jwtDecode(token);
        setUserId(decodedToken.userId);

        fetchAddresses(decodedToken.userId)
          .then((data) => {
            setAddresses(data);

            // Auto-select the default address or the only address if autoSelectSingle is true
            if (data.length > 0) {
              const defaultAddress = data.find((addr: any) => addr.isDefault);

              if (defaultAddress) {
                setSelectedAddressId(defaultAddress.id);
                onSelectDefaultAddress(defaultAddress.id, data);
              } else if (data.length === 1 && autoSelectSingle) {
                setSelectedAddressId(data[0].id);
                onSelectDefaultAddress(data[0].id, data);
              }

              // Call global function if it exists for parent component integration
              if (
                typeof window !== "undefined" &&
                window.checkAndSelectSingleAddress
              ) {
                window.checkAndSelectSingleAddress(data);
              }
            }
          })
          .catch(() => toast.error("Failed to load addresses."));
      }
    }
  }, [onSelectDefaultAddress, autoSelectSingle]);

  // Validate form fields
  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.addressline) newErrors.addressline = "Address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.state) newErrors.state = "State is required.";
    if (!formData.postalCode) newErrors.postalCode = "ZIP code is required.";
    if (formData.postalCode && !/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Invalid ZIP code format.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle add/edit form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (selectedAddress) {
          await updateAddress(selectedAddress.id, {
            addressline: formData.addressline,
            addressline2: formData.addressline2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: "India",
            isDefault: selectedAddress.isDefault,
          });
          setAddresses((prev) =>
            prev.map((addr) =>
              addr.id === selectedAddress.id ? { ...addr, ...formData } : addr
            )
          );
          toast.success("Address updated successfully.");
        } else {
          const newAddress = await addAddress({
            addressline: formData.addressline,
            addressline2: formData.addressline2,
            city: formData.city,
            state: formData.state,
            postalCode: formData.postalCode,
            country: "India",
            userId,
          });
          const updatedAddresses = [...addresses, newAddress];
          setAddresses(updatedAddresses);
          toast.success("Address added successfully.");

          // Auto-select if it's the first address
          if (updatedAddresses.length === 1) {
            setSelectedAddressId(newAddress.id);
            onSelectDefaultAddress(newAddress.id, updatedAddresses);
          }
        }
        setIsModalOpen(false);
        resetForm();
      } catch (error) {
        toast.error("Failed to save the address.");
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      addressline: "",
      addressline2: "",
      city: "",
      state: "",
      postalCode: "",
    });
    setSelectedAddress(null);
    setErrors({});
  };

  // Handle address deletion
  const confirmDelete = async () => {
    try {
      if (selectedAddress) {
        await deleteAddress(selectedAddress.id);
        const updatedAddresses = addresses.filter(
          (addr) => addr.id !== selectedAddress.id
        );
        setAddresses(updatedAddresses);

        // If we deleted the selected address, clear the selection
        if (selectedAddressId === selectedAddress.id) {
          setSelectedAddressId(0);
          onSelectDefaultAddress(0, updatedAddresses);
        }

        toast.success("Address deleted successfully.");
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to delete the address.");
    }
  };

  // Handle default address setting
  const handleSetDefault = async (addressId: number) => {
    try {
      await setDefaultAddress(addressId, userId);
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }));
      setAddresses(updatedAddresses);

      // Set the selected address ID
      setSelectedAddressId(addressId);

      // Pass the selected address ID and updated list to the parent component
      onSelectDefaultAddress(addressId, updatedAddresses);

      toast.success("Address selected successfully.");
    } catch (error) {
      toast.error("Failed to set default address.");
    }
  };

  // Handle pincode change and autofill city/state
  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let pincode = e.target.value;

    // Ensure only numeric characters are entered
    if (!/^\d*$/.test(pincode)) {
      pincode = pincode.slice(0, -1); // Remove non-numeric characters
    }

    // Update the postalCode in formData without causing issues with last digit
    setFormData((prevData) => ({ ...prevData, postalCode: pincode }));

    // Only when length is 6, make the API call
    if (pincode.length === 6) {
      setLoadingPincode(true); // Start the loader
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        if (response.data[0]?.Status === "Success") {
          const postOffice = response.data[0].PostOffice[0];
          // Use setFormData to update city and state based on fetched data
          setFormData((prevData) => ({
            ...prevData,
            city: postOffice.District,
            state: postOffice.State,
          }));
        } else {
          throw new Error("Invalid pincode.");
        }
      } catch (error) {
        toast.error("Invalid pincode.");
        setFormData((prevData) => ({ ...prevData, city: "", state: "" }));
      } finally {
        setLoadingPincode(false); // Stop loader
      }
    }
  };

  const handleEdit = (address: any) => {
    setSelectedAddress(address);
    setFormData({
      addressline: address.addressline,
      addressline2: address.addressline2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (address: any) => {
    setSelectedAddress(address);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="bg-[#FFFAF0] p-4 mt-6">
      {/* Main Content */}
      <div className="max-w-full mx-auto p-2">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#2F1C0A] flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>Select Delivery Address</span>
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FFA500] hover:bg-[#DAA520] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center space-x-1 text-sm sm:text-base"
          >
            <span>Add New</span>
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FaMapMarkerAlt className="mx-auto text-5xl text-[#DAA520] mb-4" />
            <p className="text-lg text-[#2F1C0A] mb-4">
              You don't have any saved addresses yet
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FFA500] hover:bg-[#DAA520] text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`bg-white p-4 rounded-lg shadow-sm border-2 ${
                  address.id === selectedAddressId || address.isDefault
                    ? "border-[#FFA500]"
                    : "border-transparent"
                } hover:shadow-md transition-all duration-200 cursor-pointer`}
                onClick={() => handleSetDefault(address.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={`address-${address.id}`}
                        name="selectedAddress"
                        checked={
                          address.id === selectedAddressId || address.isDefault
                        }
                        onChange={() => handleSetDefault(address.id)}
                        className="w-4 h-4 text-[#FFA500] focus:ring-[#FFA500] border-gray-300"
                      />
                      <label
                        htmlFor={`address-${address.id}`}
                        className="ml-2 text-base font-medium text-[#2F1C0A]"
                      >
                        {address.addressline}
                      </label>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(address);
                      }}
                      className="text-[#DAA520] hover:text-[#FFA500] transition-colors duration-200"
                      aria-label="Edit address"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(address);
                      }}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      aria-label="Delete address"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="space-y-1 text-[#2F1C0A] pl-6">
                  {address.addressline2 && <p>{address.addressline2}</p>}
                  <p>{`${address.city}, ${address.state}`}</p>
                  <p>India - {address.postalCode}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#2F1C0A] mb-6">
              {selectedAddress ? "Edit Address" : "Add New Address"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                  Address*
                </label>
                <input
                  type="text"
                  value={formData.addressline}
                  onChange={(e) =>
                    setFormData({ ...formData, addressline: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                />
                {errors.addressline && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.addressline}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                  Landmark
                </label>
                <input
                  type="text"
                  value={formData.addressline2}
                  onChange={(e) =>
                    setFormData({ ...formData, addressline2: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                    Pin Code*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={handlePincodeChange}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                      maxLength={6}
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postalCode}
                      </p>
                    )}
                    {loadingPincode && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                          className="w-5 h-5 text-[#FFA500] animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                    State*
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value="India"
                    readOnly
                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-[#2F1C0A] hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#FFA500] hover:bg-[#DAA520] text-white rounded-md transition-colors duration-200"
                >
                  {selectedAddress ? "Save Changes" : "Add Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-[#2F1C0A] mb-4">
              Delete Address
            </h2>
            <p className="text-[#2F1C0A] mb-6">
              Are you sure you want to delete this address?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-[#2F1C0A] hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addresses;
