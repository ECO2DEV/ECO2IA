export const handleCopy = (resp, index, setCopied) => {
  navigator.clipboard
    .writeText(resp)
    .then(() => {
      setCopied((prevCopied) => {
        const newCopied = [...prevCopied];
        newCopied[index] = true;
        return newCopied;
      });
      setTimeout(() => {
        setCopied((prevCopied) => {
          const newCopied = [...prevCopied];
          newCopied[index] = false;
          return newCopied;
        });
      }, 2000);
    })
    .catch((error) => {
      console.error('Error al copiar al portapapeles:', error);
    });
};

export const handleCopyCode = (text, index, setCopiedCode) => {
  const codeToCopy = text;

  navigator.clipboard
    .writeText(codeToCopy)
    .then(() => {
      setCopiedCode((prevCopied) => {
        const newCopied = [...prevCopied];
        newCopied[index] = true;
        return newCopied;
      });
      setTimeout(() => {
        setCopiedCode((prevCopied) => {
          const newCopied = [...prevCopied];
          newCopied[index] = false;
          return newCopied;
        });
      }, 2000);
    })
    .catch((error) => {
      console.error('Error al copiar al portapapeles:', error);
    });
};
