window.onload = () => {
    const textInput = document.getElementById("textInput");
    const totalCharEl = document.querySelector("#total-char-card .card-content p");
    const wordCountEl = document.querySelector("#word-count-card .card-content p");
    const sentenceCountEl = document.querySelector("#sentence-count-card .card-content p");
    const letterDensityContainer = document.getElementById("letter-density");
    const toggleExpandBtn = document.getElementById("toggle-expand");
    const toggleSpaceCheck = document.getElementsByName("toggle-space");
    const toggleCharLimit = document.getElementById("toggle-char-limit");
    const charLimitInput = document.getElementById("char-limit-input");
    const nullCharMessage = document.getElementById("null-char-message");
    const injectLimit = document.getElementById("inject-limit");
    const injectReadTime = document.getElementById("inject-read-time");
    const errorMessage = document.getElementById("error-message");
    const themeSelector = document.getElementById("themeSelector");
    const logo = document.getElementById("logo");

    let expanded = false;
    let excludeSpaces = false;
    // let limitCharacters = false;
    injectReadTime.innerHTML = "O minute"
    let wordsPerMinute = 60;
    let darkMode = false;

    themeSelector.addEventListener("click", () => {
      // work on dark mode
      darkMode = !darkMode;
      document.body.classList.toggle("dark-Mode");

      logo.src = darkMode ? "./assets/images/logo-dark-theme.svg" : "./assets/images/logo-light-theme.svg";
      themeSelector.src = darkMode ? "./assets/images/icon-sun.svg" : "./assets/images/icon-moon.svg";
    })



    const calculateReadingTime = (text) => {
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wordsPerMinute);

      if(words < wordsPerMinute || textInput.value.length < 1){
        return `< 1 minute`
      }
      return `${time} minutes`;
    };
    


    textInput.addEventListener("input", () => {
      const text = textInput.value;
      const totalChars = updateCounts(text);
      const charObj = calculateLetterDensity(text);
      renderLetterDensity(charObj, totalChars);


      nullCharMessage.style.display = text.length ? "none" : "block";
      toggleExpandBtn.style.display = text.length > 5 ? "block" : "none";

      if (toggleCharLimit.checked && charLimitInput.value) {
        const limit = parseInt(charLimitInput.value, 10);
        const limitReached = text.length >= limit;
        
        textInput.style.border = limitReached ? '1px solid #DA3701' : '1px solid #C27CF8';
        textInput.style.boxShadow = limitReached ? '0 0 10px #DA3701' : '0 0 1px #C27CF8';
        
        injectLimit.innerHTML = limit;
        errorMessage.style.display = limitReached ? "inline-flex" : "none";
      } else {
        textInput.style.border = '1px solid #C27CF8';
        textInput.style.boxShadow = '0 0 1px #C27CF8';
        errorMessage.style.display = "none";
      }
      

      // calculateReadingTime(text);
      injectReadTime.innerHTML = text.length < 1  ? "0 minute" : calculateReadingTime(text);

    });

    toggleCharLimit.addEventListener("change", (e) => {
      const limitCharacters = e.target.checked;
      charLimitInput.style.display = limitCharacters ? "inline-block" : "none";
    
      if (limitCharacters && charLimitInput.value) {
        textInput.setAttribute("maxlength", charLimitInput.value); 
      } else {
        textInput.removeAttribute("maxlength");
        textInput.style.border = '1px solid #C27CF8';
        textInput.style.boxShadow = 'none';
        errorMessage.style.display = "none";
      }
    });
    
    // Listen for real-time changes in the number input
    charLimitInput.addEventListener("input", () => {
      const limitValue = charLimitInput.value;
      if (limitValue) {
        textInput.setAttribute("maxlength", limitValue);
      } else {
        textInput.removeAttribute("maxlength");
      }
    });

  
    const updateCounts = (text) => {
      const characterCount = excludeSpaces ? text.replace(/\s/g, "").length : text.length;
      const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
      const sentenceCount = text.trim().length > 0 ? text.trim().split(/[.?!]+/).filter(Boolean).length : 0;
  
      totalCharEl.textContent = characterCount;
      wordCountEl.textContent = wordCount;
      sentenceCountEl.textContent = sentenceCount;
  
      return characterCount;
    };
  
    const calculateLetterDensity = (text) => {
    let cleanedText = text.trim().replace(/[^a-zA-Z\s]/g, "");
    if (excludeSpaces) cleanedText = cleanedText.replace(/\s/g, "");
      const chars = {};
  
      for (let char of cleanedText) {
        chars[char.toLowerCase()] = (chars[char.toLowerCase()] || 0) + 1;
      }
  
      return chars;
    };
  
    const renderLetterDensity = (chars, totalChars) => {
      console.log(chars)
      sortedChars = Object.fromEntries(Object.entries(chars).sort(([,a] , [,b]) => b - a)
      )
      const keys = Object.keys(sortedChars);
      let displayKeys = expanded ? keys : keys.slice(0, 5);
  
      // Clear old entries except the title and toggle button
      const items = Array.from(letterDensityContainer.querySelectorAll(".letter-density"));
      items.forEach(item => item.remove());
  
      displayKeys.forEach(char => {
        if (char === " ") return;

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
  
   

    // toggleSpaceCheck.addEventListener("change", () => {
    //     excludeSpaces = e.target.checked;
    //     updateCounts(textInput.value)
    // })


    toggleSpaceCheck.forEach(checkbox => {
        checkbox.addEventListener("change", (e) => {
          excludeSpaces = e.target.checked;
          const text = textInput.value;
          const totalChars = updateCounts(text);
          const charObj = calculateLetterDensity(text);
          renderLetterDensity(charObj, totalChars);
        });
      });    

  };
  