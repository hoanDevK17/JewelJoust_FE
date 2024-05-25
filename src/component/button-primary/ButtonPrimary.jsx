import React from "react";
import "./index.scss";

export default function ButtonPrimary({ title, Onclick }) {
  // [pros title, ;proOnclick]
  return (
    <button
      className="button-star-regis"
      onClick={() => {
        Onclick();
      }}
    >
      {title}
    </button>
  );
}
