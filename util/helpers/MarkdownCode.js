import { marked } from 'marked';

export const RenderMarkdown = (markdown) => {
  const rawMarkup = marked(markdown);
  return { __html: rawMarkup };
};

export const extractCodeFromMarkdown = (markdown) => {
  const regex = /```(\w+)?[\s\S]*?```/g;
  let extractedCode = '';

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    let codeBlock = match[0];
    if (match[1]) {
      codeBlock = codeBlock.replace(`\`\`\`${match[1]}`, '```');
    }
    extractedCode += codeBlock.replace(/```/g, '').trim() + '\n\n';
  }

  return extractedCode.trim();
};
