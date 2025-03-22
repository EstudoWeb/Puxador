//Criado pelo Rodney (codiguin)
//Atenção não mecha no código, alto risco de nunca mais funcionar! KKKKKKK

let respostas = document.getElementById('local')
let terminalValues = document.getElementById('terminal')
let sendBut = document.getElementById('sendButton')
let pontos_premium = document.getElementById('PontosPremium')
let commando = ""
let localPos = 0
const points = VerificarPremium()

let localExato = {
  lat: 0,
  lon: 0
}

function VerificarPremium(){
  if(localStorage.getItem('PuxadasPremium')){
    let pontos = localStorage.getItem('PuxadasPremium')
    pontos_premium.innerHTML = `Seus pontos premium: ${pontos}`
    return(Number(localStorage.getItem('PuxadasPremium')))
  }else{
    return 0;
  }
}


terminalValues.focus()

const terminalCommands = [
  { 
    name: "cep",
    id: 1,
    command: "cep()"
  },
  {
    name: "ip",
    id: 2,
    command: "ip()" 
  },
  {
    name: "ddd",
    id: 3,
    command: "ddd()"
  },
  {
    name: "cnpj",
    id: 4,
    command: "cnpj()"
  },
  {
    name: "local",
    id: 5,
    command: "local()"
  },
  {
    name: "cordenadas",
    id: 6,
    command: "cordscep()"
  }
]

sendBut.addEventListener('click', function(){
  puxar()
})

const puxar = ()=>{
  respostas.innerHTML = `puxardados@site:~$ INVÁLIDO`
  for(i of terminalCommands){
    if(i.name == terminalValues.value.trim().toLowerCase() || i.id == terminalValues.value){
      eval(i.command)
      commando = i.command.replace(/[()]/g, "")
    }else if(terminalValues.value == "UnlockPaid_INFINITE"){
      localStorage.setItem('PuxadasPremium', Infinity)
      pontos_premium.innerHTML = `Seus pontos: ${localStorage.getItem('PuxadasPremium')}`
      respostas.innerHTML = `puxardados@site:~$ ADM ATIVADO ☠️!`
      terminalValues.value = ""
      setTimeout(function(){
        window.location.reload()
      }, 1200)
    }else if(terminalValues.value == "REZET_ADM"){
      localStorage.setItem('PuxadasPremium', 0)
      pontos_premium.innerHTML = `Seus pontos: ${localStorage.getItem('PuxadasPremium')}`
      respostas.innerHTML = `puxardados@site:~$ adm desativado ❌!`
      terminalValues.value = ""
      setTimeout(function(){
        window.location.reload()
      }, 1200)
    }
  }
}
function cep(){
  respostas.innerHTML = `puxardados@site:~$ <strong>${terminalValues.value.toUpperCase()}</strong>`
  respostas.innerHTML += `<br><br>Digite o valor para o CEP:`
  terminalValues.value = ""
  terminalValues.focus()
  sendBut.id = "sendButton2"
  prox("cep")
}
function ip(){
  if(points >= 1){
    respostas.innerHTML = `puxardados@site:~$ <strong>${terminalValues.value.toUpperCase()}</strong>`
    respostas.innerHTML += `<br><br>Digite o valor para o IP:`
    terminalValues.value = ""
    terminalValues.focus()
    sendBut.id = "sendButton2"
  prox("ip")
  }else{
    respostas.innerHTML = `puxardados@site:~$ sem premium`
  }
}
function ddd(){
  respostas.innerHTML = `puxardados@site:~$ <strong>${terminalValues.value.toUpperCase()}</strong>`
  respostas.innerHTML += `<br><br>Digite o valor para o DDD:`
  terminalValues.value = ""
  terminalValues.focus()
  sendBut.id = "sendButton2"
  prox("ddd")
}
function cnpj(){
  if(points >= 1){
    respostas.innerHTML = `puxardados@site:~$ <strong>${terminalValues.value.toUpperCase()}</strong>`
    respostas.innerHTML += `<br><br>Digite o valor para o CNPJ:`
    terminalValues.value = ""
    terminalValues.focus()
    sendBut.id = "sendButton2"
    prox("cnpj")
  }else{
    respostas.innerHTML = `puxardados@site:~$ sem premium`
  }
}
function local(){
  if(points >= 1){
    respostas.innerHTML = `puxardados@site:~$ <strong>${terminalValues.value.toUpperCase()}</strong>`
    respostas.innerHTML += `<br><br>Digite a latitude:`
    terminalValues.value = ""
    terminalValues.focus()
    sendBut.id = "sendButton2"
    prox("local")
  }else{
    respostas.innerHTML = `puxardados@site:~$ sem premium`
  }
}
function cordscep(){
  if(points >= 1){
    respostas.innerHTML = `puxardados@site:~$ <strong>${terminalValues.value.toUpperCase()}</strong>`
    respostas.innerHTML += `<br><br>Digite o CEP:`
    terminalValues.value = ""
    terminalValues.focus()
    sendBut.id = "sendButton2"
    prox("cordscep")
  }else{
    respostas.innerHTML = `puxardados@site:~$ sem premium`
  }
}
const prox = (method)=>{
  if(document.getElementById('sendButton2')){
    let sendBut2 = document.getElementById('sendButton2')
    terminalValues.placeholder = "Valor ou ('sair')"
    sendBut2.addEventListener('click', function(){
      consulta(method)
    })
  }
}
document.getElementById('terminal').addEventListener('keydown', function(event){
  if(event.key == "Enter"){
    if(sendBut.id == "sendButton2"){
      consulta(commando)
    }else{
    puxar()
    }
  }
})

const consulta = (method)=>{
  respostas.innerHTML = "puxardados@site:~$"
  if(method == 'cep'){
    if(terminalValues.value.toLowerCase() == "sair"){
      window.location.reload()
    }else{
    respostas.innerHTML += `<br> Consultando...`
    setTimeout(function(){
      if(terminalValues.value.replace(/\D/g, "").length == 8){
      respostas.innerHTML += `<br>Buscando informações em api...<br>`
      fetch(`https://viacep.com.br/ws/${terminalValues.value.replace(/\D/g, "")}/json/`)
      .then(res => res.json())
      .then(dados => {
        if(!dados.erro){
          respostas.innerHTML = "puxardados@site:~$ <br>"
          respostas.innerHTML += "<br><h3>Consultado com sucesso!</h3>"
          for(key in dados){
          respostas.innerHTML += `<code><br><strong>${key}</strong>: ${dados[key]}</code>`
          }
          respostas.innerHTML += "<br><br>"
        }else{
          respostas.innerHTML = "puxardados@site:~$ Cep não encontrado"
        }
      }).catch(error => {
        respostas.innerHTML = "puxardados@site:~$ Sem conexão com servidor!"
        console.error(error)
      })
    }else {
      respostas.innerHTML = "puxardados@site:~$ o cep deve ser igual a 8 números"
    }
    }, 700)
  }

  }else if(method == 'ip'){

    if(terminalValues.value.toLowerCase() == "sair"){
      window.location.reload()
    }else if(localStorage.getItem('PuxadasPremium') >= 1){
      localStorage.setItem('PuxadasPremium', localStorage.getItem('PuxadasPremium')-1)
      pontos_premium.innerHTML = `Seus pontos premium: ${localStorage.getItem("PuxadasPremium")}`
    respostas.innerHTML += `<br> Consultando...`
    setTimeout(function(){
      if(terminalValues.value.replace(/\D/g, "").length >= 4){
      respostas.innerHTML += `<br>Buscando informações em api...<br>`
      fetch(`https://corsproxy.io/?https://api.ip2location.io/?key=B8524D268FC4937AAAF34DEA7CE93BE8&ip=${terminalValues.value}`)
      .then(res => res.json())
      .then(dados => {
        if(!dados.error){
          respostas.innerHTML = "puxardados@site:~$ <br>"
          respostas.innerHTML += "<br><h3>Consultado com sucesso!</h3>"
          for(key in dados){
          respostas.innerHTML += `<code><br><strong>${key}</strong>: ${dados[key]}</code>`
          }
          respostas.innerHTML += "<br><br>"
        }else{
          respostas.innerHTML = "puxardados@site:~$ IP não encontrado"
        }
      }).catch(error => {
        respostas.innerHTML = "puxardados@site:~$ Sem conexão com servidor!"
        console.error(error)
      })
    }else {
      respostas.innerHTML = "puxardados@site:~$ o IP deve ter mais de 4 números"
    }
    }, 700)
  }else{
    respostas.innerHTML = "puxardados@site:~$ Seu premium acabou!"
  }

  }else if(method == 'ddd'){

    if(terminalValues.value.toLowerCase() == "sair"){
      window.location.reload()
    }else{
    respostas.innerHTML += `<br> Consultando...`
    setTimeout(function(){
      if(terminalValues.value.replace(/\D/g, "").length == 2){
      respostas.innerHTML += `<br>Buscando informações em api...<br>`
      fetch(`https://brasilapi.com.br/api/ddd/v1/${terminalValues.value}`)
      .then(res => res.json())
      .then(dados => {
        if(!dados.type){
          respostas.innerHTML = "puxardados@site:~$ <br>"
          respostas.innerHTML += "<br><h3>Consultado com sucesso!</h3>"
          for(key in dados){
          respostas.innerHTML += `<br><strong>${key}</strong>: ${String(dados[key]).replace(/,/g, "<br>")}`
          }
          respostas.innerHTML += "<br><br>"
        }else{
          respostas.innerHTML = "puxardados@site:~$ DDD não encontrado"
        }
      }).catch(error => {
        respostas.innerHTML = "puxardados@site:~$ Sem conexão com servidor!"
        console.error(error)
      })
    }else {
      respostas.innerHTML = "puxardados@site:~$ o DDD deve ter 2  números"
    }
    }, 700)
  }

  }else if(method == 'cnpj'){

    if(terminalValues.value.toLowerCase() == "sair"){
      window.location.reload()
    }else if(localStorage.getItem('PuxadasPremium') >= 1){
      localStorage.setItem('PuxadasPremium', localStorage.getItem('PuxadasPremium')-1)
      pontos_premium.innerHTML = `Seus pontos premium: ${localStorage.getItem("PuxadasPremium")}`
    respostas.innerHTML += `<br> Consultando...`
    setTimeout(function(){
      if(terminalValues.value.replace(/\D/g, "").length == 14){
      respostas.innerHTML += `<br>Buscando informações em api...<br>`
      fetch(`https://brasilapi.com.br/api/cnpj/v1/${terminalValues.value.replace(/\D/g, "")}`)
      .then(res => res.json())
      .then(dados => {
        if(!dados.type){
          respostas.innerHTML = "puxardados@site:~$ <br>"
          respostas.innerHTML += "<br><h3>Consultado com sucesso!</h3>"
          for(key in dados){
            if(typeof dados[key] === "object"){
              let textFilter = JSON.stringify(dados[key], null, 2).replace(/[{}\[\]\"\.]/g, "")
              respostas.innerHTML += `<br><strong>${key}</strong>: ${textFilter.replace(/,/g, "<br>")}<br>`
            }else{
          respostas.innerHTML += `<br><strong>${key}</strong>: ${dados[key]}`
            }
          }
          respostas.innerHTML += "<br><br>"
        }else{
          respostas.innerHTML = "puxardados@site:~$ CNPJ não encontrado"
        }
      }).catch(error => {
        respostas.innerHTML = "puxardados@site:~$ Sem conexão com servidor!"
        console.error(error)
      })
    }else {
      respostas.innerHTML = "puxardados@site:~$ o CNPJ deve ter 14 números"
    }
    }, 700)
  }else{
    respostas.innerHTML = "puxardados@site:~$ Seu premium acabou!"
  }


  }else if (method == 'local'){
    if(terminalValues.value.toLowerCase() == "sair"){
      window.location.reload()
    }else if(localStorage.getItem('PuxadasPremium') >= 1){
      if(localPos < 1){
        localPos+=1
        localExato.lat = terminalValues.value.trim()
        terminalValues.value = ""
        terminalValues.focus()
        respostas.innerHTML = `puxardados@site:~$ LAT: ${localExato.lat} <br> Digite a longitude:`
      }else{
        localStorage.setItem('PuxadasPremium', localStorage.getItem('PuxadasPremium')-1)
        pontos_premium.innerHTML = `Seus pontos premium: ${localStorage.getItem("PuxadasPremium")}`
        localExato.lon = terminalValues.value
        localPos-=1
        terminalValues.value = ""
        terminalValues.focus()
        respostas.innerHTML = `puxardados@site:~$ Consultando...`
        setTimeout(function(){
          respostas.innerHTML += `<br>Buscando informações em api...<br>`
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${localExato.lat}&lon=${localExato.lon}`)
          .then(res => res.json())
          .then(dados => {
            if(!dados.error){
              respostas.innerHTML = "puxardados@site:~$ <br>"
              respostas.innerHTML += "<br><h3>Consultado com sucesso!</h3>"
              for(key in dados){
                if(typeof dados[key] === "object"){
                  let textFilter = JSON.stringify(dados[key], null, 2).replace(/[{}\[\]\"\.]/g, "")
                  respostas.innerHTML += `<br><strong>${key}</strong>: ${textFilter.replace(/,/g, "<br>")}<br>`
                }else if(!(key == "place_id" || key == "licence" || key == "osm_id" || key == "place_rank")){
                  respostas.innerHTML += `<br><strong>${key}</strong>: ${dados[key]}`
                }
              }
              respostas.innerHTML += "<br><br>"
            }else{
              respostas.innerHTML = "puxardados@site:~$ Local não encontrado"
            }
          }).catch(error => {
            respostas.innerHTML = "puxardados@site:~$ Sem conexão com servidor!"
            console.error(error)
          })
        }, 700)
      }
    }else{
      respostas.innerHTML = "puxardados@site:~$ Seu premium acabou!"
    }

  }else if(method == "cordscep"){
    if(terminalValues.value.toLowerCase() == "sair"){
      window.location.reload()
    }else if(localStorage.getItem('PuxadasPremium') >= 1){
      localStorage.setItem('PuxadasPremium', localStorage.getItem('PuxadasPremium')-1)
      pontos_premium.innerHTML = `Seus pontos premium: ${localStorage.getItem("PuxadasPremium")}`
      respostas.innerHTML += `<br> Consultando...`
    setTimeout(function(){
      if(terminalValues.value.replace(/\D/g, "").length == 8){
      respostas.innerHTML += `<br>Buscando informações em api...<br>`
      fetch(`https://cep.awesomeapi.com.br/json/${terminalValues.value.replace(/\D/g, "")}`)
      .then(res => res.json())
      .then(dados => {
        if(!dados.erro){
          respostas.innerHTML = "puxardados@site:~$ <br>"
          respostas.innerHTML += "<br><h3>Consultado com sucesso!</h3>"
          respostas.innerHTML += `<code><br><strong>endereço</strong>: ${dados.address} <br><strong>bairro</strong>: ${dados.district}<br><strong>cidade</strong>: ${dados.city}<br><strong>latitude</strong>: ${dados.lat}<br><strong>longitude</strong>: ${dados.lng}</code>`
          respostas.innerHTML += "<br><br>"
        }else{
          respostas.innerHTML = "puxardados@site:~$ Cep não encontrado"
        }
      }).catch(error => {
        respostas.innerHTML = "puxardados@site:~$ Sem conexão com servidor!"
        console.error(error)
      })
    }else {
      respostas.innerHTML = "puxardados@site:~$ o cep deve ser igual a 8 números"
    }
    }, 700)
    }else{
      respostas.innerHTML = "puxardados@site:~$ Seu premium acabou!"
    }
  }else{
    console.log("Metodos inválidos!")
  }
}