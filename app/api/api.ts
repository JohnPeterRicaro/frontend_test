"use client";

export const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("data from api:", data);

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export const fetchPhoto = async () => {
  try {
    const response = await fetch(
      "https://random-data-api.com/api/v2/users?size=10&is_xml=true"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
