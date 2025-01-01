const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const resultDiv = document.getElementById("result");

function checkPalindrome(text) {
  const cleanedText = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

  return cleanedText === cleanedText.split("").reverse().join("");
}

checkBtn.addEventListener("click", () => {
  const inputValue = textInput.value;

  if (!inputValue.trim()) {
    alert("Please input a value");
    return;
  }

  const isPalindrome = checkPalindrome(inputValue);

  resultDiv.textContent = `${inputValue} is ${
    isPalindrome ? "a" : "not a"
  } palindrome`;
});