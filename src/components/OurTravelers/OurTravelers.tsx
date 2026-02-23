"use client";

import React, { useState, useEffect, useCallback } from "react";
import TravelerCard from "./TravelerCard";
import styles from "./OurTravelers.module.css";

const MOCK_DATA = [
  { id: 1, name: "Анастасія Олійник", description: "Експертка з гірських походів. Знає кожен таємний куточок Карпат.", img: "/anastasia-oliinyk.png" },
  { id: 2, name: "Назар Ткаченко", description: "Професійний фотограф та любитель пригод.", img: "/nazar-tkachenko.png" },
  { id: 3, name: "Єва Бондаренко", description: "Спеціалістка з еко-туризму. Вірить у безпечні подорожі.", img: "/eva-bondarenko.png" },
  { id: 4, name: "Дмитро Романенко", description: "Досвідчений гід з екстремальних турів.", img: "/dmytro-romanenko.png" },
  { id: 5, name: "Олена Петренко", description: "Любителька міських квестів та архітектури.", img: "/anastasia-oliinyk.png" },
  { id: 6, name: "Максим Коваль", description: "Експерт з виживання та дикого кемпінгу.", img: "/nazar-tkachenko.png" },
];

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
    await new Promise((resolve) => setTimeout(resolve, 600));
    const limit = 4;
    const start = (currentPage - 1) * limit;
    const data = MOCK_DATA.slice(start, start + limit);

    if (start + data.length >= MOCK_DATA.length) setHasMore(false);
    if (data.length > 0) setTravelers((prev) => [...prev, ...data]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const loadData = async () => { await fetchTravelers(page); };
    loadData();
  }, [page, fetchTravelers]);

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Наші Мандрівники</h2>
      <ul className={styles.list}>
        {travelers.map((t) => (
          <li key={t.id} className={styles.card}><TravelerCard {...t} /></li>
        ))}
      </ul>
      {hasMore && (
        <button className={styles.viewAllButton} onClick={() => setPage(p => p + 1)} disabled={isLoading}>
          {isLoading ? "Завантаження..." : "Переглянути всіх"}
        </button>
      )}
    </section>
  );
};

export default OurTravelers;