import { XMarkIcon } from '@heroicons/react/20/solid';

export const FileUpload = ({ files, setFiles }) => {
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...newFiles];
      // console.log('each image upload', updatedFiles);
      return updatedFiles;
    });
  };
  const removeFile = (fileToRemove) => {
    setFiles(files.filter((file) => file !== fileToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-2">
        {files.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`Vista previa ${index}`}
              className="w-20 h-20 object-cover" // Tamaño de la imagen
            />
            <button
              onClick={() => removeFile(file)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              style={{ top: '-10px', right: '-10px' }} // Posición del botón
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      {files && (
        <label
          htmlFor="ImageIAS"
          className="cursor-pointer font-bold text-gray-700"
        >
          <input
            onChange={handleFileChange}
            type="file"
            name="ImageIAS"
            id="ImageIAS"
            multiple
            className="hidden"
          />
          <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-black">
            Subir imagenes Max.4
          </span>
        </label>
      )}
    </div>
  );
};
