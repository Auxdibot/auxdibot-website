import { Inter, Josefin_Sans, Josefin_Slab, Lato, Montserrat, Noto_Sans, Open_Sans, Oswald, Playfair_Display, Raleway, Roboto } from "next/font/google"

const lato = Lato({
    weight: "300",
    subsets: ["latin"],
    variable: "--font-lato"
  })
const raleway = Raleway({
    subsets: ["latin"],
    variable: "--font-raleway"
})
const josefinSans = Josefin_Sans({
    weight: "500",
    subsets: ["latin"],
    variable: "--font-josefin-sans"
})
const montserrat = Montserrat({
    weight: "300",
    subsets: ["latin"],
    variable: "--font-montserrat"
});
const openSans = Noto_Sans({
    weight: "300",
    subsets: ["latin"],
    variable: "--font-open-sans"
})
const roboto = Roboto({
    weight: "300",
    subsets: ["latin"],
    variable: "--font-roboto"
})
const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair-display"
})
const inter = Inter({
    weight: "300",
    subsets: ["latin"],
    variable: "--font-inter"
})
const josefinSlab = Josefin_Slab({
    subsets: ["latin"],
    variable: "--font-josefin-slab"
})
const oswald = Oswald({
    subsets: ["latin"],
    variable: "--font-oswald"
});
const fonts = {
    lato,
    raleway,
    josefinSans,
    montserrat,
    openSans,
    roboto,
    playfair,
    inter,
    josefinSlab,
    oswald
};
export default fonts;