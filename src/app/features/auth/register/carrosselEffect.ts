/*
 * executa o efeito de Carrossel no html [UH1]
 */
export default function carrosselEffect() {
  // captura os elementos html
  const cards = document.getElementsByClassName("card");
  const circles = document.getElementsByClassName("circle");

  // index card do carrossel
  var cardIndex : number = 0;

  // tempo entre os slides
  var duration: number = 3000;

  // configura intervalo entre as ações
  setInterval(() => {

    // caso não esteja no último card, passa para o próximo, se não, volta para o início
    if (cardIndex < cards.length - 1) {
      cardIndex++;
    }
    else {
      cardIndex = 0;
    }

    // manipula estilos de cada componente html
    for (var i = 0; i < cards.length; i++) {
      // trasnlata os cards para efeito slide
      cards.item(i)?.setAttribute("style", `transform: translateX(-${cardIndex * 100}%);`);

      // adiciona foco ao circulo do card atual e remove os demais
      if (cardIndex == i) {
        circles.item(i)?.classList.add("focus")
      }
      else {
        circles.item(i)?.classList.remove("focus")
      }
    }
  }, duration);
}