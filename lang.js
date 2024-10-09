let germanWords = [];

// Veriyi yüklemek için getJSON fonksiyonunu kullanıyoruz
const getJSON = function(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something went wrong: ' + response.status);
      }
      return response.json();
    });
};

// Sayfa yüklendiğinde JSON dosyasını al
getJSON('https://raw.githubusercontent.com/Jonny-exe/German-Words-Library/master/German-words-5000-words.json')
  .then(data => {
    germanWords = data; // Veriyi sakla
  })
  .catch(err => {
    alert(err);
  });

  const translateWord = function(word, targetLang) {
    const apiKey = 'YOUR_API_KEY'; // Google Translate API anahtarınızı buraya ekleyin
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        q: word,
        target: targetLang,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => data.data.translations[0].translatedText)
      .catch(err => console.error('Error translating word:', err));
  };
  





// Formu ele al
document.getElementById('wordForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Formun otomatik yenilenmesini engelle
  
  const searchWord = document.getElementById('searchInput').value.toLowerCase(); // Aranan kelimeyi al ve küçük harfe çevir
  const resultDiv = document.getElementById('result');
  
  // Kelimeyi GermanWords listesinde ara
  const foundWord = germanWords.find(word => word.toLowerCase() === searchWord);

  if (foundWord) {
    resultDiv.innerHTML = `<p>Found: <strong>${foundWord}</strong></p>`;
  } else {
    resultDiv.innerHTML = `<p>Word not found!</p>`;
  }
});
