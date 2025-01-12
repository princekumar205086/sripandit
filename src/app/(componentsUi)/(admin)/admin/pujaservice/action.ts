import axios from "axios";

// Interfaces
interface Package {
  location: string;
  language: string;
  type: string;
  price: number;
  description: string;
}

interface PujaFormData {
  title: string;
  category: string;
  description: string;
  image: File | null;
  languages: string[];
  packages: Package[];
}

interface Category {
  id: number;
  name: string;
}

interface PackageDetails {
  id: number;
  location: string;
  language: string;
  type: string;
  price: number;
  description: string;
  pujaServiceId: number;
}

interface PujaServiceDetails {
  id: number;
  title: string;
  img: string;
  desc: string;
  categoryId: number;
  date_of_create: string;
  category: Category | null;
  packages: PackageDetails[];
}

// Helper Functions
const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    console.error("Resource not found");
    return null;
  } else {
    console.error("Axios operation error:", error);
    throw error;
  }
};

const mapServiceData = (service: any) => ({
  id: service.id,
  title: service.title || "",
  img: service.img || "",
  desc: service.desc || "",
  categoryId: service.categoryId || 0,
  date_of_create: service.date_of_create || "",
  category: service.category
    ? {
        id: service.category.id || 0,
        name: service.category.name || "",
      }
    : null,
  packages: Array.isArray(service.packages)
    ? service.packages.map((pkg: any) => ({
        id: pkg.id || 0,
        location: pkg.location || "",
        language: pkg.language || "",
        type: pkg.type || "",
        price: pkg.price || 0,
        description: pkg.description || "",
        pujaServiceId: pkg.pujaServiceId || 0,
      }))
    : [],
});

// Actions

// Add Puja Service
export const addPujaService = async (formData: PujaFormData) => {
  try {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("languages", JSON.stringify(formData.languages));
    data.append("packages", JSON.stringify(formData.packages));

    const response = await axios.post("/api/pujaservice", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding puja service:", error);
    throw error;
  }
};

// Fetch Puja Services
export const getPujaService = async () => {
  try {
    const response = await axios.get(`/api/pujaservice`);
    return response.data.map(mapServiceData);
  } catch (error: any) {
    return handleAxiosError(error) || [];
  }
};

// Fetch Puja Categories
export const getPujaCategory = async () => {
  try {
    const response = await axios.get(`/api/pujacategory`);
    return response.data.map((category: any) => ({
      id: category.id,
      name: category.name,
    }));
  } catch (error: any) {
    return handleAxiosError(error) || [];
  }
};

// Fetch Puja Service Details
export const fetchPujaServiceDetails = async (
  id: number
): Promise<PujaServiceDetails | null> => {
  try {
    const response = await axios.get(`/api/pujaservice/${id}`);
    return response.data as PujaServiceDetails;
  } catch (error: any) {
    return handleAxiosError(error);
  }
};

// edit puja service

export const editPujaService = async (id: number, formData: PujaFormData) => {
  try {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("languages", JSON.stringify(formData.languages));
    data.append("packages", JSON.stringify(formData.packages));

    const response = await axios.put(`/api/pujaservice/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error editing puja service:", error);
    throw error;
  }
}