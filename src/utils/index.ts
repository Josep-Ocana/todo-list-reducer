export const formattedText = (text: string) => {
  text = text.trim();
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
