// Fungsi untuk mengambil data dari API CRUD menggunakan metode GET
async function getData() {
  const url =
    'https://crudcrud.com/api/61ae706031aa49fa81d2b2e4bb6b0274/makanan';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    return [];
  }
}

// Ketika halaman dimuat, panggil fungsi getData dan tampilkan hasilnya
window.addEventListener('load', async () => {
  const data = await getData();
  if (data.length === 0) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = 'Tidak ada data yang ditemukan.';
    document.getElementById('makananList').appendChild(messageDiv);
  } else {
    data.forEach((makanan) => {
      const div = document.createElement('div');
      div.classList.add('makananItem');
      div.dataset.id = makanan._id;

      div.innerHTML = `
        <p>Nama: ${makanan.nama}</p>
        <p>Deskripsi: ${makanan.deskripsi}</p>
        <p>Harga: ${makanan.harga}</p>
        <p>Rating: ${makanan.rating}</p>

        <!-- Tombol update dan delete -->
        <button class="updateButton">Update</button>
        <button class="deleteButton">Delete</button>
      `;

      document.getElementById('makananList').appendChild(div);
    });
  }
});

// Fungsi untuk menangani submit form
document
  .getElementById('makananForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = {
      nama: form.nama.value,
      deskripsi: form.deskripsi.value,
      harga: parseFloat(form.harga.value),
      rating: parseFloat(form.rating.value),
    };
    postData(formData);
  });

// Fungsi untuk mengirim data menggunakan metode POST
async function postData(data) {
  const url =
    'https://crudcrud.com/api/61ae706031aa49fa81d2b2e4bb6b0274/makanan';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    console.log(responseData);
    alert('Data makanan berhasil ditambahkan!');

    const div = document.createElement('div');
    div.classList.add('makananItem');
    div.dataset.id = responseData._id;

    div.innerHTML = `
      <p>Nama: ${responseData.nama}</p>
      <p>Deskripsi: ${responseData.deskripsi}</p>
      <p>Harga: ${responseData.harga}</p>
      <p>Rating: ${responseData.rating}</p>

      <!-- Tombol update dan delete -->
      <button class="updateButton">Update</button>
      <button class="deleteButton">Delete</button>
    `;

    document.getElementById('makananList').appendChild(div);

    // Reset form
    document.getElementById('makananForm').reset();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    alert('Terjadi kesalahan saat menambahkan data makanan');
  }
}

// Fungsi untuk memperbarui data menggunakan metode PUT atau PATCH
async function updateData(id, newData) {
  const url = `https://crudcrud.com/api/61ae706031aa49fa81d2b2e4bb6b0274/makanan/${id}`;
  try {
    const response = await fetch(url, {
      method: 'PUT', // atau 'PATCH' tergantung dari kebutuhan API Anda
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true; // Return true if update is successful
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    alert('Terjadi kesalahan saat memperbarui data makanan');
    return false; // Return false if update fails
  }
}

// Event listener for update buttons
document
  .getElementById('makananList')
  .addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('updateButton')) {
      // Handle update button click
      const makananItem = target.closest('.makananItem');
      const idToUpdate = makananItem.dataset.id; // Get the ID of the food item

      // Get existing data
      const nama = makananItem.querySelector('p:nth-of-type(1)').textContent;
      const deskripsi =
        makananItem.querySelector('p:nth-of-type(2)').textContent;
      const harga = parseFloat(
        makananItem.querySelector('p:nth-of-type(3)').textContent
      );
      const rating = parseFloat(
        makananItem.querySelector('p:nth-of-type(4)').textContent
      );

      // Populate the update form with existing data
      document.getElementById('updateNama').value = nama;
      document.getElementById('updateDeskripsi').value = deskripsi;
      document.getElementById('updateHarga').value = harga;
      document.getElementById('updateRating').value = rating;

      // Show the update form pop-up
      document.getElementById('updateFormContainer').style.display = 'block';

      // Handle form submission for update
      document
        .getElementById('updateMakananForm')
        .addEventListener('submit', async (event) => {
          event.preventDefault();
          // Get updated data from the form
          const updatedNama = document.getElementById('updateNama').value;
          const updatedDeskripsi =
            document.getElementById('updateDeskripsi').value;
          const updatedHarga = parseFloat(
            document.getElementById('updateHarga').value
          );
          const updatedRating = parseFloat(
            document.getElementById('updateRating').value
          );

          // Construct updated data object
          const newData = {
            nama: updatedNama,
            deskripsi: updatedDeskripsi,
            harga: updatedHarga,
            rating: updatedRating,
          };

          // Send update request to the server
          const isUpdated = await updateData(idToUpdate, newData);
          if (isUpdated) {
            // Hide the update form pop-up after successful update
            document.getElementById('updateFormContainer').style.display =
              'none';
            // Reload page to reflect updated data
            location.reload();
          }
        });

      // Handle cancel button click to hide the update form pop-up
      document
        .getElementById('cancelUpdateButton')
        .addEventListener('click', () => {
          document.getElementById('updateFormContainer').style.display = 'none';
        });
    }
  });

// Event listener for update buttons
document
  .getElementById('makananList')
  .addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('updateButton')) {
      // Handle update button click
      const makananItem = target.closest('.makananItem');
      const idToUpdate = makananItem.dataset.id; // Get the ID of the food item

      // Get existing data
      const nama = makananItem.querySelector('p.nama').textContent;
      const deskripsi = makananItem.querySelector('p.deskripsi').textContent;
      const harga = parseFloat(
        makananItem.querySelector('p.harga').textContent
      );
      const rating = parseFloat(
        makananItem.querySelector('p.rating').textContent
      );

      // Populate the update form with existing data
      document.getElementById('updateNama').value = nama;
      document.getElementById('updateDeskripsi').value = deskripsi;
      document.getElementById('updateHarga').value = harga;
      document.getElementById('updateRating').value = rating;

      // Show the update form pop-up
      document.getElementById('updateFormContainer').style.display = 'block';

      // Handle form submission for update
      document
        .getElementById('updateMakananForm')
        .addEventListener('submit', async (event) => {
          event.preventDefault();
          // Get updated data from the form
          const updatedNama = document.getElementById('updateNama').value;
          const updatedDeskripsi =
            document.getElementById('updateDeskripsi').value;
          const updatedHarga = parseFloat(
            document.getElementById('updateHarga').value
          );
          const updatedRating = parseFloat(
            document.getElementById('updateRating').value
          );

          // Construct updated data object
          const newData = {
            nama: updatedNama,
            deskripsi: updatedDeskripsi,
            harga: updatedHarga,
            rating: updatedRating,
          };

          // Send update request to the server
          const isUpdated = await updateData(idToUpdate, newData);
          if (isUpdated) {
            // Hide the update form pop-up after successful update
            document.getElementById('updateFormContainer').style.display =
              'none';
            // Reload page to reflect updated data
            location.reload();
          }
        });

      // Handle cancel button click to hide the update form pop-up
      document
        .getElementById('cancelUpdateButton')
        .addEventListener('click', () => {
          document.getElementById('updateFormContainer').style.display = 'none';
        });
    }
  });

// Fungsi untuk menghapus data menggunakan metode DELETE
async function deleteData(id) {
  const url = `https://crudcrud.com/api/61ae706031aa49fa81d2b2e4bb6b0274/makanan/${id}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    alert('Terjadi kesalahan saat menghapus data makanan');
    return false;
  }
}

// Event listener for delete buttons
document
  .getElementById('makananList')
  .addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('deleteButton')) {
      // Handle delete button click
      const makananItem = target.closest('.makananItem');
      const idToDelete = makananItem.dataset.id;
      const isDeleted = await deleteData(idToDelete);
      if (isDeleted) {
        alert('Data berhasil dihapus');
        makananItem.remove();
      }
    }
  });
