function topla() {
    let sayi1 = document.getElementById("sayi1").value;
    let sayi2 = document.getElementById("sayi2").value;

    sayi1 = Number(sayi1)
    sayi2 = Number(sayi2)

    let toplam = sayi1 + sayi2

    document.getElementById("sonuc").textContent = "Sonuç :" + toplam
}

function carp() {
    let sayi1 = document.getElementById("sayi1").value;
    let sayi2 = document.getElementById("sayi2").value;

    sayi1 = Number(sayi1)
    sayi2 = Number(sayi2)

    let toplam = sayi1 / sayi2

    document.getElementById("sonuc").textContent = "Sonuç :" + toplam
}