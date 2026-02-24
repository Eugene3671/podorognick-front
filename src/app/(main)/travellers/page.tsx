"use client";

import React, { useEffect, useState } from "react";
import { getUsers } from "@/src/lib/services/users.service"; // или точный путь к getUsers
import { User } from "@/src/types/user"; // если у тебя есть тип User

const TravellersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data.users); 
      } catch (err) {
        console.error(err);
        setError("Ошибка при загрузке пользователей");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Список пользователей</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravellersPage;