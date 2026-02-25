"use client";

import { getUsers } from "../../lib/services/users.service";
import React, { useState, useEffect, useCallback } from "react";
import TravelerCard from "./TravelerCard";
import styles from "./OurTravelers.module.css";

// Описуємо тип тут, щоб не чіпати сервіс
interface BackendUser {
  id: number;
  name: string;
  about?: string;
  description?: string;
  avatarUrl?: string;
  img?: string;
}

interface Traveler {
  id: number;
  name: string;
  description: string;
  img: string;
}

const OurTravelers = () => {
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTravelers = useCallback(async (currentPage: number) => {
    setIsLoading(true);
    try {
      const response = (await getUsers()) as BackendUser[];
      const limit = 4;
      const start = (currentPage - 1) * limit;
      const data = response.slice(start, start + limit);

      if (start + data.length >= response.length) {
        setHasMore(false);
      }
      
      if (data.length > 0) {
        const formattedData: Traveler[] = data.map((user: BackendUser) => ({
          id: user.id,
          name: user.name,
          description: user.about || user.description || "Мандрівник",
          img: user.avatarUrl || user.img || "/default-avatar.png",
        }));

        setTravelers((prev) => [...prev, ...formattedData]);
      }
    } catch (error) {
      console.error("Помилка завантаження мандрівників:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTravelers(page);
  }, [page, fetchTravelers]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Наші Мандрівники</h2>
      <ul className={styles.list}>
        {travelers.map((t) => (
          <li key={t.id} className={styles.card}>
            <TravelerCard {...t} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <button 
          className={styles.viewAllButton} 
          onClick={() => setPage((p) => p + 1)} 
          disabled={isLoading}
        >
          {isLoading ? "Завантаження..." : "Переглянути всі"}
        </button>
      )}
    </section>
  );
};

export default OurTravelers;