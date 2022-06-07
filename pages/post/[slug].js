import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  PostDetail,
  Categories,
  PostWidget,
  Comments,
  CommentsForm,
  Loader,
  Hero2,
  Newsletter,
} from "../../components";
import { getPosts, getPostDetails } from "../../services";

export default function PostDetails({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="A blogging app" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Hero2 />
      <div className="reliance__home section__padding detail__top">
        <div className="reliance__home__post">
          <PostDetail post={post} />
          <Comments slug={post.slug} />
          <CommentsForm slug={post.slug} />
        </div>
        <div className="reliance__home__widget">
          <div className="reliance__home__widget__container">
            <Newsletter />
            <Categories />
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
