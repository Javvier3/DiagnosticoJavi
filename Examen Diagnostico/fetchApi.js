const getUsers = () => {
    fetch("https://reqres.in/api/users")
    .then(res => res.json())
    .then(data => {
        
        let users = ""

        data.data.forEach(user => {
            users += `
                <tr>
                    <td>${user.id}</td>
                    <td><img src='${user.avatar}'/></td>
                    <td>${user.first_name}</td>
                    <td>${user.last_name}</td>
                    <td>${user.email}</td>
                    <td><button type='button' class='btn btn-primary' iduser='${user.id}' onclick='getUser()'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                        </svg>
                    </button>

                    <button type='button' class='btn btn-warning' data-bs-toggle="modal" data-bs-target="#personUpdate" iduser='${user.id}' onclick='getUserUpdate(${user.id})'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                        </svg>
                    </button>

                    <button type='button' class='btn btn-danger' iduser='${user.id}' onclick='deleteUser(${user.id})'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                    </td>
                </tr>
            `
        });

        document.getElementById('tbody').innerHTML = users
        console.log(data)
    })
}

const getUserUpdate = (idUser) =>{
    var myModal = new bootstrap.Modal(document.getElementById("personUpdate"), {});
    
    fetch('https://reqres.in/api/users/'+idUser)
    .then(res => res.json())
    .then(data =>{
        document.getElementById('idUser').value = res.id,
        document.getElementById('nameUpdate').value = res.first_name,
        document.getElementById('lastnameUpdate').value = res.last_name,
        document.getElementById('emailUpdate').value = res.email,
        document.getElementById('avatarUpdate').value = res.avatar
        console.log(data);

    })
}

const setNewUser = () =>{
    let user = {
        first_name: document.getElementById('name').value,
        last_name: document.getElementById('lastname').value,
        avatar:document.getElementById('avatar').value,
        email: document.getElementById('email').value
        
    }

    fetch('https://reqres.in/api/users',{
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res => res.json())
    .then(data => alert("El usuario \"" + data.first_name + "\" fue CREADO correctamente. \nFecha de creación: " + data.createdAt))
}

const updateUser = () =>{
    let user = {
        id: document.getElementById('idUser').value,
        first_name: document.getElementById('nameUpdate').value,
        last_name: document.getElementById('lastnameUpdate').value,
        email: document.getElementById('emailUpdate').value,
        avatar:document.getElementById('avatarUpdate').value
    }


    fetch('https://reqres.in/api/users/'+user.id,{
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res => res.json())
    .then(data => alert("El usuario \"" + data.first_name + "\" fue ACTUALIZADO correctamente"))
//    .then(data => console.log(data))
}

const deleteUser = (idUser) =>{

    fetch('https://reqres.in/api/users' + idUser,{
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
          }
        })
    .then(res => res.json())
    .then(data => console.log(data))
    alert("El usuario \"" + idUser + "\" fue ELIMINADO")
    console.log('Usuario '+idUser +' eliminado');
}