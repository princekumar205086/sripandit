// my address page for user
"use client";
import { useState, useEffect } from "react";
import { FaTrash, FaPencilAlt, FaMapMarkerAlt } from "react-icons/fa";

const Addresses = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "(555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      name: "Office",
      addressLine1: "456 Business Ave",
      addressLine2: "Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      phone: "(555) 987-6543",
      isDefault: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<
    (typeof addresses)[0] | null
  >(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  interface FormData {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const states = ["NY", "CA", "TX", "FL", "IL"]; // Add more states as needed

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name) newErrors.name = "Address name is required";
    if (!formData.addressLine1) newErrors.addressLine1 = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (formData.phone && !/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone format. Use (XXX) XXX-XXXX";
    }
    if (formData.zipCode && !/^\d{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Invalid ZIP code format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      if (selectedAddress) {
        setAddresses(
          addresses.map((addr) =>
            addr.id === selectedAddress.id
              ? { ...formData, id: addr.id, isDefault: addr.isDefault }
              : addr
          )
        );
      } else {
        setAddresses([
          ...addresses,
          { ...formData, id: Date.now(), isDefault: addresses.length === 0 },
        ]);
      }
      setIsModalOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    });
    setSelectedAddress(null);
    setErrors({});
  };

  const handleEdit = (address: any) => {
    setSelectedAddress(address);
    setFormData(address);
    setIsModalOpen(true);
  };

  const handleDelete = (address: any) => {
    setSelectedAddress(address);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAddress) {
      setAddresses(addresses.filter((addr) => addr.id !== selectedAddress.id));
      setIsDeleteModalOpen(false);
      setSelectedAddress(null);
    }
  };

  const setDefaultAddress = (id: any) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsDeleteModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

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
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
                  <p>{address.phone}</p>
                </div>
                {!address.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(address.id)}
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
                  Address Name*
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                  placeholder="Home, Office, etc."
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                  Address Line 1*
                </label>
                <input
                  type="text"
                  value={formData.addressLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                />
                {errors.addressLine1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.addressLine1}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  value={formData.addressLine2}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine2: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                    State*
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                    ZIP Code*
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData({ ...formData, zipCode: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                    maxLength={5}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.zipCode}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2F1C0A] mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
                    placeholder="(XXX) XXX-XXXX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
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
