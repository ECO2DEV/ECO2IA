import { DataMattCV } from "../../data/mattcv";

export const RadioButtonsTemplate = ({
  selectedTemplate,
  handleTemplateChange
}) => {
  return (
    <div className="main flex border rounded-full overflow-hidden m-4 select-none">
      <div className="title py-2 my-auto px-5 bg-gray-800 text-white text-sm font-semibold mr-3">
        {DataMattCV.Template}
      </div>
      <label className="flex radio p-2 cursor-pointer">
        <input
          className="my-auto transform scale-125 text-emerald-600 border-gray-300 focus:ring-emerald-500"
          type="radio"
          value="template1"
          checked={selectedTemplate === 'template1'}
          onChange={handleTemplateChange}
        />
        <div className="title px-2"> {DataMattCV.Default} </div>
      </label>

      <label className="flex radio p-2 cursor-pointer">
        <input
          className="my-auto transform scale-125 text-emerald-600 border-gray-300  focus:ring-emerald-500"
          type="radio"
          value="template2"
          checked={selectedTemplate === 'template2'}
          onChange={handleTemplateChange}
        />
        <div className="title px-2"> {DataMattCV.Classic} </div>
      </label>
    </div>
  );
};
