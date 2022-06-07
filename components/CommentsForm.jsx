import React, { useState, useEffect } from "react";
import { submitComment } from "../services";

export default function CommentsForm({ slug }) {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: null,
    email: null,
    subject: null,
    comment: null,
    storeData: false,
  });

  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initialFormData = {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("email"),
      storeData:
        window.localStorage.getItem("name") ||
        window.localStorage.getItem("email"),
    };
    setFormData(initialFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  // const commentEl = useRef();
  // const nameEl = useRef();
  // const emailEl = useRef();
  // const subjectEl = useRef();
  // const storeDataEl = useRef();

  const handleCommentSubmission = () => {
    setError(false);
    const { name, email, subject, comment, storeData } = formData;
    if (!name || !email || !subject || !comment) {
      setError(true);
      return;
    }
    const commentObj = {
      name,
      email,
      subject,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = "";
          formData.email = "";
        }
        formData.subject = "";
        formData.comment = "";
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };

  return (
    <div className="reliance__commentsform">
      <h4>Leave a Reply</h4>
      <form>
        <div className="reliance__form__first">
          <input
            type="text"
            value={formData.name}
            onChange={onInputChange}
            placeholder="Name"
            name="name"
          />
          <input
            type="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="Email"
            name="email"
          />
        </div>
        <div className="reliance__form__second">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={onInputChange}
            placeholder="Subject"
          />
        </div>
        <div className="reliance__form__third">
          <textarea
            name="comment"
            value={formData.comment}
            onChange={onInputChange}
            cols="30"
            rows="10"
            placeholder="Write your comment"
          ></textarea>
        </div>
        <div className="reliance__form__fourth">
          <div>
            <input
              type="checkbox"
              checked={formData.storeData}
              name="storeData"
              id="storeData"
              value="true"
            />
            <label htmlFor="storeData">
              Save my name, email for the next time I comment.
            </label>
          </div>
        </div>
        {error && <p className="reliance__error">All fields are required</p>}

        <button type="button" onClick={handleCommentSubmission}>
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className="reliance__success">
            Comment submitted for review
          </span>
        )}
      </form>
    </div>
  );
}
