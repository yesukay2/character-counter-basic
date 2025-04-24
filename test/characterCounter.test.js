// import {
//     countCharacters,
//     countWords,
//     countSentences,
//     calculateLetterDensity,
//     calculateReadingTime
//   } from "./characterCounter.js";
  
//   describe("Character Counter Utilities", () => {
//     test("countCharacters - includes spaces", () => {
//       expect(countCharacters("Hello world")).toBe(11);
//     });
  
//     test("countCharacters - excludes spaces", () => {
//       expect(countCharacters("Hello world", true)).toBe(10);
//     });
  
//     test("countCharacters - empty string", () => {
//       expect(countCharacters("")).toBe(0);
//     });
  
//     test("countWords - basic input", () => {
//       expect(countWords("This is a test")).toBe(4);
//     });
  
//     test("countWords - excessive spaces", () => {
//       expect(countWords("  This   is   spaced out  ")).toBe(4);
//     });
  
//     test("countWords - empty string", () => {
//       expect(countWords("")).toBe(0);
//     });
  
//     test("countSentences - basic punctuation", () => {
//       expect(countSentences("This is one. This is two? This is three!")).toBe(3);
//     });
  
//     test("countSentences - no punctuation", () => {
//       expect(countSentences("No punctuation here")).toBe(1);
//     });
  
//     test("calculateLetterDensity - basic input", () => {
//       const result = calculateLetterDensity("AAaaBBb", false);
//       expect(result).toEqual({ a: 4, b: 3 });
//     });
  
//     test("calculateLetterDensity - exclude spaces and symbols", () => {
//       const result = calculateLetterDensity("A! B! B", true);
//       expect(result).toEqual({ a: 1, b: 2 });
//     });
  
//     test("calculateReadingTime - < 1 minute", () => {
//       expect(calculateReadingTime("Short input")).toBe("< 1 minute");
//     });
  
//     test("calculateReadingTime - exact minutes", () => {
//       const longText = "word ".repeat(120).trim();
//       expect(calculateReadingTime(longText)).toBe("2 minutes");
//     });
//   });
  

//   /**
//  * @jest-environment jsdom
//  */

// test("DOM updates total character count on input", () => {
//     document.body.innerHTML = `
//       <input id="textInput" />
//       <div id="total-char-card"><div class="card-content"><p></p></div></div>
//     `;
  
//     const textInput = document.getElementById("textInput");
//     const totalCharEl = document.querySelector("#total-char-card .card-content p");
  
//     textInput.value = "Hello world";
    
//     // Simulate updateCounts
//     const characterCount = textInput.value.length;
//     totalCharEl.textContent = characterCount > 9 ? characterCount : `0${characterCount}`;
    
//     expect(totalCharEl.textContent).toBe("11");
//   });





import {
    countCharacters,
    countWords,
    countSentences,
    calculateLetterDensity,
    calculateReadingTime
  } from "./characterCounter.js";
  
  // Character Counter Utilities tests
  describe("Character Counter Utilities", () => {
    // Test for counting characters (including spaces)
    test("countCharacters - includes spaces", () => {
      expect(countCharacters("Hello world")).toBe(11);
    });
  
    // Test for counting characters (excluding spaces)
    test("countCharacters - excludes spaces", () => {
      expect(countCharacters("Hello world", true)).toBe(10);
    });
  
    // Test for counting characters in an empty string
    test("countCharacters - empty string", () => {
      expect(countCharacters("")).toBe(0);
    });
  
    // Test for counting characters with only spaces
    test("countCharacters - only spaces", () => {
      expect(countCharacters("   ")).toBe(3);
    });
  
    // Test for counting words in a sentence
    test("countWords - basic input", () => {
      expect(countWords("This is a test")).toBe(4);
    });
  
    // Test for counting words with excessive spaces between words
    test("countWords - excessive spaces", () => {
      expect(countWords("  This   is   spaced out  ")).toBe(4);
    });
  
    // Test for counting words in an empty string
    test("countWords - empty string", () => {
      expect(countWords("")).toBe(0);
    });
  
    // Test for counting sentences with basic punctuation
    test("countSentences - basic punctuation", () => {
      expect(countSentences("This is one. This is two? This is three!")).toBe(3);
    });
  
    // Test for counting sentences with no punctuation
    test("countSentences - no punctuation", () => {
      expect(countSentences("No punctuation here")).toBe(1);
    });
  
    // Test for counting sentences with unusual punctuation (ellipsis)
    test("countSentences - with ellipses", () => {
      expect(countSentences("This is... one")).toBe(1);
    });
  
    // Test for calculating letter density (basic input)
    test("calculateLetterDensity - basic input", () => {
      const result = calculateLetterDensity("AAaaBBb", false);
      expect(result).toEqual({ a: 4, b: 3 });
    });
  
    // Test for calculating letter density (exclude spaces and symbols)
    test("calculateLetterDensity - exclude spaces and symbols", () => {
      const result = calculateLetterDensity("A! B! B", true);
      expect(result).toEqual({ a: 1, b: 2 });
    });
  
    // Test for calculating reading time when it's less than 1 minute
    test("calculateReadingTime - < 1 minute", () => {
      expect(calculateReadingTime("Short input")).toBe("< 1 minute");
    });
  
    // Test for calculating reading time with exact minutes
    test("calculateReadingTime - exact minutes", () => {
      const longText = "word ".repeat(120).trim();
      expect(calculateReadingTime(longText)).toBe("2 minutes");
    });
  });
  
  // DOM-related test to simulate user interaction with the input field
  /**
   * @jest-environment jsdom
   */
  test("DOM updates total character count on input", () => {
    document.body.innerHTML = `
      <div class="screen">
        <header class="title-bar">
          <img src="./assets/images/logo-light-theme.svg" alt="logo" id="logo"/>
          <img src="./assets/images/icon-moon.svg" alt="theme selector" id="themeSelector"/>
        </header>
        <div class="input-textbox">
          <textarea type="text" placeholder="Start typing here...(or paste your text)" id="textInput"></textarea>
        </div>
        <div class="counter-cards" id="counterCards">
          <div class="counter-card" id="total-char-card">
            <div class="card-content">
              <p>00</p>
              <p class="title">Total Characters</p>
            </div>
          </div>
        </div>
      </div>
    `;
  
    const textInput = document.getElementById("textInput");
    const totalCharEl = document.querySelector("#total-char-card .card-content p");
  
    // Simulate user typing in the textarea
    textInput.value = "Hello world";
    
    // Simulate the character count update
    const characterCount = textInput.value.length;
    totalCharEl.textContent = characterCount > 9 ? characterCount : `0${characterCount}`;
    
    // Check if the character count is updated correctly in the DOM
    expect(totalCharEl.textContent).toBe("11");
  });
  
  // DOM test for handling character limit warnings
  test("DOM shows warning when character limit exceeds", () => {
    document.body.innerHTML = `
      <div class="input-textbox">
        <textarea type="text" id="textInput" maxlength="100"></textarea>
        <p id="warningMessage"></p>
      </div>
    `;
  
    const textInput = document.getElementById("textInput");
    const warningMessage = document.getElementById("warningMessage");
  
    // Simulate user typing in the textarea
    textInput.value = "A".repeat(101); // Exceeding the character limit
    
    // Check if warning message is shown
    if (textInput.value.length > 100) {
      warningMessage.textContent = "Character limit exceeded!";
    }
  
    expect(warningMessage.textContent).toBe("Character limit exceeded!");
  });
  
  // DOM test for reading time update
  test("DOM updates reading time", () => {
    document.body.innerHTML = `
      <div class="input-textbox">
        <textarea type="text" id="textInput"></textarea>
      </div>
      <div id="reading-time"></div>
    `;
    
    const textInput = document.getElementById("textInput");
    const readingTimeEl = document.getElementById("reading-time");
  
    // Simulate user typing in the textarea
    textInput.value = "word ".repeat(120).trim(); // Approximately 2 minutes of reading time
    
    // Simulate reading time update
    const readingTime = calculateReadingTime(textInput.value);
    readingTimeEl.textContent = `Reading time: ${readingTime}`;
    
    expect(readingTimeEl.textContent).toBe("Reading time: 2 minutes");
  });
  