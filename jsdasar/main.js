// deklarasi variable menggunakan const sudah tidak direkomendasikan lagi

// deklarasi menggunakan const tidak bisa diubah
const fullName = 'Riky ridho pangestu';
document.writeln(fullName);
//fullName = 'Riky Ridho'; // ketika block ini dibuka maka akan terjadi error
document.write(fullName);

// deklarasi menggunakan let bisa diubah
let buah = 'Pisang';
document.writeln(buah);
buah = 'Nangka';
document.write(buah);

//scope pada var membingungkan karena tidak mengikat di local scope
//sehingga menyebabkan var bisa diakses dari luar scope
var x = 15;
if (true) {
  var x = 20;
  document.writeln(x);
}
document.writeln(x); //hasilnya 20 ketika menggunakan var

let y = 12;
if (true) {
  let y = 20;
  document.writeln(y);
}
document.writeln(y); // hasilnya 12 ketika menggunakan let

//prompt dan confirm
let makanan = prompt('kamu mau makan apa hari ini ?');
alert('Silahkan beli' + makanan);

let makan = confirm('apakah kamu sudah makan ?');
if (confirm) {
  alert('kamu kenyang');
} else {
  alert('kamu pasti lapar');
}

//elseif
let nilai = prompt('berapa nilai ujian anda?');

if (nilai > 90 && nilai <= 100) {
  alert('anda lulus dengan sangat baik');
} else if (nilai > 70 && nilai <= 90) {
  alert('anda lulus');
} else if (nilai > 0 && nilai <= 70) {
  alert('anda harus mengulang');
} else {
  alert('nilai yang anda masukkan salah');
}

//perulangan
for (let index = 1; index <= 10; index++) {
  document.write(` ${index}. Nama lengkap : ${fullName} <br>`);
}

//print at console
console.log(fullName);

//array
document.write(`<br> Hobi saya : <<br>`);
let hobis = ['membaca', 'menari', 'berenang', 'menyanyi', 'menonton'];
let id = 0;
hobis.forEach((hobi) => {
  id++;
  document.write(`${id}. ${hobi} <br>`);
});

//operator ternary
let a = true;
console.log(a == true ? 'Ini Muncul karena benar' : 'Ini Muncul karena salah');

//switch
let angka = prompt('masukkan angka 1-3');
switch (angka) {
  case '1':
    alert('anda memasukkan angka 1');
    break;
  case '2':
    alert('anda memasukkan angka 2');
    break;
  case '3':
    alert('anda memasukkan angka 3');
    break;
  default:
    alert('anda memasukkan angka yang salah');
}
