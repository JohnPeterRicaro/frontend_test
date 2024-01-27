"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./gallery";
import { useEffect, useState } from "react";
import { fetchPhoto, fetchData } from "./api";

export default function Home() {
  const [users, setUsers] = useState<any>([]);
  const [photos, setPhotos] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      const usersData = await fetchData();
      const apiPhotos = await fetchPhoto();

      if (usersData && apiPhotos) {
        const usersWithPhotos = usersData.map((user: any, index: number) => ({
          ...user,
          userPhoto: apiPhotos[index]?.avatar,
        }));

        setPhotos(apiPhotos);
        setUsers(usersWithPhotos);
      }
    };
    fetchUser();
  }, []);

  if (users.length === 0) {
    return (
      <main className={styles.main}>
        <div>loading...</div>
      </main>
    );
  }

  if (users.length > 0) {
    console.log("users: ", users);
  }

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
