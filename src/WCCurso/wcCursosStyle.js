import { css } from "lit-element";

export default css`
.border-content3-01{
  background-color: White;
  border: 4px;
  border-color: #898888;
  border-style: solid;
  border-radius: 5px; 
}

.input-1{
  border: 2px;
  border-color: black;
  border-style: solid;
  border-radius: 10px; 
}
.border-content3{
  background-color: White;
  border: 4px;
  border-color: #898888;
  border-style: solid;
  border-radius: 5px; 
}
.container {
  position: relative;
}

.content {
  background-color: #3498db;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: center;
  position: relative;
}

.info {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  border-radius: 10px;
  opacity: 0;
  transition: opacity 0.3s, background-color 0.5s;
}

.content:hover {
  background-color: #2980b9;
}

.content:hover .info {
  display: block;
  opacity: 1;
}
.border-list{
  background-color: #50C393;
  border-color: #285E44;
  border-style: solid;
  border-radius: 10px;
}
.border-list2{
  background-color: white;
  border-color: #898888;
  border-style: solid;
  border-radius: 10px;
}

.w-33{
  width:33%
}

.rounder{
  background-color: white;
  border-radius: 50px;
  height:100px;
  width:100px;
}

.m-100{
  margin:100px;
}
.div-icon-border{
  background-color: #3498db; 
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
}

.border-50{
  border:1px solid black;
  border-radius:50px;
}
.bg-blue1{
  background-color:#265D80;
  transition:0.5s
}
.bg-blue1:hover{
  background-color:gray;
}
.w-5{
  width:5%
}
.w-15{
  width:15%;
}
`;