
export const countCharacters = (text, excludeSpaces = false) => {
    return excludeSpaces ? text.replace(/\s/g, "").replace(/\.{3,}/g, '.').length : text.length;
  };
  
  export const countWords = (text) => {
    return text.trim().length > 0 ? text.trim().replace(/\.{3,}/g, '').split(/\s+/).length : 0;
  };
  
  export const countSentences = (text) => {
    return text.trim().replace(/\.{3,}/g, '.').length > 0 ? text.trim().replace(/\.{3,}/g, '').split(/[.?!]+/).filter(Boolean).length : 0;
  };
  
  export const calculateLetterDensity = (text, excludeSpaces = false) => {
    let cleanedText = text.trim().replace(/[^a-zA-Z\s]/g, "");
    if (excludeSpaces) cleanedText = cleanedText.replace(/\s/g, "");
  
    const chars = {};
    for (let char of cleanedText) {
      const lower = char.toLowerCase();
      chars[lower] = (chars[lower] || 0) + 1;
    }
    return chars;
  };
  
  export const calculateReadingTime = (text, wordsPerMinute = 60) => {
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    if (words < wordsPerMinute || text.length < 1) return `< 1 minute`;
    return `${time} minutes`;
  };
  