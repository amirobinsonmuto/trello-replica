import React, { useState } from "react";

const CardDescriptionForm = () => {
  const [descriptionText, setDescriptionText] = useState("");

  const handleChange = (e) => {
    setDescriptionText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the submitted text
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={descriptionText}
        onChange={handleChange}
        rows={8}
        cols={40}
        placeholder="Write description"
      ></textarea>
      <button type="submit" className="button-primary me-4">
        Save
      </button>
      <button type="button-secondary">Cancel</button>
    </form>
  );
};

export default CardDescriptionForm;
