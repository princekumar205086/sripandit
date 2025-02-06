"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiUsers, FiRefreshCw, FiCheck } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment-timezone";

const PromoCodeDashboard = () => {
  const [selectedUsers, setSelectedUsers] = useState<
    { id: number; name: string; email: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [usageLimit, setUsageLimit] = useState(1);
  const [isCustomCode, setIsCustomCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [loading, setLoading] = useState(false);

  const dummyUsers = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com" },
  ];

  const generateRandomCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPromoCode(result);
  };

  const handleAssignCode = async () => {
    if (!selectedUsers.length || !promoCode || !discountValue || !expiryDate) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success(`Promo code '${promoCode}' assigned successfully!`);
  };

  useEffect(() => {
    if (!isCustomCode) {
      generateRandomCode();
    }
  }, [isCustomCode]);

  const filteredUsers = dummyUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (user: {
    id: number;
    name: string;
    email: string;
  }) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id)
        ? prev.filter((u) => u.id !== user.id)
        : [...prev, user]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Promo Code Administration
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center mb-4">
            <FiUsers className="text-gray-600" />
            <h2 className="text-xl font-semibold ml-2 text-gray-800">
              Select Users
            </h2>
          </div>

          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => toggleUserSelection(user)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition
                  ${
                    selectedUsers.some((u) => u.id === user.id)
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
              >
                <div className="ml-2 flex-1">
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                {selectedUsers.some((u) => u.id === user.id) && (
                  <FiCheck className="text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Configure Promo Code
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Discount Type</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700">Discount Value</label>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700">Expiry Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                min={moment().format("YYYY-MM-DD")}
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700">Usage Limit</label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) =>
                  setUsageLimit(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={isCustomCode}
                  onChange={(e) => setIsCustomCode(e.target.checked)}
                />
                <span>Custom Code</span>
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  readOnly={!isCustomCode}
                  className="w-full p-2 rounded-lg border focus:ring-2 focus:ring-blue-500 uppercase"
                />
                {!isCustomCode && (
                  <button
                    onClick={generateRandomCode}
                    className="absolute right-2 top-2 p-1 hover:bg-gray-200 rounded"
                  >
                    <FiRefreshCw className="text-gray-500" />
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handleAssignCode}
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? (
                <FiRefreshCw className="animate-spin mx-auto" />
              ) : (
                "Generate & Assign"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeDashboard;
