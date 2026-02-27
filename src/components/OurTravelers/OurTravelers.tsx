// "use client";

// import React, { useState, useEffect } from "react";
// import { getUsers } from "@/src/lib/api/usersApi";
// import { User } from "@/src/types/user";
// import TravelerCard from "./TravelerCard";
// import styles from "./OurTravelers.module.css";
// import Link from "next/link";

// const OurTravelers = () => {
//   const [travelers, setTravelers] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchFirstTravelers = async () => {
//       try {
//         const response = await getUsers();
//         const usersArray = response.users || [];

//         setTravelers(usersArray.slice(0, 4));
//       } catch (error) {
//         console.error("Помилка завантаження мандрівників:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchFirstTravelers();
//   }, []);

//   return (
//     <section className={`${styles.section} container`}>
//       <h2 className={styles.title}>Наші Мандрівники</h2>

//       {isLoading ? (
//         <p>Завантаження...</p>
//       ) : (
//         <ul className={styles.list}>
//           {travelers.map((user) => (
//             <li key={user._id} className={styles.item}>
//               <TravelerCard
//                 id={user._id}
//                 name={user.name || "Мандрівник"}
//                 description={user.description || "Досвідчений мандрівник"}
//                 img={user.avatarUrl || "/default-avatar.png"}
//               />
//             </li>
//           ))}
//         </ul>
//       )}

//       <div className={styles.buttonContainer}>
//         <Link href="/travellers" className={styles.viewAllButton}>
//           Переглянути всіх
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default OurTravelers;
