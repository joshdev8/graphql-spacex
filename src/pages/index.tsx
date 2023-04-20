import Image from "next/image";
import { Inter } from "next/font/google";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Card from "../components/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ launches }: any) {
  console.log("launches: ", launches);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white ">
        SpaceX Launches
      </h1>
      <p className="mb-8 text-base text-gray-500 md:text-lg dark:text-gray-400">
        A simple app to view SpaceX launches
      </p>

      <ul role="list" className="divide-y divide-gray-100">
        {launches.map((launch: any) => (
          <Card key={launch.id} {...launch} />
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://spacex-production.up.railway.app/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 20) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            mission_patch
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  console.log("data: ", data);

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}
