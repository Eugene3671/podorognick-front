"use client";

import React from "react";
import "@/src/app/globals.css";
import css from "./StoriesPage.module.css";
import TravellersStories from "@/src/components/TravellersStories/TravellersStories";

const StoriesPageClient = () => {
  return (
    <section className={css.storiesSection}>
      <div className={`container ${css.containerStories}`}>
        <h1 className={css.pageTitle}>Історії Мандрівників</h1>
        <TravellersStories perPage={9} sort={"new"} buttonType="loadMore" />
      </div>
    </section>
  );
};

export default StoriesPageClient;
