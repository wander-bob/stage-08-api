export const cardsWrapper = document.querySelector('.cards-wrapper');
export function createCard(data){
  data.forEach((note)=>{
    cardsWrapper.innerHTML += `<div class="card">
      <h2>${note.title}</h2>
      <p>${note.description}</p>
    </div>`
  })
}
