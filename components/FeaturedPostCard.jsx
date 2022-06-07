import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedPostCard({ post }) {
  return (
    <div className="reliance__fpc">
      <div className="reliance__fpc__slide">
        <div className="reliance__fpc__slide__image">
          <Image
            src={post.featuredImage.url}
            alt={post.title}
            width={360}
            height={236}
          />
        </div>
        <div className="reliance__fpc__slide__content">
          <Link href={`/post/${post.slug}`}>
            <h3>{post.title}</h3>
          </Link>
          <div>
            <Image
              src={post.author.photo.url}
              width={40}
              height={40}
              alt={post.author.name}
            />
            <h5>{post.author.name}</h5>
          </div>
          <p>{moment(post.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
}
