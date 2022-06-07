import React, { useState, useEffect } from "react";
import { ImFacebook, ImTwitter, ImInstagram, ImYoutube } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { getCategories } from "../services";
import {
  feed01,
  feed02,
  feed03,
  feed04,
  feed05,
  feed06,
  feed07,
  feed08,
  feed09,
  feed10,
} from "../public";

export default function Footer() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="reliance__footer section__padding">
      <div className="reliance__footer__container">
        <div className="about__us">
          <h4>
            About <strong>Reliance</strong>{" "}
          </h4>
          <p>
            Nulla eiusmod cupidatat ut do exercitation amet. Anim ullamco
            consequat culpa do quis proident. Enim sint voluptate id do amet
            commodo quis cupidatat eiusmod est dolor ullamco.
          </p>
        </div>
        <div className="quick__links">
          <h4>Quick Links</h4>
          {categories.map((category) => (
            <ul key={category.slug}>
              <Link href={`/category/${category.slug}`}>
                <li className="reliance__header__menu__link">
                  {category.name}
                </li>
              </Link>
            </ul>
          ))}
        </div>
        <div className="feeds">
          <h4>Instgram Feeds</h4>
          <ul className="gallery">
            <li>
              <Image src={feed01} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed02} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed03} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed04} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed05} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed06} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed07} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed08} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed09} alt="gallery" width={60} height={60} />
            </li>
            <li>
              <Image src={feed10} alt="gallery" width={60} height={60} />
            </li>
          </ul>
        </div>
        <div className="connect">
          <h4>Connect with Us</h4>
          <ul className="socials">
            <li>
              <ImFacebook />
            </li>
            <li>
              <ImTwitter />
            </li>
            <li>
              <ImInstagram />
            </li>
            <li>
              <ImYoutube />
            </li>
          </ul>
        </div>
      </div>
      <div className="reliance__footer__copyright">
        <p>
          Copyright ©{moment().format("YYYY")} All rights reserved.{" "}
          <span>Reliance</span>
        </p>
      </div>
    </div>
  );
}
