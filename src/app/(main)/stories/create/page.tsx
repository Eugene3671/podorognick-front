"use client";

import { useEffect, useState } from "react";
import StoryForm, {
  StoryFormValues,
} from "@/src/components/StoryForm/StoryForm";

type Category = {
  _id: string;
  name: string;
};

const CreateStoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const initialValues: StoryFormValues = {
    img: null,
    title: "",
    category: "",
    article: "",
    date: "",
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
        );

        const data = await response.json();
        console.log("CATEGORIES FROM BACK:", data);

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Categories is not an array:", data);
        }
      } catch (error) {
        console.error("Помилка завантаження категорій:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values: StoryFormValues) => {
    console.log("Story values:", values);
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  return (
    <div>
      <StoryForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        buttonText="Зберегти"
        categories={categories}
      />
    </div>
  );
};

export default CreateStoryPage;
