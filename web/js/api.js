
const url = 'http://localhost:3000'

const options = {
  method: 'GET',
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  }
};
export async function readNotes(){
  const data = await fetch(`${url}/notes/list`, options)
  .then(data => {return data.json()})
  .then(result => {return result;})
  .catch(error => {console.log(error);});
  return data;
}
