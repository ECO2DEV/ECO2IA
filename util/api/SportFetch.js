import axios from 'axios';

export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_EXERCISE_API_KEY,
    'X-RapidAPI-Host': process.env.NEXT_PUBLIC_EXERCISE_API_HOST
  }
};

//  export const youtubeOptions = {
//   method: "GET",
//   headers: {
//    "X-RapidAPI-Host": process.env.REACT_APP_YOUTUBE_HOST,
//    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//   },
//  };

export const fetchDataExerciseDB = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_EXERCISE_API_KEY,
        'X-RapidAPI-Host': process.env.NEXT_PUBLIC_EXERCISE_API_HOST
      }
    });
    // console.log('response', response);
    return response.data; // Return response data
  } catch (error) {
    console.error('error in exercise', error);
    throw error; // Throw error to handle it elsewhere if needed
  }
};
export const exerciseUrl = process.env.NEXT_PUBLIC_EXERCISE_URL;
