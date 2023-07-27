
function processEmails(file) {
    const validEmails = [];
    const invalidEmails = [];
  
    const reader = new FileReader();
  
    reader.onload = function (e) {
      const csvData = e.target.result;
      const lines = csvData.split(/\r\n|\n/);
  
      // Email validation regex pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      for (let i = 1; i < lines.length; i++) {
        const email = lines[i].trim();
        
        if (emailPattern.test(email)) {
          validEmails.push(email);
        } else {
          invalidEmails.push(email);
        }
      }
  
      displayEmails(validEmails, 'validEmailList');
      displayEmails(invalidEmails, 'invalidEmailList');
    };
  
    reader.readAsText(file);
  }
  
  function displayEmails(emails, elementId) {
    const emailListElement = document.getElementById(elementId);
    emailListElement.innerHTML = '';
  
    emails.forEach(function (email) {
      const listItem = document.createElement('li');
      listItem.textContent = email;
      emailListElement.appendChild(listItem);
    });
  }
  
  document.getElementById('csvFile').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.csv')) {
      processEmails(file);
    } else {
      alert('Please select a valid CSV file.');
    }
  });
   