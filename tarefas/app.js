const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInserir button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensDB = []

btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}

texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})
async function validarLogin(){

  const nome=document.getElementById('nome').value
  const senha=document.getElementById('senha').value

  console.log(nome)

  if(nome==''||senha==''){
      alert('Preencha todos os campos')
      return false
  }

  try{
      const users=await fetch('http://localhost:5080/usuario')

      const listUsers=await users.json()

      let validaUsuario=false

      listUsers.forEach((user)=>{
          if(nome===user.nome&&senha===user.senha){
              alert('Usuário encontrado com sucesso!')
              localStorage.setItem("id",user.id)
              localStorage.setItem("nome",user.nome)
              localStorage.setItem("premium",user.premium)
              window.location.href = '../tela home/index.html'
              validaUsuario=true
          }
      }) 


      if(!validaUsuario){
          alert('Usuário não encontrado.')
      }
      

  }catch(error){
      alert('Erro ao acessar a API')
      console.error(error)
  }

}

async function capturarListaTarefas(){
    const responseApi = await fetch('http://localhost:5080/usuario')
    const listUsers = await responseApi.json()
console.log(listUsers)
    return (listUsers)
}


async function adicionarTarefa(){
  console.log('oi')
  const titulo = document.getElementById('textoInserir').value
  console.log(titulo)
}

capturarListaTarefas()

btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}

function setItemDB() {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  }

  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}

function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}

function loadItens() {

  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
}

function capturarItens(){
  async function capturarListaTarefas() {
    const responseApi = await fetch('http://localhost:5080/tarefas')
    const listTasks = await responseApi.json()
    console.log(listTasks)
    return (listTasks)
}
  console.log()
}
function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
  ul.appendChild(li)

  // if (status) {
  //   document.querySelector([data-si="${i}"]).classList.add('line-through')
  // } else {
  //   document.querySelector([data-si="${i}"]).classList.remove('line-through')
  // }

  texto.value = ''
}

function done(chk, i) {

  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }

  updateDB()
}

function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}

loadItens()