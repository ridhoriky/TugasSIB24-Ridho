const url = 'https://crudcrud.com/api/cf39b0d8e90744f181e723c3145b4c34/makanan';

// Fungsi untuk mengambil data dari API CRUD menggunakan metode GET
async function getData() {
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
          <img src="https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-carrot_1150-20212.jpg?t=st=1711517062~exp=1711517662~hmac=a1fe196c52da315e8b9002e1305e1b132fda73282b2033370122197974c576dc" alt="Makanan" />
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
        <img src="https://img.freepik.com/free-photo/crispy-fried-chicken-plate-with-salad-carrot_1150-20212.jpg?t=st=1711517062~exp=1711517662~hmac=a1fe196c52da315e8b9002e1305e1b132fda73282b2033370122197974c576dc" alt="Makanan" />
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
  const baseUrl = `${url}/${id}`;
  try {
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
    alert('Terjadi kesalahan saat memperbarui data makanan');
    return false;
  }
}

// Event listener tombol update
document
  .getElementById('makananList')
  .addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('updateButton')) {
      const makananItem = target.closest('.makananItem');
      const idToUpdate = makananItem.dataset.id;

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

      document.getElementById('updateNama').value = nama;
      document.getElementById('updateDeskripsi').value = deskripsi;
      document.getElementById('updateHarga').value = harga;
      document.getElementById('updateRating').value = rating;

      document.getElementById('updateFormContainer').style.display = 'block';

      document
        .getElementById('updateMakananForm')
        .addEventListener('submit', async (event) => {
          event.preventDefault();
          const updatedNama = document.getElementById('updateNama').value;
          const updatedDeskripsi =
            document.getElementById('updateDeskripsi').value;
          const updatedHarga = parseFloat(
            document.getElementById('updateHarga').value
          );
          const updatedRating = parseFloat(
            document.getElementById('updateRating').value
          );

          const newData = {
            nama: updatedNama,
            deskripsi: updatedDeskripsi,
            harga: updatedHarga,
            rating: updatedRating,
          };

          const isUpdated = await updateData(idToUpdate, newData);
          if (isUpdated) {
            document.getElementById('updateFormContainer').style.display =
              'none';
            location.reload();
          }
        });

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
      const makananItem = target.closest('.makananItem');
      const idToUpdate = makananItem.dataset.id;

      const nama = makananItem.querySelector('p.nama').textContent;
      const deskripsi = makananItem.querySelector('p.deskripsi').textContent;
      const harga = parseFloat(
        makananItem.querySelector('p.harga').textContent
      );
      const rating = parseFloat(
        makananItem.querySelector('p.rating').textContent
      );

      document.getElementById('updateNama').value = nama;
      document.getElementById('updateDeskripsi').value = deskripsi;
      document.getElementById('updateHarga').value = harga;
      document.getElementById('updateRating').value = rating;

      document.getElementById('updateFormContainer').style.display = 'block';

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

          const newData = {
            nama: updatedNama,
            deskripsi: updatedDeskripsi,
            harga: updatedHarga,
            rating: updatedRating,
          };

          const isUpdated = await updateData(idToUpdate, newData);
          if (isUpdated) {
            document.getElementById('updateFormContainer').style.display =
              'none';
            location.reload();
          }
        });

      document
        .getElementById('cancelUpdateButton')
        .addEventListener('click', () => {
          document.getElementById('updateFormContainer').style.display = 'none';
        });
    }
  });

// Fungsi untuk menghapus data menggunakan metode DELETE
async function deleteData(id) {
  const baseUrl = `${url}/${id}`;
  try {
    const response = await fetch(baseUrl, {
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

// Event listener tombol delete
document
  .getElementById('makananList')
  .addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('deleteButton')) {
      const makananItem = target.closest('.makananItem');
      const idToDelete = makananItem.dataset.id;
      const isDeleted = await deleteData(idToDelete);
      if (isDeleted) {
        alert('Data berhasil dihapus');
        makananItem.remove();
      }
    }
  });
