"use client";

import React, { useState, useEffect } from "react";
import { getUsers } from "@/src/lib/api/usersApi";
import { User } from "@/src/types/user";
import TravelerCard from "./TravelerCard";
import styles from "./OurTravelers.module.css";
import LoaderEl from "@/src/components/LoaderEl/LoaderEl";
import Button from "@/src/components/Button/Button";

const OurTravelers = () => {
  const [travelers, setTravelers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFirstTravelers = async () => {
      try {
       const response = await getUsers({ 
  page: 1, 
  perPage: 4, 
  sortBy: "articlesAmount", 
  sortOrder: "desc" 
});
        const usersArray = response.users || [];

        setTravelers(usersArray);
      } catch (error) {
        console.error("Помилка завантаження мандрівників:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFirstTravelers();
  }, []);

  return (
    <section className={`${styles.section} container`}>
      <h2 className={styles.title}>Наші Мандрівники</h2>

      {isLoading ? (
  <div className={styles.loaderWrapper}>
    <LoaderEl />
  </div>
) : (
        <ul className={styles.list}>
          {travelers.map((user) => (
            <li key={user._id}>
              <TravelerCard
                id={user._id}
                name={user.name || "Мандрівник"}
                description={user.description || "Досвідчений мандрівник"}
                img={user.avatarUrl || "/default-avatar.png"}
              />
            </li>
          ))}
        </ul>
      )}

      <div className={styles.buttonContainer}>
  <Button href="/travellers" className={styles.viewAllButton}>
    Переглянути всіх
  </Button>
</div>
    </section>
  );
};

export default OurTravelers;
