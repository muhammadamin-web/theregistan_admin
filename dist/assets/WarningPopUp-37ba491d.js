import{t as c,w as s,E as t}from"./index-1dc67d24.js";import{d as l}from"./index-082b27f3.js";const x=({deleteItem:n,warningDatas:a,logout:o,setIsTrue:e})=>{const i=c();return s.jsx("div",{className:"popUp__blur",onClick:p=>{p.target.classList.contains("popUp__blur")&&i(t(!1))},children:s.jsxs("div",{className:"popUp",children:[s.jsx("span",{className:"popUp__icon",children:s.jsx(l,{})}),s.jsx("h2",{className:"popUp__title",children:"Caution!"}),s.jsxs("span",{className:"popUp__texts",children:["Are you sure you are almost ",a.type,"? ",s.jsx("br",{})," ",a.warning]}),s.jsxs("div",{className:"popUp__btns",children:[s.jsx("button",{className:"popUp__btn popUp__btn--yes",onClick:p=>{p.preventDefault(),o&&o(),n&&n()},children:"yes"}),s.jsx("button",{className:"popUp__btn popUp__btn--no",onClick:()=>{e&&e(!1),i(t(!1))},children:"no"})]})]})})};export{x as W};
