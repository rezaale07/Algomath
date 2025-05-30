// ===== DATA SOAL =====
const questionsData = {
  single: {
    Trigonometri: {
      Easy: [
        { question: "Nilai dari sin 0° adalah...", answers: ["0", "1", "½", "∞"], correct: 0 },
        { question: "Nilai dari cos 90° adalah...", answers: ["1", "0", "½", "∞"], correct: 1 },
        { question: "Nilai dari tan 45° adalah...", answers: ["1", "0", "½", "∞"], correct: 0 },
        { question: "Nilai dari sin 30° adalah...", answers: ["½", " √3/2", "1", "0"], correct: 0 },
        { question: "Nilai dari cos 60° adalah...", answers: ["0", "½", "1", "√3/2"], correct: 1 },
        { question: "Nilai dari tan 0° adalah...", answers: ["1", "0", "∞", "-1"], correct: 1 },
        { question: "Perbandingan sisi depan dan miring disebut...", answers: ["tan", "cos", "sin", "sec"], correct: 2 },
        { question: "Perbandingan sisi samping dan miring disebut...", answers: ["tan", "cos", "sin", "sec"], correct: 1 },
        { question: "sin²x + cos²x = ...", answers: ["2", "0", "½", "1"], correct: 3 },
        { question: "Jika cos x = 1, maka x =", answers: ["90°", "0°", "45°", "180°"], correct: 1 }
      ],
      Medium: [
        { question: "Jika sin A = 3/5, maka cos A = ...", answers: ["4/5", "5/4", "9/25", "1/2"], correct: 0 },
        { question: "Nilai dari tan 60° adalah... ", answers: ["3", "1", "1/2", "2"], correct: 0 },
        { question: "ika sin x = ½ dan 0° < x < 180°, maka x = ... ", answers: ["30° dan 150°", "30° dan 60°", "90° dan 120°", "45° dan 135°"], correct: 0 },
        { question: "Nilai dari cos²30° adalah... ", answers: ["¾", "½", "3/4", "1/4"], correct: 2 },
        { question: "Jika tan x = sin x / cos x, dan sin x = 3/5, cos x = 4/5, maka tan x = ... ", answers: ["4/3", "5/4", "3/4", "5/3"], correct: 2 },
        { question: "Nilai dari sin 90° × cos 0° = ... ", answers: ["0", "1", "2", "½"], correct: 1 },
        { question: "Dalam segitiga siku-siku, panjang sisi depan sudut B adalah 8 dan sisi samping 6, maka tan B = ... ", answers: ["8/6", "3/4", "4/3", "6/8"], correct: 1 },
        { question: "Jika tan A = 1 dan A di kuadran I, maka nilai A adalah...", answers: ["90°", "30°", "60°", " 45°"], correct: 3 }
      ],
      Hard: [
        { question: "Jika sin A = 5/13, dan A di kuadran I, maka nilai tan A = ...", answers: ["5/12", "12/5", "13/5", "5/13"], correct: 0 },
        { question: "Nilai dari sin 2x jika sin x = 3/5 dan cos x = 4/5 adalah...", answers: ["24/25", "12/25", "24/50", "8/15"], correct: 0 },
        { question: "Jika tan A = √3 dan A di kuadran II, maka nilai sin A adalah...", answers: ["√3/2", "1/2", "√3/√(1+3)", " √3/2 (positif)"], correct: 3 },
        { question: "cos x = –½ dan x berada di kuadran III, maka nilai x = ...", answers: [" 120", "240°", "60°", " 150°"], correct: 1 },
        { question: "Jika sin x = –¾ dan x di kuadran IV, maka nilai cos x = ...", answers: ["√7/4", "5/4", "√(1 – 9/16)", "√7/8"], correct: 3 },
        { question: "Nilai dari tan 2x jika tan x = 1 adalah...", answers: ["2", "1", "∞", "0"], correct: 0 },
        { question: "Jika sin x = a dan cos x = b, maka rumus identitas tan x dalam a dan b adalah...", answers: ["a/b", "b/a", "a²/b²", "b²/a²"], correct: 0 },
        { question: "cos x = –√3/2 dan x di kuadran III, maka nilai x = ...", answers: ["210°", "150°", "120°", "240°"], correct: 3 },
        { question: "Nilai dari sin 2x jika sin x = 3/5 dan cos x = 4/5 adala...", answers: ["135°", "45°", "225°", "315°"], correct: 0 },
        { question: "Jika sin A = x dan cos A = y, maka nilai sin 2A = ...", answers: ["2xy", "x² + y²", "x/y", "xy"], correct: 0 }
      ]
    },
    "Peluang Kejadian": {
      Easy: [
        { question: "Sebuah dadu dilempar sekali. Peluang muncul angka genap adalah...", answers: ["1/2", "1/3", "2/3", "1/6"], correct: 0 },
        { question: "Sebuah koin dilempar sekali. Peluang muncul gambar adalah...", answers: ["1/4", "1/2", "3/4", "2/3"], correct: 1 },
        { question: "Peluang mendapatkan bilangan prima dari angka 1–10 adalah...", answers: ["4/10", "5/10", "6/10", "7/10"], correct: 2 },
        { question: "Dari angka 1 sampai 5, peluang memilih angka lebih dari 3 adalah...", answers: ["2/5", "3/5", "1/5", "4/5"], correct: 0 },
        { question: "Jika sebuah kartu diambil dari set kartu A–E, peluang memilih kartu B adalah...", answers: ["1/4", "1/5", "2/5", "1/2"], correct: 1 },
        { question: "Dari 10 siswa, 6 laki-laki dan 4 perempuan. Peluang memilih siswa perempuan adalah...", answers: ["2/5", "3/5", "4/10", "6/10"], correct: 2 },
        { question: "Dalam kantong ada 2 bola merah dan 3 bola biru. Peluang ambil bola merah adalah...", answers: ["2/3", "2/5", "3/5", "1/2"], correct: 1 },
        { question: "Sebuah spinner dibagi menjadi 4 bagian sama besar: A, B, C, D. Peluang jatuh di C adalah...", answers: ["1/3", "1/4", "1/2", "3/4"], correct: 1 },
        { question: "Sebuah angka dipilih dari 1 sampai 6. Peluang memilih angka ganjil adalah...", answers: ["1/2", "1/3", "2/3", "1/6"], correct: 0 },
        { question: "Dalam kantong terdapat 5 kelereng: 2 merah, 1 kuning, dan 2 biru. Peluang ambil biru adalah...", answers: ["1/5", "2/5", "3/5", "4/5"], correct: 1 }
      ],
      Medium: [
        { question: "Dalam satu kantong terdapat 3 bola merah, 2 bola kuning, dan 5 bola biru. Peluang mengambil bola kuning adalah...", answers: ["1/2", "1/5", "1/3", "2/10"], correct: 3 },
        { question: "Sebuah angka dipilih dari 1 sampai 20. Peluang angka yang dipilih adalah kelipatan 4 adalah...", answers: ["1/4", "1/5", "1/2", "3/10"], correct: 0 },
        { question: "Sebuah dadu dilempar 2 kali. Peluang total mata dadu sama dengan 7 adalah...", answers: ["1/12", "1/6", "1/36", "1/8"], correct: 1 },
        { question: "Peluang muncul angka 3 atau 5 pada dadu adalah...", answers: ["1/3", "2/6", "1/6", "1/2"], correct: 1 },
        { question: "Jika dua koin dilempar bersamaan, peluang keduanya muncul angka adalah...", answers: ["1/2", "1/3", "1/4", "2/4"], correct: 2 },
        { question: "Dalam satu kelas terdapat 12 siswa laki-laki dan 8 perempuan. Jika satu siswa dipilih acak, peluang memilih perempuan adalah...", answers: ["2/5", "2/3", "1/3", "4/5"], correct: 0 },
        { question: "Dalam satu kotak terdapat 10 kartu bernomor 1 sampai 10. Peluang mengambil kartu bernomor ganjil lebih dari 5 adalah...", answers: ["2/10", "3/10", "4/10", "1/5"], correct: 1 },
        { question: "Sebuah spinner memiliki 6 bagian: 3 hijau, 2 merah, dan 1 kuning. Peluang mengenai warna merah adalah...", answers: ["2/6", "1/3", "1/2", "1/6"], correct: 0 },
        { question: "Jika dua angka dipilih acak dari 1–5 tanpa pengulangan, peluang total angkanya genap adalah...", answers: ["1/2", "3/5", "2/5", "4/10"], correct: 0 },
        { question: "Sebuah kantong berisi 4 kelereng merah, 3 biru, dan 3 hijau. Peluang mengambil bola bukan merah adalah...", answers: ["6/10", "1/2", "3/5", "2/5"], correct: 2 }
      ],
      Hard: [
        { question: "Dari 5 siswa laki-laki dan 4 siswa perempuan, dipilih 2 siswa acak. Peluang keduanya perempuan adalah...", answers: ["1/6", "2/9", "1/9", "1/8"], correct: 2 },
        { question: "Sebuah dadu dilempar tiga kali. Peluang muncul angka 6 minimal satu kali adalah...", answers: ["91/216", "125/216", "1/6", "36/216"], correct: 0 },
        { question: "Dari 10 kartu bernomor 1–10, diambil 3 acak tanpa pengembalian. Peluang ketiganya genap adalah...", answers: ["1/30", "1/20", "2/15", "1/15"], correct: 3 },
        { question: "Dalam 1 kotak ada 4 bola merah, 3 hijau, 2 biru. Diambil 2 bola tanpa pengembalian. Peluang kedua bola beda warna adalah...", answers: ["42/72", "48/81", "52/81", "54/81"], correct: 3 },
        { question: "Sebuah kartu diambil dari satu set kartu remi standar (52 kartu). Peluang kartu tersebut adalah kartu hati atau kartu angka 10 adalah...", answers: ["16/52", "17/52", "13/52", "14/52"], correct: 0 },
        { question: "Dari 7 siswa, akan dipilih ketua dan wakil secara acak. Peluang A dan B terpilih sebagai ketua dan wakil (urutan penting) adalah...", answers: ["1/42", "2/42", "1/21", "2/21"], correct: 0 },
        { question: "Peluang memilih huruf vokal dari kata “MATEMATIKA” secara acak adalah...", answers: ["4/10", "5/10", "4/9", "3/10"], correct: 1 },
        { question: "Jika dua dadu dilempar, peluang jumlah mata dadu lebih dari 10 adalah...", answers: ["1/12", "1/18", "1/6", "1/9"], correct: 0 },
        { question: "Peluang terambil bola merah dari kotak berisi 2 merah, 3 hijau, dan 5 biru, kemudian hijau, tanpa dikembalikan...", answers: ["1/15", "1/12", "3/45", "3/33"], correct: 2 },
        { question: "Dari 6 pasang sepatu, diambil 2 sepatu secara acak. Peluang yang terambil adalah sepasang sepatu yang cocok adalah...", answers: ["1/12", "1/11", "1/15", "1/6"], correct: 1 }
      ]
    },
    "Statistika/Penyajian Data": {
      Easy: [
        { question: "Rata-rata dari 5, 7, 9, 6, 8 adalah...", answers: ["7", "6.5", "7.5", "8"], correct: 0 }
        // Tambahkan sisa soal
      ]
      // Tambahkan Medium dan Hard jika ada
    }
  },
  multiplayer: {
    fun: {
      easy: [
        { question: "Jika 2 + 2 = 4, berapa 3 + 3?", answers: ["6", "9", "5", "7"], correct: 0 },
        { question: "Apa yang selalu bertambah tetapi tidak pernah berkurang?", answers: ["Umur", "Uang", "Tinggi", "Berat"], correct: 0 },
        { question: "Berapa banyak huruf dalam kata 'MATEMATIKA'?", answers: ["10", "9", "8", "11"], correct: 0 },
        { question: "Jika hari ini Senin, apa 3 hari yang lalu?", answers: ["Jumat", "Sabtu", "Minggu", "Kamis"], correct: 1 },
        { question: "Berapa menit dalam 2 jam?", answers: ["120", "90", "100", "150"], correct: 0 }
      ],
      medium: [
        { question: "Jika 5 orang membangun rumah dalam 8 hari, berapa hari yang dibutuhkan 10 orang?", answers: ["4", "6", "3", "5"], correct: 0 },
        { question: "Berapakah hasil dari 25% dari 200?", answers: ["50", "75", "25", "100"], correct: 0 },
        { question: "Jika x + 5 = 12, berapakah nilai x?", answers: ["7", "8", "6", "5"], correct: 0 }
      ],
      hard: [
        { question: "Jika 3x + 2 = 14, berapakah nilai x?", answers: ["4", "5", "3", "6"], correct: 0 },
        { question: "Berapakah akar kuadrat dari 144?", answers: ["12", "14", "10", "16"], correct: 0 },
        { question: "Jika harga barang naik 20% kemudian turun 20%, apakah harganya sama dengan semula?", answers: ["Tidak", "Ya", "Tergantung harga awal", "Tidak bisa ditentukan"], correct: 0 }
      ]
    }
    // Tambahkan kategori multiplayer lain jika ada
  }
};