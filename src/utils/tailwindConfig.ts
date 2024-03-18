import resolveConfig from "tailwindcss/resolveConfig";
//@ts-ignore
import tailwindCfg from "../../tailwind.config.js";

const tailwindConfig = resolveConfig(tailwindCfg);

export default tailwindConfig;

export const tailwindColors = tailwindConfig.theme.colors;
