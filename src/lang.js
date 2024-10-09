let germanWords = []; // Kelimeler dizisini başlat

// JSON verisini yüklemek için bir fonksiyon
const langFromJSON = (url) => {
    return fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Problem: ${res.status}`);
            }
            return res.json();
        });
};

// JSON dosyasını yükle
langFromJSON('/lib/wordList/myWords.json')
    .then(data => {
        germanWords = data; // Veriyi sakla
    })
    .catch(err => {
        alert(`Hata: ${err.message}`); // Hata durumunda kullanıcıya bildir
    });

// Form submit olayı
document.getElementById('userForm').addEventListener("submit", function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engelle

    const searchWord = document.getElementById('userInput').value.toLowerCase(); // Kullanıcının aradığı kelimeyi al
    const divResult = document.getElementById('result');
    
    // Arama yap ve kelimeyi bul
    const foundWord = germanWords.find(word => word.german.toLowerCase() === searchWord); // `germanWords` yerine `searchWord` ile karşılaştır

    // Kelime bulunduysa, ekranda göster
    if (foundWord) {
        divResult.innerHTML = `<p class="text-red-500">${foundWord.turkish}</p>`; // Türkçe çeviriyi göster
    } else {
        divResult.innerHTML = `<p class="text-red-500">Kelime bulunamadı. Lütfen tekrar deneyin.</p>`; // Hata mesajı
    }
});
