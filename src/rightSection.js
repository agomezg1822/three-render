import { title } from "./components/title";

const template = `
${title(1, "Comparativa de pies")}
<div> 
    <label for="fileInput">Seleccionar archivo:</label>
    <input type="file" id="fileInput" accept=".xlsx">
</div>
`;

const rightSection = document.createElement("section");
rightSection.innerHTML = template;

export { rightSection };
