"use client";
import { useState } from "react";
import {
  FaHome,
  FaMapMarkerAlt,
  FaCity,
  FaMapMarked,
  FaPhone,
  FaSave,
  FaTimes,
  FaBuilding,
} from "react-icons/fa";

const AddressForm = ({
  initialData,
  onSave,
  onCancel,
}: {
  initialData: any;
  onSave: (data: any) => void;
  onCancel?: () => void;
}) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      isDefault: false,
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Address name is required";
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address line 1 is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP/Postal code is required";
    } else if (!/^\d{5,6}$/.test(formData.zipCode)) {
      newErrors.zipCode = "Enter a valid postal code";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSave(formData);
      // Success - the parent component will handle closing the modal
    } catch (error) {
      console.error("Error saving address:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Input field component for reusability
  const InputField = ({
    name,
    label,
    value,
    onChange,
    icon,
    placeholder = "",
    required = false,
    type = "text",
    maxLength = undefined,
  }: {
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
    placeholder?: string;
    required?: boolean;
    type?: string;
    maxLength?: number;
  }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          className={`block w-full pl-10 pr-3 py-2.5 sm:text-sm border ${
            errors[name]
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2`}
          placeholder={placeholder}
        />
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5 px-1">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          name="name"
          label="Address Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          icon={<FaHome />}
          placeholder="Home, Office, etc."
          required
        />

        <InputField
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          icon={<FaPhone />}
          placeholder="10-digit mobile number"
          type="tel"
          required
          maxLength={10}
        />
      </div>

      <InputField
        name="addressLine1"
        label="Address Line 1"
        value={formData.addressLine1}
        onChange={(e) =>
          setFormData({ ...formData, addressLine1: e.target.value })
        }
        icon={<FaMapMarkerAlt />}
        placeholder="Street address, house number"
        required
      />

      <InputField
        name="addressLine2"
        label="Address Line 2"
        value={formData.addressLine2}
        onChange={(e) =>
          setFormData({ ...formData, addressLine2: e.target.value })
        }
        icon={<FaBuilding />}
        placeholder="Apartment, floor, landmark, etc. (optional)"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          name="city"
          label="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          icon={<FaCity />}
          placeholder="City name"
          required
        />

        <InputField
          name="state"
          label="State"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          icon={<FaMapMarked />}
          placeholder="State name"
          required
        />

        <InputField
          name="zipCode"
          label="ZIP/Postal Code"
          value={formData.zipCode}
          onChange={(e) =>
            setFormData({ ...formData, zipCode: e.target.value })
          }
          icon={<FaMapMarkerAlt />}
          placeholder="6-digit code"
          type="text"
          required
          maxLength={6}
        />
      </div>

      <div className="mt-4 pt-3 border-t border-gray-200">
        <div className="flex items-center">
          <input
            id="isDefault"
            name="isDefault"
            type="checkbox"
            checked={formData.isDefault}
            onChange={(e) =>
              setFormData({ ...formData, isDefault: e.target.checked })
            }
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isDefault"
            className="ml-2 block text-sm text-gray-700"
          >
            Set as default address
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <FaTimes className="mr-2" />
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-medium text-sm flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FaSave className="mr-2" />
              Save Address
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
