"use client";
import { useState } from "react";

const AddressForm = ({ initialData, onSave }: { initialData: any; onSave: (data: any) => void }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Address Name*</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Address Line 1*</label>
        <input
          type="text"
          value={formData.addressLine1}
          onChange={(e) =>
            setFormData({ ...formData, addressLine1: e.target.value })
          }
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      {/* Additional Fields */}
      <button
        type="submit"
        className="px-4 py-2 bg-[#FFA500] hover:bg-[#DAA520] text-white rounded-md"
      >
        Save
      </button>
    </form>
  );
};

export default AddressForm;
