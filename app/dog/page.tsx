import DogClient from "./DogClient";

export default async function DogServer() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();

  return <DogClient image={data.message} />;
}
