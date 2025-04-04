const BASE_URL = 'http://localhost:8000'

window.onload = async() => {
     await loadData()
}
const loadData = async() => {
    console.log('user page loaded')
    //1. load user ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`)
    console.log(response.data)
    const userDOM = document.getElementById('user')
    //2. นำ user ทั้งหมด โหลดกลับเข้าไปใน html
    
    // ตารางข้อมูล user จะแสดงข้อมูลทั้งหมดที่มีใน database
    let htmlData = `
  <table border="1" cellspacing="1" cellpadding="10">
      <thead>
          <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Interests</th>
              <th>Description</th>
              <th>Action</th>
          </tr>
      </thead>
      <tbody>
  `;

  for (let i = 0; i < response.data.length; i++) {
    let users = response.data[i];
    htmlData += ` 
      <tr>
          <td>${users.id}</td>
          <td>${users.firstname}</td>
          <td>${users.lastname}</td>
          <td>${users.age}</td>
          <td>${users.gender}</td>
          <td>${users.interests || '-'}</td>
          <td>${users.description || '-'}</td>
          <td>
          <a href="index.html?id=${users.id}"><button class='Edit'>Edit✏️</button></a>
          <button class="delete" data-id="${users.id}">Delete🗑️</button>
          </td>
      </tr>
    `;
  }

  htmlData += `
            </tbody>
        </table>
    `;
    userDOM.innerHTML = htmlData;
  // ตารางข้อมูล user จะแสดงข้อมูลทั้งหมดที่มีใน database(จบ)

    
    //3. ลบ user
    const deleteDOMs = document.getElementsByClassName('delete')
    for(let i = 0; i < deleteDOMs.length; i++) {
      deleteDOMs[i].addEventListener('click', async(event) => {
        //ดึง id ของ user ที่ต้องการลบ
        const id = event.target.dataset.id
        try{
            await axios.delete(`${BASE_URL}/users/${id}`)
            loadData() // recursive function = เรียกใช้ฟังก์ชันตัวเอง
        }catch (error) {
            console.log('error', error)
        }
    })
  }
}