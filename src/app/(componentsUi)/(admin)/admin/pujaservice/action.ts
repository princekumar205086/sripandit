import axios from "axios";

interface Package {
  location: string;
  language: string;
  type: string;
  price: number; // Changed to number
  description: string;
}

interface PujaFormData {
  title: string;
  category: string;
  description: string;
  image: File | null; // Allow null for image
  languages: string[];
  packages: Package[];
}

interface Category {
  id: string;
  name: string;
}

// Call category API to get all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/pujacategory");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addPujaService = async (formData: PujaFormData) => {
  try {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    formData.languages.forEach((language) => {
      data.append("languages", language);
    });

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
}