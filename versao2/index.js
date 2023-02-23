class Imc {
  
  calculaImc(){
    
    const nome = document.querySelector(".nome").value;
    const peso = document.querySelector(".peso").value;
    const altura = document.querySelector(".altura").value;
    const resultDom = document.querySelector(".result");


    const dataIsValid = this.validaDados(nome,peso,altura);

    if(!dataIsValid){
     return;
    }else{
    
      const imc = parseInt((peso / (altura * altura)));
      const calculedImc = this.validaImc(nome,imc);

     
      //mandar para localStorage.
      this.sendLocalStorage(calculedImc);
      this.updateFront()

      document.querySelector(".nome").value = "";
      document.querySelector(".peso").value = "";
      document.querySelector(".altura").value = "";
    }
   

  }

  validaDados(nome,peso, altura){
    const messages = document.querySelector(".messages");

     if(nome == "" || !isNaN(nome)){
         messages.innerHTML =  "nome inválido";
         this.clearMessages(messages)
        return false;
     } else  if(isNaN(altura) || altura == ""){
         messages.innerHTML =  "altura inválida";
         this.clearMessages(messages)
         return false;
     } else  if(isNaN(peso) || peso == ""){
         messages.innerHTML = "peso inválido";
         this.clearMessages(messages)
         return false; 
     } 

     return true;
  }

  validaImc(nome,imc){
    if(imc < 18){
      return  `${nome} você está abaixo do peso`
     }else if(imc > 18 &&  imc < 25){
      return `${nome} você está no peso normal`
     }else if(imc > 25 &&  imc < 29){
      return `${nome} você está em sobre peso`
     }else if(imc > 30 &&  imc < 34){
      return `${nome} você está em obeso grau 1`
     }else if(imc > 35 &&  imc < 39){
      return `${nome} você está em obeso grau 2`
     }else if(imc > 40){
      return `${nome} você está em obeso grau 3`
     }
  
    }

    clearMessages(messages){
      setTimeout(() =>{
        messages.innerHTML = "";
      },3000)
    }

    //mandando pro localStorage ]
    sendLocalStorage(data){
     const recentData = this.getLocalStorage("imc");
     recentData.push({result:data});
       localStorage.setItem("imc",JSON.stringify(recentData));
    }
  
    getLocalStorage(local){
     const dataLocal = JSON.parse(localStorage.getItem(local)) ?? [];
     return dataLocal;
    }

    //pegando do localStorage e mandandando para o front;
    sendToFront(data){
      document.querySelector(".container__results").innerHTML = ""

      data.forEach(result => this.createResult(result));
    }

    createResult(result){
      const containerResults = document.querySelector(".container__results");
      const newResult = document.createElement("p");
      newResult.innerHTML = `
      <p class="result">${result.result}</p>
      `
      containerResults.prepend(newResult);


    }

    updateFront(){
      const dataLocal = this.getLocalStorage("imc");

      if(dataLocal.length > 5){
       const teste =  dataLocal.splice(dataLocal.length - 6,dataLocal.length)
        console.log(dataLocal.length)
        document.querySelector(".container__results").innerHTML = ""
        teste.forEach(result => this.createResult(result)); 
      }else{
        document.querySelector(".container__results").innerHTML = ""
        dataLocal.forEach(result => this.createResult(result));
      }
    }

    clearStorage(){
      localStorage.setItem("imc","[]")
      this.updateFront()
    }

  }


  const myImc = new Imc();

  myImc.updateFront()
  const btnCalc = document.querySelector(".btn__calc");
  const btnClear = document.querySelector(".btn__clear");

  btnCalc.addEventListener("click", () =>{ 
    myImc.calculaImc()
  });
  btnClear.addEventListener("click", () =>{ 
    myImc.clearStorage()
  });
