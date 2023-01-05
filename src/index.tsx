import { ActionPanel, Detail, List, Action } from "@raycast/api";
import fetch from 'node-fetch';
import { useEffect, useState } from "react";

export default function Command() {
  interface movieData {
    name: string,
    genre: string,
    poster: string
  }
  interface movieInfo {
    data: movieData,
    originalName: string,
    imdbRating: string,
    rottenRating: string,
    doubanRating: string
  }

  let [movieArray, setMovieArray] = useState<movieInfo[]>([]);
  // let movieArray: [movieInfo];
  async function getUsers() {
    try {
      // 👇️ const response: Response
      const response = await fetch('https://api.wmdb.tv/api/v1/movie/search?q=英雄本色', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      // 👇️ const result: GetUsersResponse
      const result = (await response.json());
      setMovieArray(JSON.parse(JSON.stringify(result, null, 4)))
      movieArray = JSON.parse(JSON.stringify(result, null, 4))
      console.log('lala', movieArray)
      return result;
    } catch (error) {
      if (error instanceof Error) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }
  getUsers();

  console.log('test test111')
  return (
    <List>
      {movieArray.map((item, index, array) => (
        <List.Item key={index} title={item.originalName} icon={item.data.poster}/>
      ))}
    </List>
  );
}