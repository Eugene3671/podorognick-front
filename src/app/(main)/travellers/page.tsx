"use client";

import React, { useState, useEffect } from "react";
import { getUsers } from "@/src/lib/services/users.service"; 
import { User } from "@/src/types/user";
import TravelerCard from "@/src/components/OurTravelers/TravelerCard";
import styles from "./page.module.css"; 

const TravellersPage = () => {
  const [travelers, setTravelers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await getUsers();
        setTravelers(response.users || []);
      } catch (error) {
        console.error("Помилка завантаження всіх мандрівників:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <main className={`${styles.container} container`}>
      <h1 className={styles.title}>Мандрівники</h1>
      
      {isLoading ? (
        <div className={styles.loader}>Завантаження...</div>
      ) : (
        <div className={styles.grid}>
          {travelers.map((user) => (
            <TravelerCard 
              key={user._id}
              id={user._id}
              name={user.name || "Мандрівник"}
              description={user.description || "Досвідчений мандрівник"}
              img={user.avatarUrl || "/default-avatar.png"}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default TravellersPage;