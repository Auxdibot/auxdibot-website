import { CardGradients } from "../types/CardGradients";

export const GradientTemplates: { [key in CardGradients as string]: (color1?: string, color2?: string) => string } = {
    "RADIAL": (color1, color2) =>  `radial-gradient(${color1 ?? '#000000'} 10%, ${color2 ?? '#000000'} 100%)`,
    "LINEAR": (color1, color2) =>  `linear-gradient(${color1 ?? '#000000'} 0%, ${color2 ?? '#000000'} 90%)`,
    "BACKGROUND": (color1, color2) =>  `linear-gradient(180deg, transparent, transparent 85%),radial-gradient(ellipse at top left, ${color1 ?? "#000000"}80, transparent 30%),radial-gradient(ellipse at top right, ${color1 ?? "#000000"}80, transparent 30%),radial-gradient(ellipse at center right, ${color2 ?? "#000000"}80, transparent 50%),radial-gradient(ellipse at center left, ${color2 ?? "#000000"}80, transparent 50%)`,
}
