import React from "react";

export default function Newsletter() {
  return (
    <div className="reliance__newsletter reliance__sidebar__widget">
      <h4 className="reliance__newsletter__title">Newsletter</h4>
      <div className="reliance__newsletter__form">
        <input type="text" placeholder="Enter your email" />
        <button type="button">Subscribe</button>
      </div>
    </div>
  );
}
