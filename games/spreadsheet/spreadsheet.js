
export function Init(){
  let html = "";
  html += `
   <table>
    <tr>
     <th> A </th><td> 1 </td>
    </tr>
    <tr>
     <th> B </th><td> 2 </td>
    </tr>
    <tr>
     <th> C </th><td> 3 </td>
    </tr>
   </table>
  `;
  document.body.innerHTML = html;
  let closeButton = document.createElement("button");
  closeButton.innerHTML = "Back";
  closeButton.addEventListener("click", AppClose);
  document.body.appendChild(closeButton);
  console.log("spreadsheet init();");
}

export function Close(){
  document.body.innerHTML = "";
  console.log("spreadsheet close();");
}
