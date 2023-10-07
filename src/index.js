
function onload() {}

function createMarkup(arr) {
  return arr
    .map(
      ({ name, id }) =>
        `
    <option id="${id}">${name}</option>
    `
    )
    .join('');
}
