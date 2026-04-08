const express = require('express');
const app = express();

app.use(express.json());

let latestDonation = {
    id: "0",
    donator_name: "Sistem",
    amount: "Rp 0",
    message: "Server Render Berhasil Terhubung!"
};

// PINTU MASUK: Menerima Webhook dari Saweria
app.post('/saweria', (req, res) => {
    console.log("Ada donasi masuk:", req.body);
    const donasi = req.body;

    if (donasi && donasi.type === "donation" && donasi.data) {
        latestDonation = {
            id: donasi.data.id || Date.now().toString(),
            donator_name: donasi.data.donator_name || "Anonim",
            amount: "Rp " + (donasi.data.amount_raw || 0).toLocaleString('id-ID'),
            message: donasi.data.message || ""
        };
    }
    res.status(200).send("OK");
});

// PINTU KELUAR: Dibaca oleh Roblox
app.get('/get-donation', (req, res) => {
    res.json(latestDonation);
});

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log("Server berjalan di port " + listener.address().port);
});
