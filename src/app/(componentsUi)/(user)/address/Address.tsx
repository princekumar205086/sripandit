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

interface Props {
  onSelectDefaultAddress: (addressId: number) => void; 
}
const Addresses = ({ onSelectDefaultAddress }: Props) => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
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
          .then((data) => setAddresses(data))
          .catch(() => toast.error("Failed to load addresses."));
      }
    }
  }, []);

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
          if (typeof window !== "undefined") window.location.reload();
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
          setAddresses((prev) => [...prev, newAddress]);
          toast.success("Address added successfully.");
          // Refresh page
          if (typeof window !== "undefined") window.location.reload();
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
        setAddresses((prev) =>
          prev.filter((addr) => addr.id !== selectedAddress.id)
        );
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
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: addr.id === addressId }))
      );
      toast.success("Default address set successfully.");

      // Pass the selected address ID to the parent component
      onSelectDefaultAddress(addressId);
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
    <div className="bg-[#FFFAF0] mt-5">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2F1C0A] flex items-center">
            <FaMapMarkerAlt className="mr-2" />
            <span>My Address</span>
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FFA500] hover:bg-[#DAA520] text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Add New Address</span>
          </button>
        </div>

        {addresses.length === 0 ? (
          <div className="text-center py-16">
            <FaMapMarkerAlt className="mx-auto text-6xl text-[#DAA520] mb-4" />
            <p className="text-xl text-[#2F1C0A] mb-4">
              You have no saved addresses yet
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#FFA500] hover:bg-[#DAA520] text-white px-6 py-2 rounded-lg shadow-md transition-colors duration-200"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-[#2F1C0A]">
                      {address.name}
                    </h3>
                    {address.isDefault && (
                      <span className="ml-2 bg-[#FFA500] text-white text-xs px-2 py-1 rounded">
                        Selected
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(address)}
                      className="text-[#DAA520] hover:text-[#FFA500] transition-colors duration-200"
                      aria-label="Edit address"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDelete(address)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      aria-label="Delete address"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="space-y-2 text-[#2F1C0A]">
                  <p>{address.addressline}</p>
                  {address.addressline2 && <p>{address.addressline2}</p>}
                  <p>{`${address.city}, ${address.state}`}</p>
                  <p>
                    India - {""}
                    {address.postalCode}{" "}
                  </p>
                </div>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="mt-4 text-[#DAA520] hover:text-[#FFA500] text-sm"
                  >
                    Select this address
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

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
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
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
