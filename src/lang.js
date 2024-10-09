let germanWords = []; // Kelimeler dizisini başlat
let arrList = []

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
        // divResult.innerHTML = `<p class=" p-5 my-4 border border-solid border-cyan-700 text-center bg-black text-white shadow"> ${foundWord.german} ===>  ${foundWord.turkish}</p>`; // Türkçe çeviriyi göster

            arrList.push(foundWord)
            let output = '';
            arrList.forEach(word=>{
                if(arrList.length<=10){
                    output+= `<p class="w-1/6 p-5 my-4 border border-solid border-cyan-700 text-center bg-black text-white shadow"> ${word.german} ===>  ${word.turkish}</p>`
                }
                else{
                    output =`<p>10 taneden fazla yazılamaz</p>`
                }
            })
        
            divResult.innerHTML =output;
 
        
        

        
    } else {
        divResult.innerHTML = `<p class="text-red-500">Kelime bulunamadı. Lütfen tekrar deneyin.</p>`; // Hata mesajı
    }
});
