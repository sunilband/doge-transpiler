export let holyWords: any = {
    burger: "burmger",
    bad: "bamd",
    batman: "bamtman",
    cheese: "cheems",
    cheems: "cheems",
    cheeseburger: "cheemsburger",
    doge: "domge",
    female: "f*male",
    history: "himstory",
    nigger: "n-word",
    nigga: "n-word",
    retard: "remtard",
    woman: "w*man",
    women: "w*men",
    walter: "walmter",
    motherfucker: "momtherfumcker",
    gulabi:"gulambi",
    gulaabi:"gulaambi"
  };

  export const englishToCheems = (input: any) => {
    // sorry kimg but no line breakms
    input = input.replace(/(\r\n|\n|\r)/gm, " ");

    // Explode them words
    let words = input.split(" ");
    let cheemedinput = [];

    let symbols = [",", ".", ":", "!", "?", "&", "%", "/"];

    for (let i = words.length - 1; i >= 0; i--) {
      // Get rid of extra spaces
      let word = words[i].trim().toLowerCase();

      let needLastCharater = false;

      let lastChar = word.charAt(word.length - 1);

      if (symbols.includes(lastChar)) {
        word = word.slice(0, -1);
        needLastCharater = true;
      }

      // Handle basic plurals
      if (lastChar == "s") {
        let withoutS: any = word.slice(0, -1);

        if (holyWords[withoutS]) {
          word = holyWords[withoutS] + "s";
          cheemedinput[i] = word;
          continue;
        }
      }

      if (holyWords[word]) {
        word = holyWords[word];
      } else {
        word = cheemsAlgorithm(word);
      }

      if (needLastCharater) {
        word = word + lastChar;
      }

      cheemedinput[i] = word;
    }

    return cheemedinput.join(" ");
  };

  export const cheemsAlgorithm = (word: any) => {
    if (word.length < 4) {
      return word;
    }

    let vowels = ["a", "e", "i", "o", "u"];

    let vowelCount = word.match(/[aeiou]/gi);
    vowelCount = vowelCount === null ? 0 : vowelCount.length;

    let newWord = [];
    let addedM = false;
    let lastChar = word.charAt(word.length - 1);

    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);

      if (i > 0 && addedM == false) {
        if (
          vowelCount > 1 &&
          i == 1 &&
          vowels.includes(char) &&
          !vowels.includes(lastChar)
        ) {
          newWord[i] = char;
          continue;
        }

        let prev = word.charAt(i - 1);
        let next = word.charAt(i + 1);

        if (
          vowels.includes(char) &&
          next != "m" &&
          prev != "m" &&
          !vowels.includes(next)
        ) {
          char = char + "m";

          addedM = true;
        }
      }

      if (newWord[i] == undefined) {
        newWord[i] = char;
      }
    }console.log(newWord)
    return newWord.join("");
  };