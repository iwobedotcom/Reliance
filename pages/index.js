import Head from "next/head";
import {
  Hero,
  Newsletter,
  PostWidget,
  Categories,
  PostCard,
} from "../components";
import { FeaturedPosts } from "../sections";
import { getPosts } from "../services";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Reliance - World&apos;s best CMS blogging platform.</title>
        <meta name="description" content="A blogging app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Hero />
      <FeaturedPosts />
      <div className="reliance__home section__padding">
        <div className="reliance__home__post">
          {posts.map((post) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        <div className="reliance__home__widget">
          <div className="reliance__home__widget__container">
            <Newsletter />
            <Categories />
            <PostWidget />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
