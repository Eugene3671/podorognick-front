import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./OurTravelers.module.css";

interface TravelerProps {
  id: string;
  name: string;
  description: string;
  img: string;
}

const TravelerCard: React.FC<TravelerProps> = ({ id, name, description, img }) => {
  return (
    <div className={styles.card}> 
      <Image 
        src={img || "/default-avatar.png"} 
        alt={`Аватар мандрівника ${name}`}
        width={112} 
        height={112} 
        className={styles.avatar} 
      />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      
      <Link href={`/travellers/${id}`} className={styles.button}>
        Переглянути профіль
      </Link>
    </div>
  );
};

export default TravelerCard;