import React, { useState, useEffect } from "react";
import moment from "moment";
import parse from "html-react-parser";
import { AvatarGenerator } from "random-avatar-generator";
import { getComments } from "../services";
import Image from "next/image";

export default function Comments({ slug }) {
  const generator = new AvatarGenerator();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(slug).then((result) => setComments(result));
  }, []);

  return (
    <div className="reliance__commentsarea">
      <h4>{comments.length} Comment(s)</h4>
      <div className="reliance__commentlist__comment__user">
        <div className="reliance__commentlist__comment__user__thumb">
          <Image
            src={generator.generateRandomAvatar()}
            alt="avatar"
            width={60}
            height={60}
          />
        </div>
        {comments.map((comment) => (
          <div
            key={comment.createdAt}
            className="reliance__commentlist__comment__desc"
          >
            <h5>James Doe</h5>
            <span>{moment(comment.createdAt).format("llll")}</span>
            <p>{parse(comment.comment)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
