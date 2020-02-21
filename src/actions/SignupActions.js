import {
  PHONE_CHANGED,
  NAME_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  SNPASSWORD_CHANGED,
  SNEMAIL_CHANGED
 } from './types';

 export const signupphoneChanged = (text) => {
   return {
     type: PHONE_CHANGED,
     payload: text
   };
 };
 export const signupnameChanged = (text) => {
   return {
     type: NAME_CHANGED,
     payload: text
   };
 };
 export const signuppasswordConfirmChanged = (text) => {
   return {
     type: CONFIRM_PASSWORD_CHANGED,
     payload: text
   };
 };
 export const signuppasswordChanged = (text) => {
   return {
     type: SNPASSWORD_CHANGED,
     payload: text
   };
 };
 export const signupemailChanged = (text) => {
   return {
     type: SNEMAIL_CHANGED,
     payload: text
   };
 };
 export const signupUser = (text) => {
   return {
     type: SNEMAIL_CHANGED,
     payload: text
   };
 };
