import { readFile } from "node:fs/promises";

const packageUrl = new URL("../package.json", import.meta.url);
const packageJson = JSON.parse(await readFile(packageUrl, "utf8"));

if (!packageJson.dependencies?.["lucide-react"]) {
  throw new Error(
    "lucide-react debe declararse en dependencies porque @doscientos/ui lo importa internamente.",
  );
}

if (!packageJson.dependencies?.sileo) {
  throw new Error(
    "sileo debe declararse en dependencies porque @doscientos/ui lo usa para los toasts.",
  );
}

console.log("Las dependencias de producción de @doscientos/ui son válidas.");
