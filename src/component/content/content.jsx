
import React from "react";
import "./content.scss";
import { useNavigate } from "react-router-dom";

export default function Content({ title, btnContent, linkURL }) {
  const navigate = useNavigate();
  return (
    <div className="contentBar">
      <h1>{title}</h1>
      {/* <Button className='oneButton' type="primary" size="large" style={{
                background: "#ffbe98"
            }}>
                {btnContent}
            </Button> */}
      {btnContent && (
        <button
          className="todo-button"
          onClick={() => {
            navigate(linkURL);
          }}
        >
          {btnContent}
        </button>
      )}
    </div>
  );
}
