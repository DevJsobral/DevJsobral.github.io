const button1 = document.getElementById("Sobre");
const button2 = document.getElementById("Status");
const containerSobre = document.getElementById("infos");
const containerGraf = document.getElementById("infosGraf");


//Lógica para navegação entre os detalhes do pokemon
button1.addEventListener("click", () => {
    if (button2.classList.contains("ativo")) {
        button2.classList.remove("ativo")
        containerGraf.classList.add("sumir")
        containerSobre.classList.remove("sumir")
        button1.classList.add("ativo")
    } else {
        button1.classList.add("ativo")  
    }
  })
button2.addEventListener("click", () => {
    if (button1.classList.contains("ativo")) {
        button1.classList.remove("ativo")
        containerSobre.classList.add("sumir")
        containerGraf.classList.remove("sumir")
        button2.classList.add("ativo")    
    } else {
        button2.classList.add("ativo")  
    }
})
//Fim da lógica