"use client";

import React, { useEffect, useState } from "react";
import "@/src/app/globals.css";
import css from "./StoriesPage.module.css";
import TravellersStories from "@/src/components/TravellersStories/TravellersStories";
import { Toaster } from "react-hot-toast";
import { Category } from "@/src/types/category";
import { getCategories } from "@/src/lib/api/storiesApi";
import { useQuery } from "@tanstack/react-query";
import LoaderEl from "@/src/components/LoaderEl/LoaderEl";

function StoriesPageClient() {
  const [category, setCategory] = useState<Category>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const { data, isLoading, isError } = useQuery({
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
            key={"all"}
            className={css.categoryButton}
            type="button"
            value={"Усі категорії"}
            onClick={() => setCategory(category)}
          />
          {data ? (
            data?.map((category) => (
              <input
                key={category.id}
                className={css.categoryButton}
                type="button"
                value={category.name}
                onClick={() => setCategory(category)}
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
          category={category}
        />
      </div>
    </section>
  );
}

export default StoriesPageClient;
