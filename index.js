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
    injectReadTime.innerHTML = "O minute"
    let wordsPerMinute = 60;
    let darkMode = false;

    // Theme selector icon change in various modes
    themeSelector.addEventListener("click", () => {
      darkMode = !darkMode;
      document.body.classList.toggle("dark-Mode");

      logo.src = darkMode ? "./assets/images/logo-dark-theme.svg" : "./assets/images/logo-light-theme.svg";
      themeSelector.src = darkMode ? "./assets/images/icon-sun.svg" : "./assets/images/icon-moon.svg";
    })



    // Approximate reading time calculated based on a wordsPerMinute value of 60
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

// render toggle for see more button & no character message for letter density
      nullCharMessage.style.display = text.length ? "none" : "block";

      characterSet = new Set(text);
      toggleExpandBtn.style.display = characterSet.size > 5 ? "block" : "none";

      // logic & style for character limit error message display
      if (toggleCharLimit.checked && charLimitInput.value) {
        const limit = parseInt(charLimitInput.value, 10);
        const limitReached = text.length >= limit;
        
        textInput.style.border = limitReached ? '1px solid #DA3701' : '1px solid #C27CF8';
        textInput.style.boxShadow = limitReached ? '0 0 10px #DA3701' : '0 0 1px #C27CF8';
        
        injectLimit.innerHTML = limit;
        errorMessage.style.display = limitReached ? "inline-flex" : "none";
      } else {

        // default input style and hide error message
        textInput.style.border = '1px solid #C27CF8';
        textInput.style.boxShadow = '0 0 1px #C27CF8';
        errorMessage.style.display = "none";
      }

      injectReadTime.innerHTML = text.length < 1  ? "0 minute" : calculateReadingTime(text);

    });

    // character limit toggler and limit input
    toggleCharLimit.addEventListener("change", (e) => {
      const limitCharacters = e.target.checked;
      charLimitInput.style.display = limitCharacters ? "inline-block" : "none";
      // set max length attribute for input
      if (limitCharacters && charLimitInput.value) {
        textInput.setAttribute("maxlength", charLimitInput.value); 
      } else {

        // remove max length attribute
        textInput.removeAttribute("maxlength");

        // default style
        textInput.style.border = '1px solid #C27CF8';
        textInput.style.boxShadow = 'none';
        errorMessage.style.display = "none";
      }
    });
    
    // Listen for changes in character limit input
    charLimitInput.addEventListener("input", () => {
      const limitValue = charLimitInput.value;
      if (limitValue) {
        textInput.setAttribute("maxlength", limitValue);
      } else {
        textInput.removeAttribute("maxlength");
      }
    });


  // logic for updating counter values
    const updateCounts = (text) => {
      const characterCount = excludeSpaces ? text.replace(/\s/g, "").length : text.length;
      const wordCount = text.trim().length > 0 ? text.trim().split(/\s+/).length : 0;
      const sentenceCount = text.trim().length > 0 ? text.trim().split(/[.?!]+/).filter(Boolean).length : 0;
  
      // set 0 as preceding number for single digit counts values
      totalCharEl.textContent = characterCount > 9 ? characterCount : `0${characterCount}`;
      wordCountEl.textContent = wordCount > 9 ? wordCount : `0${wordCount}`;
      sentenceCountEl.textContent = sentenceCount > 9 ? sentenceCount : `0${sentenceCount}`;
  
      return characterCount;
    };
  
    // setting characters and corresponding occurrences in an object
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

      // sort letter density in descending order
      sortedChars = Object.fromEntries(Object.entries(chars).sort(([,a] , [,b]) => b - a)
      )

      const keys = Object.keys(sortedChars);
      let displayKeys = expanded ? keys : keys.slice(0, 5);
  
      // Clear old entries except the title and toggle button
      const items = Array.from(letterDensityContainer.querySelectorAll(".letter-density"));
      items.forEach(item => item.remove());


      // render letter densities
      displayKeys.forEach(char => {
        if (char === " ") return;

        const count = chars[char];
        const percent = ((count / totalChars) * 100).toFixed(2);
  
        // creating letter density elements & adding necessary class names
        const wrapper = document.createElement("div");
        wrapper.className = "letter-density";
  
        const letter = document.createElement("p");
        letter.className = "letter";
        letter.textContent = char.toUpperCase();
  
        // progress container
        const progressOuter = document.createElement("div");
        progressOuter.className = "progress custom-progress";
        progressOuter.style.height = "12px";
        progressOuter.style.borderRadius = "10px";
  
        // progress bar
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.width = `${percent}%`;
  
        // percentage density
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

    // logic for see more button
    toggleExpandBtn.addEventListener("click", () => {
      expanded = !expanded;
      const text = textInput.value;
      const totalChars = updateCounts(text);
      const charObj = calculateLetterDensity(text);
      renderLetterDensity(charObj, totalChars);
      toggleExpandBtn.innerHTML = expanded ? 'See less <span><img src="./assets/images/chevron-up.svg" alt=""></span>' : 'See more <span><img src="./assets/images/chevron-down.svg" alt=""></span>';
    });

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
  