import { DataEco2CV } from "../../data/eco2cv";
function TagsInput({ tags, setTags }) {
  function handleKeyDown(e) {
    if (e.key === ',') {
      e.preventDefault(); // Evitar que se agregue la coma al input
      const value = e.target.value.trim();
      if (!value) return;
      setTags([...tags, value]);
      e.target.value = '';
    }
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="close" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="tags-input"
        placeholder={DataEco2CV.TypeaTag}
      />
    </div>
  );
}

export default TagsInput;
