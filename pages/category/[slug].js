import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { getCategories, getCategoryPost } from "../../services";
import {
  Newsletter,
  PostCard,
  Categories,
  Loader,
  Hero2,
} from "../../components/";

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>
          Categories | Reliance - World's best CMS Blogging Platform.
        </title>
        <meta name="description" content="A blogging app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      <Hero2 />
      <div className="reliance__home section__padding">
        <div className="reliance__home__post">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="reliance__home__widget">
          <div className="reliance__home__widget__container">
            <Newsletter />
            <Categories />
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
