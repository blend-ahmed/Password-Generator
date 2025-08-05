function generatePassword(includeNums, includeLowercase, includeUppercase, includeSpecialChars, passLength) {
    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*-_';

    let characterPool = '';
    let password = '';

    if(includeNums)
        characterPool += numbers;
    if(includeLowercase)
        characterPool += lowercase;
    if(includeUppercase)
        characterPool += uppercase;
    if(includeSpecialChars)
        characterPool += specialChars;

    for (let i = 0; i < passLength; i++) {
    password += characterPool.charAt(Math.floor(Math.random() * characterPool.length));
    }

    checkPasswordStrength(password);

	return password;
}

function checkPasswordStrength(password) {
  const strengthBar = document.getElementById('strength-bar');
  const strengthText = document.getElementById('strength-text');

  if (!password) {
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = '#ECEEEF';
    strengthText.textContent = 'Strength: ';
    return;
  }

  const result = zxcvbn(password);
  const score = result.score;

  const colors = ['#e74c3c', '#e67e22', '#f1c40f', '#43df84ff', '#25a75bff'];
  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const widths = ['20%', '40%', '60%', '80%', '100%'];

  strengthBar.style.width = widths[score];
  strengthBar.style.backgroundColor = colors[score];
  strengthText.innerHTML = `Strength: <span style='color: ${colors[score]}; font-weight: bold;'>${labels[score]}</span>`;
}


const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const numbersCheckbox = document.getElementById('numbers-checkbox');
const lowercaseCheckbox = document.getElementById('lowercase-checkbox');
const uppercaseCheckbox = document.getElementById('uppercase-checkbox');
const specialCheckbox = document.getElementById('special-checkbox');
const lengthNumber = document.getElementById('length-number');
const lengthRange = document.getElementById('length-range');
const outputEl = document.getElementById('output-password');

const allCheckboxes = [numbersCheckbox, lowercaseCheckbox, uppercaseCheckbox, specialCheckbox];

allCheckboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const checkedCount = allCheckboxes.filter(c => c.checked).length;
    if (checkedCount === 0) {
      cb.checked = true;
    }
  });
});

let includeNums = numbersCheckbox.checked;
let includeLowercase = lowercaseCheckbox.checked;
let includeUppercase = uppercaseCheckbox.checked;
let includeSpecialChars = specialCheckbox.checked;
let passLength = Number(lengthNumber.value);

numbersCheckbox.addEventListener('change', function() {
    includeNums = this.checked;
    outputEl.textContent = generatePassword(includeNums, includeLowercase, includeUppercase, includeSpecialChars, passLength);
});
lowercaseCheckbox.addEventListener('change', function() {
    includeLowercase = this.checked;
    outputEl.textContent = generatePassword(includeNums, includeLowercase, includeUppercase, includeSpecialChars, passLength);
});
uppercaseCheckbox.addEventListener('change', function() {
    includeUppercase = this.checked;
    outputEl.textContent = generatePassword(includeNums, includeLowercase, includeUppercase, includeSpecialChars, passLength);
});
specialCheckbox.addEventListener('change', function() {
    includeSpecialChars = this.checked;
    outputEl.textContent = generatePassword(includeNums, includeLowercase, includeUppercase, includeSpecialChars, passLength);
});

lengthNumber.addEventListener('input', function() {
    lengthRange.value = this.value;
    passLength = Number(this.value);
});
lengthRange.addEventListener('input', function() {
    lengthNumber.value = this.value;
    passLength = Number(this.value);
});

outputEl.textContent = generatePassword(includeNums, includeLowercase, includeUppercase, includeSpecialChars, passLength);

copyBtn.addEventListener('click', function() {
    if (outputEl && outputEl.textContent) {
        navigator.clipboard.writeText(outputEl.textContent);
    }
});

generateBtn.addEventListener('click', function(){
    outputEl.textContent = generatePassword(includeNums, includeLowercase, includeUppercase, includeSpecialChars, passLength);
});
