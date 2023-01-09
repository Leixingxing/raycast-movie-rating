import { List, LaunchProps } from "@raycast/api";
import fetch from "node-fetch";
import DOMParser from "dom-parser";
import { useEffect, useState } from "react";
import * as htmlparser2 from "htmlparser2";

export default function Command(props: string) {
  interface movieData {
    name: string;
    genre: string;
    poster: string;
  }
  interface movieInfo {
    data: movieData;
    originalName: string;
    imdbRating: string;
    rottenRating: string;
    doubanRating: string;
  }

  let [movieArray, setMovieArray] = useState<movieInfo[]>([]);
  // let movieArray: [movieInfo];
  async function getUsers() {
    try {
      // 👇️ const response: Response
      const response = await fetch("https://api.wmdb.tv/api/v1/movie/search?q=精灵旅社", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      // 👇️ const result: GetUsersResponse
      const result = await response.json();
      setMovieArray(JSON.parse(JSON.stringify(result, null, 4)));
      movieArray = JSON.parse(JSON.stringify(result, null, 4));
      console.log("lala", movieArray);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }
  async function getTest() {
    await fetch(
      "https://search.douban.com/movie/subject_search?search_text=%E7%99%BD%E6%97%A5%E6%A2%A6%E6%83%B3%E5%AE%B6&cat=1002"
    )
      .then((res) => res.text())
      .then((responseText) => {
        const dom = htmlparser2.parseDocument(responseText);
        const array = dom.children;
        // const dom = new DOMParser().parseFromString(responseText);
        // const h1 = dom.
        // const test = dom.getElementById("db-nav-movie");
        // console.log("test1", h1?.length);
        console.log(array)
      });
  }
  // getUsers();
  getTest();

  return (
    <List>
      {movieArray.map((item, index, array) => (
        <List.Item key={index} title={item.originalName} icon={item.data.poster} />
      ))}
    </List>
  );
}
