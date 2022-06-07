import React, { useState, useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { getMostRecentPost } from "../services";

export default function Hero2(categories, slug) {
  const [recentPost, setRecentPost] = useState([]);

  useEffect(() => {
    if (slug) {
      getMostRecentPost(categories, slug).then((result) =>
        setRecentPost(result)
      );
    } else {
      getMostRecentPost().then((result) => setRecentPost(result));
    }
  }, [slug]);
  return (
    <>
      {recentPost.map((post) => (
        <div
          className="reliance__hero2"
          style={{
            backgroundImage: `url(${post.featuredImage.url})`,
          }}
          key={post.title}
        >
          <div className="reliance__hero2__container">
            <h3>{post.author.name}</h3>
            <Link href={`/post/${post.slug}`}>
              <h1>{post.title}</h1>
            </Link>
            <h4>{moment(post.createdAt).format("MMM, DD YYYY")}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
