import { title } from "./components/title";

const template = `
${title(1, "Comparativa de pies")}
`;

const rightSection = document.createElement("section");
rightSection.innerHTML = template;

export { rightSection };
