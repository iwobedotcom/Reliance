import React, { useState, useEffect } from "react";
import { ImFacebook2, ImTwitter, ImInstagram, ImYoutube } from "react-icons/im";
import Image from "next/image";
import Link from "next/link";
import { logo } from "../public";
import { getCategories } from "../services";

export default function Header() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="reliance__header section__padding">
      <div className="reliance__header__logo">
        <Link href="/">
          <Image src={logo} alt="logo" width={120} height={26} />
        </Link>
      </div>

      <div className="reliance__header__menu">
        {categories.map((category) => (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <a className="reliance__header__menu__link">{category.name}</a>
          </Link>
        ))}
      </div>

      <div className="reliance__header__socials">
        <Link href="#">
          <span>
            <ImFacebook2 />
          </span>
        </Link>
        <Link href="#">
          <span>
            <ImTwitter />
          </span>
        </Link>
        <Link href="#">
          <span>
            <ImInstagram />
          </span>
        </Link>
        <Link href="#">
          <span>
            <ImYoutube />
          </span>
        </Link>
      </div>
    </div>
  );
}
