import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategories } from "../services";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="reliance__categories reliance__sidebar__widget">
      <h4 className="reliance__categories__title">Categories</h4>

      <ul className="reliance__categories__list">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link href={`/category/${category.slug}`}>
              <p>{category.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
