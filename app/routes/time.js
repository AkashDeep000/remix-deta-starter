import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const time = new Date()
  return json({
    time: time
  },
  {
    headers: {
       "Cache-Control": "max-age=10, stale-while-revalidate=50, stale-if-error=2592000"
    }
    
  });
};
/*
export default function Posts() {
  const { time } = useLoaderData();
  console.log(time);
  return (
    <main>
      <h1>{time}</h1>
    </main>
  );
}*/