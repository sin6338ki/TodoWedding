const { defaultTheme } = require("react-select");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            fontFamily: {
                MapoFlowerIsland: ["MapoFlowerIsland"],
                LOTTERIADDAG: ["LOTTERIADDAG"],
                GangwonEdu_OTFBoldA: ["GangwonEdu_OTFBoldA"],
                Hahmlet_Regular: ["Hahmlet-Regular"],
                SDSamliphopangche_Outline: ["SDSamliphopangche_Outline"],
                KCCChassam: ["KCCChassam"],
                Alegreya: ["Alegreya Sans"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};
