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
                window.location.href = '../tarefas/index.html'
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

async function Cadastro(){

    
    
    const nome=document.getElementById('nome').value
    const email=document.getElementById('email').value
    const senha = document.getElementById('senha').value
    //const nascimento = document.getElementById('nascimento').value

        try {

            const perfil = {
                nome,
                email,
                senha
            }
            
            console.log(perfil)


            if (senha) {
                const url = 'http://127.0.0.1:5080/usuario'
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(perfil)
                }
    
    
                await fetch(url, options)
    
                alert("Contato Cadastrado com Sucesso !!");
    
                window.location.href = "index.html";
    
            }
    
        } catch (error) {
            console.error('Erro:', error);
            alert("Erro ao Cadastrar Contato!!");
        }

    }




const botao = document.getElementById('11')
botao.addEventListener('click', Cadastro)