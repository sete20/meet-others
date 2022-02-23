/*jshint esversion: 9 */
import * as store from './store.js';
export const uiUpdatePersonalCode = (code) => {
      document.getElementById('personal_code_paragraph').innerHTML = code;
      
};