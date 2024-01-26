"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./gallery";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, []);

  if (users.length === 0) {
    return (
      <main className={styles.main}>
        <div>loading...</div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
