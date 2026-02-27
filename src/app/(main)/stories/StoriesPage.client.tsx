"use client";

import { useState } from "react";
import "@/src/app/globals.css";
import css from "./StoriesPage.module.css";
import TravellersStories from "@/src/components/TravellersStories/TravellersStories";
import { Toaster } from "react-hot-toast";
import { Category } from "@/src/types/category";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/src/lib/api/сategoriesApi";

function StoriesPageClient() {
  const [category, setCategory] = useState<Category | null>();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  return (
    <section className={css.storiesSection}>
      <Toaster />
      <div className={`container ${css.containerStories}`}>
        <h1 className={css.pageTitle}>Історії Мандрівників</h1>
        <fieldset className={css.categoryList}>
          <input
            className={css.categoryButton}
            type="button"
            value={"Усі категорії"}
            onClick={() => setCategory(null)}
          />
          {data ? (
            data?.map((cat) => (
              <input
                key={cat._id}
                className={css.categoryButton}
                type="button"
                value={cat.name}
                onClick={() => setCategory(cat)}
              />
            ))
          ) : (
            <></>
          )}
        </fieldset>

        <TravellersStories
          pageType="stories"
          sort={"popular"}
          buttonType="loadMore"
          category={category?._id}
        />
      </div>
    </section>
  );
}

export default StoriesPageClient;
