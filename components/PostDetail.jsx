import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { RichText } from "@graphcms/rich-text-react-renderer";

export default function PostDetail({ post }) {
  return (
    <div className="reliance__postdetail">
      <div className="reliance__postdetail__thumb">
        <div className="reliance__postdetail__thumb__image">
          <Image src={post.featuredImage.url} alt={post.title} layout="fill" />
        </div>

        <div className="reliance__postdetail__details">
          <h1>{post.title}</h1>
        </div>
        <div className="reliance__postdetail__thumb__info">
          <div className="reliance__postdetail__thumb__info__tags">
            {post.categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.name}>
                <span>{category.name} </span>
              </Link>
            ))}
          </div>
          <div className="reliance__postdetail__thumb__info__author">
            <div className="reliance__postdetail__thumb__info__author__body">
              <h5>{post.author.name}</h5>
              <p>{moment(post.createdAt).format("llll")}</p>
            </div>
            <div className="reliance__postdetail__thumb__info__author__media">
              <Image
                alt={post.author.name}
                height={60}
                width={60}
                src={post.author.photo.url}
              />
            </div>
          </div>
        </div>

        <div className="reliance__postdetail__post">
          <RichText
            content={post.content.raw}
            renderers={{
              h1: ({ children }) => <h1>{children}</h1>,
              bold: ({ children }) => <strong>{children}</strong>,
              p: ({ children }) => <p className="paragraph">{children}</p>,
              blockquote: ({ children }) => (
                <blockquote className="blockquote">{children}</blockquote>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}
