// import  mammoth from "mammoth";
// import { writeFile } from "fs/promises";
// import { exec } from "child_process";
// mammoth.convertToHtml({ path: "/Users/alexrubio/Desktop/thurrock2/Thurrock-Council-Accessibility-Solutions/src/aform.docx" })
//     .then(function(result) {
//         var html = result.value; // The generated HTML
//         var messages = result.messages; // Any messages, such as warnings during conversion
//         console.log(html)
//         const filePath = "output.html";
//         writeFile(filePath, html);
//         console.log(`Output saved to ${filePath}`);
//     })
//     .catch(function(error) {
//         console.error(error);
//     });
let url = "https://services.thurrock.gov.uk/en/service/Business_rates___occupying_a_property"
let baba = await fetch(url)
  .then(response => response.text())
//   .then(html => {
//     document.body.innerHTML = html;
//     console.log(document.body.innerHTML)
//   })
  .catch(error => console.error('Error fetching the HTML:', error));

console.log(baba)