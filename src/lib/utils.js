//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function makeID(length=16) {
  //around 7e+27 possibilities with 16 characters
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  return result;
}