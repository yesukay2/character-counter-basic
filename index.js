window.onload = () => {
    const textInput = document.getElementById("textInput");
    const totalCharEl = document.querySelector("#total-char-card .card-content p");
    const wordCountEl = document.querySelector("#word-count-card .card-content p");
    const sentenceCountEl = document.querySelector("#sentence-count-card .card-content p");
    const letterDensityContainer = document.getElementById("letter-density");
    const toggleExpandBtn = document.getElementById("toggle-expand");
  
    let expanded = false;
  
    const updateCounts = (text) => {
      const characterCount = text.length;
      const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
      const sentenceCount = text.trim().length > 0 ? text.trim().split(/[.?!]+/).filter(Boolean).length : 0;
  
      totalCharEl.textContent = characterCount;
      wordCountEl.textContent = wordCount;
      sentenceCountEl.textContent = sentenceCount;
  
      return characterCount;
    };
  
    const calculateLetterDensity = (text) => {
      const cleaned = text.trim().replace(/[^a-zA-Z]/g, "").replace(/\s+/g, "");
      const chars = {};
  
      for (let char of cleaned) {
        chars[char.toLowerCase()] = (chars[char.toLowerCase()] || 0) + 1;
      }
  
      return chars;
    };
  
    const renderLetterDensity = (chars, totalChars) => {
      const keys = Object.keys(chars);
      let displayKeys = expanded ? keys : keys.slice(0, 5);
  
      // Clear old entries except the title and toggle button
      const items = Array.from(letterDensityContainer.querySelectorAll(".letter-density"));
      items.forEach(item => item.remove());
  
      displayKeys.forEach(char => {
        const count = chars[char];
        const percent = ((count / totalChars) * 100).toFixed(2);
  
        const wrapper = document.createElement("div");
        wrapper.className = "letter-density";
  
        const letter = document.createElement("p");
        letter.className = "letter";
        letter.textContent = char.toUpperCase();
  
        const progressOuter = document.createElement("div");
        progressOuter.className = "progress custom-progress";
        progressOuter.style.height = "12px";
        progressOuter.style.borderRadius = "10px";
  
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.width = `${percent}%`;
  
        const percentage = document.createElement("p");
        percentage.className = "percentage";
        percentage.textContent = `${count} (${percent}%)`;
  
        progressOuter.appendChild(progressBar);
        wrapper.appendChild(letter);
        wrapper.appendChild(progressOuter);
        wrapper.appendChild(percentage);
  
        letterDensityContainer.insertBefore(wrapper, toggleExpandBtn);
      });
    };
  
    toggleExpandBtn.addEventListener("click", () => {
      expanded = !expanded;
      const text = textInput.value;
      const totalChars = updateCounts(text);
      const charObj = calculateLetterDensity(text);
      renderLetterDensity(charObj, totalChars);
      toggleExpandBtn.innerHTML = expanded ? 'See less <span><img src="./assets/images/chevron-up.svg" alt=""></span>' : 'See more <span><img src="./assets/images/chevron-down.svg" alt=""></span>';
    });
  
    textInput.addEventListener("input", () => {
      const text = textInput.value;
      const totalChars = updateCounts(text);
      const charObj = calculateLetterDensity(text);
      renderLetterDensity(charObj, totalChars);
    });
  };
  