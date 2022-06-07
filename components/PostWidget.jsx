import React, { useState, useEffect } from "react";
import moment from "moment";
import Image from "next/image";
import { ImCalendar } from "react-icons/im";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";

export default function PostWidget({ categories, slug }) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
  }, [slug]);
  return (
    <div className=" reliance__postwidget reliance__sidebar__widget">
      <h4 className="reliance__postwidget__title">
        {slug ? "Related Posts" : "Recent Posts"}
      </h4>
      {relatedPosts.map((post) => (
        <div className="reliance__postwidget__post" key={post.title}>
          <div className="reliance__postwidget__post__thumb">
            <div className="reliance__postwidget__post__thumb__image">
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                layout="fill"
              />
            </div>
            <ul className="reliance__postwidget__post__thumb__info">
              <li>
                <Image
                  alt={post.author.name}
                  height={30}
                  width={30}
                  className="reliance__postwidget__post__thumb__info__image"
                  src={post.author.photo.url}
                />
                <p>{post.author.name}</p>
              </li>
              <li>
                <ImCalendar /> <p>{moment(post.createdAt).format("MMM DD")}</p>
              </li>
            </ul>
          </div>
          <div className="reliance__postwidget__post__thumb__details">
            <Link href={`/post/${post.slug}`}>
              <h1>{post.title}</h1>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
