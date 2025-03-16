document.addEventListener("DOMContentLoaded", function () {
    fetch('items.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal memuat file items.dat");
            }
            return response.text();
        })
        .then(data => {
            // Memisahkan baris data
            const rows = data.split('\n').filter(row => row.trim() !== '');
            if (rows.length === 0) {
                document.getElementById('table-container').innerText = "Data kosong.";
                return;
            }
            
            // Baris pertama adalah header
            const headers = rows[0].split(',');
            const idIndex = headers.indexOf('item id');
            const namaIndex = headers.indexOf('item nama');

            if (idIndex === -1 || namaIndex === -1) {
                document.getElementById('table-container').innerText = "Kolom 'item id' atau 'item nama' tidak ditemukan.";
                return;
            }

            // Membuat elemen tabel
            let tableHtml = '<table>';
            tableHtml += '<thead><tr>';
            tableHtml += `<th>${headers[idIndex]}</th><th>${headers[namaIndex]}</th>`;
            tableHtml += '</tr></thead>';
            tableHtml += '<tbody>';

            // Looping data baris (skip header)
            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(',');
                // Pastikan data lengkap
                if (rowData.length <= Math.max(idIndex, namaIndex)) continue;
                tableHtml += '<tr>';
                tableHtml += `<td>${rowData[idIndex]}</td><td>${rowData[namaIndex]}</td>`;
                tableHtml += '</tr>';
            }
            tableHtml += '</tbody></table>';

            document.getElementById('table-container').innerHTML = tableHtml;
        })
        .catch(error => {
            document.getElementById('table-container').innerText = "Terjadi kesalahan: " + error.message;
        });
});
