import React from "react";
import Link from "next/link";
import moment from "moment";
import Image from "next/image";
import { ImCalendar, ImSmile2 } from "react-icons/im";

export default function PostCard({ post }) {
  return (
    <div className="reliance__postcard">
      <div className="reliance__postcard__thumb">
        <div className="reliance__postcard__thumb__image">
          <Image src={post.featuredImage.url} alt={post.title} layout="fill" />
        </div>
        <ul className="reliance__postcard__thumb__info">
          <li>
            <Image
              alt={post.author.name}
              height={30}
              width={30}
              className="reliance__postcard__thumb__info__image"
              src={post.author.photo.url}
            />
            <p>{post.author.name}</p>
          </li>
          <li>
            <ImCalendar />{" "}
            <p>{moment(post.createdAt).format("MMM DD, YYYY")}</p>
          </li>
          <li>
            <ImSmile2 /> ... Comment(s)
          </li>
        </ul>
      </div>

      <div className="reliance__postcard__details">
        <Link href={`/post/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <p>
          Tag:
          {post.categories.map((category) => (
            <span key={category.name}>{category.slug} </span>
          ))}
        </p>
        <p>{post.excerpt}</p>
        <Link href={`/post/${post.slug}`}>
          <button type="button">Continue Reading</button>
        </Link>
      </div>
    </div>
  );
}
