/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

import { customAlphabet } from 'nanoid';
import dayjs from "dayjs";

//check for empty string
export function isEmpty(str) {
  return (!str || str.length === 0 || !str.trim());
}

//check for float 
export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// https://zelark.github.io/nano-id-cc/

export function nanoid16(){
  //~4 million years needed, in order to have a 1% probability of at least one collision.
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 16)();
}

export function nanoid32(){
  // ~107 billion years needed, in order to have a 1% probability of at least one collision.
  //nanoid() //=> "zTzQvWe5X0irVfJeQJ6GzS6DhGBux79c"
  let alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return customAlphabet(alphabet, 32)();
}

export function unixTime(){
  return dayjs().unix();
}

export function unixToDate(unix){
  return dayjs.unix(unix).format('DD/MM/YYYY h:m:s a');
}