export const RadioButtonsTemplate = ({
  selectedTemplate,
  handleTemplateChange
}) => {
  return (
    <div class="main flex border rounded-full overflow-hidden m-4 select-none">
      <div class="title py-2 my-auto px-5 bg-gray-800 text-white text-sm font-semibold mr-3">
        Templates
      </div>
      <label class="flex radio p-2 cursor-pointer">
        <input
          class="my-auto transform scale-125 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          type="radio"
          value="template1"
          checked={selectedTemplate === 'template1'}
          onChange={handleTemplateChange}
        />
        <div class="title px-2">Default</div>
      </label>

      <label class="flex radio p-2 cursor-pointer">
        <input
          class="my-auto transform scale-125 text-indigo-600 border-gray-300 focus:ring-indigo-500"
          type="radio"
          value="template2"
          checked={selectedTemplate === 'template2'}
          onChange={handleTemplateChange}
        />
        <div class="title px-2">Classic </div>
      </label>
    </div>
  );
};
