document.getElementById('check-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.trim();
    const resultsDiv = document.getElementById('results-div');
  
    if (!userInput) {
      alert("Please provide a phone number");
      return;
    }
  
    const validationResult = validatePhoneNumber(userInput);
    resultsDiv.textContent = validationResult;
  });
  
  document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('user-input').value = '';
    document.getElementById('results-div').textContent = '';
  });
  
  function validatePhoneNumber(input) {
    const validPattern = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  
    if (validPattern.test(input)) {
      return `Valid US number: ${input}`;
    } else {
      return `Invalid US number: ${input}`;
    }
  }
  