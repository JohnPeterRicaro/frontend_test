"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./gallery";

export default async function Home() {
  let users: any = [];

  await fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      users = data;
      console.log("users:", users);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
