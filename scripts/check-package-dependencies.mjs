import { readFile } from "node:fs/promises";

const packageUrl = new URL("../package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageUrl, "utf8"));

if (!packageJson.dependencies?.["@phosphor-icons/react"]) {
  throw new Error(
    "@phosphor-icons/react debe declararse en dependencies porque @doscientos/ui lo importa internamente.",
  );
}

console.log("Las dependencias de producción de @doscientos/ui son válidas.");