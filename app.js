const usuariolist = document.querySelector('.lista-usuarios')
const addUsuario = document.querySelector('.add-usuario-form')
const nomeValue = document.getElementById('nome-value')
const celularValue = document.getElementById('celular-value')
const fotoValue = document.getElementById('foto-value')
const emailValue = document.getElementById('email-value')
const enderecoValue = document.getElementById('endereco-value')
const cidadeValue = document.getElementById('cidade-value')
const btnSubmit = document.getElementById('adicionar')
const btnUpdate = document.getElementById('atualizar')

let output = ''

const renderUsuario = (usuario) => {
    output = ''
    usuario.forEach(usuario => {
        output += `
        <div class="card" style="width: 18rem">
            <img class="card-img-top" src="${usuario.foto}" alt="icone">
            <div class="card-body" data-id=${usuario.id}>
              <h5 class="card-title">${usuario.nome}</h5>
                <p class="card-subtitle">${usuario.celular}</p>
                <p class="card-subtitle">${usuario.email}</p>
                <p class="card-subtitle">${usuario.endereco}</p>
                <p class="card-subtitle">${usuario.cidade}</p>
                <a href="#" class="card-link" id="editar-usuario">Editar</a>
                <a href="#" class="card-link" id="deletar-usuario">Deletar</a>
            </div>
        </div>
        `
    })
    usuariolist.innerHTML = output
}

const url = 'http://localhost:8080/contatos'

// Mostrar - ver lista de usuários
// método: GET

fetch(url)
    .then(res => res.json())
    .then(data => renderUsuario(data))

usuariolist.addEventListener('click', (e) => {
    e.preventDefault()
    let botaoDeletarSelecionado = e.target.id == 'deletar-usuario'
    let botaoEditarSelecionado = e.target.id == 'editar-usuario'

    let id = e.target.parentElement.dataset.id
    
    if(botaoDeletarSelecionado) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        } )
        .then(res => res.json())
        .then(() => location.reload())
    }

    if(botaoEditarSelecionado) {
        const parent = e.target.parentElement;
        let nomeContent = parent.querySelector('.card-title').textContent;
        let celularContent = parent.querySelector('.card-subtitle').textContent;
        let emailContent = parent.querySelector('.card-subtitle').textContent;
        let enderecoContent = parent.querySelector('.card-subtitle').textContent;
        let cidadeContent = parent.querySelector('.card-subtitle').textContent;

        nomeValue.value = nomeContent;
        celularValue.value = celularContent;
        emailValue.value = emailContent;
        enderecoValue.value = enderecoContent;
        cidadeValue.value = cidadeContent;

        btnUpdate.style.display = 'flex'
    }
    
    // Atualizar - atualizar infos novas
    // método: PUT

    btnUpdate.addEventListener('click', () => {
        const urlUpdate = `http://localhost:8080/contatos/${id}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            
            body: JSON.stringify({
                nome: nomeValue.value,
                celular: celularValue.value,
                email: emailValue.value,
                endereco: enderecoValue.value,
                cidade: cidadeValue.value
            })

        }

        fetch(urlUpdate, options)
            .then(response => response.json())
            .then(() => {
                location.reload()
            })
            .catch(error => console.error('Error:', error))
    })
})

// Criar - Inserir novos usuários
// método: POST

addUsuario.addEventListener('submit', (e) => {
    e.preventDefault()

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeValue.value,
            celular: celularValue.value,
            foto: fotoValue.value,
            email: emailValue.value,
            endereco: enderecoValue.value,
            cidade: cidadeValue.value,
        })
    })

    .then(res => res.json())
    .then(data => {
        const dataArray = []
        dataArray.push(data)
        renderUsuario(dataArray)
    })
    .catch(error => console.error('Error:', error))
})
