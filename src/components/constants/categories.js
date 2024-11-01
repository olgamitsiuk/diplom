export const CATEGORIES = [
    {
        name: "Guitars",
        nameStr: "guitar",
        image: "/storage/category/guitar.png",
        subCat: [
            {
                name: "Electroacoustic Guitars",
                nameStr: "electric-acoustic-guitar",
                img: '/storage/category/1/acoustic_gitar-50x50.png'
            },
            {
                name: "Electric Guitars",
                nameStr: "electric-guitar",
                img: '/storage/category/1/electric_gitar-50x50.png'
            },
            {
                name: "Classical Guitars",
                nameStr: "classical-guitar",
                img: '/storage/category/1/classic_gitar-50x50.png'
            },
            {
                name: "Bass Guitars",
                nameStr: "bass-guitar",
                img: '/storage/category/1/bass-gitar-50x50.png'
            },
            {
                name: "Guitar Accessories",
                nameStr: "accessories",
                img: '/storage/category/1/case_gitar-50x50.png'
            }
        ]
    },
    {
        name: "Keyboards",
        nameStr: "keyboard-instrument",
        image: "/storage/category/keyboard-instrument.png",
        subCat: [
            {
                name: "Digital Pianos and Organs",
                nameStr: "digital-piano",
                img: '/storage/category/1/piano-50x50.png'
            },
            {
                name: "Synthesizers",
                nameStr: "synthesizer",
                img: '/storage/category/1/synth-work-station-50x50.png'
            },
            {
                name: "MIDI Keyboards",
                nameStr: "midi-keyboard",
                img: '/storage/category/1/midi-klav-50x50.png'
            },
            {
                name: "Keyboard Instrument Equipment",
                nameStr: "equipment-keyboard",
                img: '/storage/category/1/keypad-stands-50x50.png'
            }
        ]
    },
    {
        name: "Percussion",
        nameStr: "percussion-instrument",
        image: "/storage/category/percussion-instrument.png",
        subCat: [
            {
                name: "Acoustic Drums",
                nameStr: "acoustic-percussion",
                img: '/storage/category/1/akusticheskie-udarnye-50x50.png'
            },
            {
                name: "Electronic Drums",
                nameStr: "electronic-percussion",
                img: '/storage/category/1/jelektronnye-udarnye-i-perkussija-50x50.png'
            },
            {
                name: "Cymbals",
                nameStr: "plates",
                img: '/storage/category/1/tarelki-50x50.png'
            },
            {
                name: "Accessories and Parts",
                nameStr: "accessories",
                img: '/storage/category/1/aksessuary-i-komplektujushhie-50x50.png'
            }
        ]
    },
    {
        name: "Wind Instruments",
        nameStr: "wind-instrument",
        image: "/storage/category/wind-instrument.png",
        subCat: [
            {
                name: "Harmonicas",
                nameStr: "harmonica",
                img: '/storage/category/1/gubnye-garmoshki-50x50.png'
            },
            {
                name: "Brass Instruments",
                nameStr: "brass-wind-instruments",
                img: '/storage/category/1/aksessuary1-50x50.png'
            },
            {
                name: "Wind Instrument Accessories",
                nameStr: "accessories",
                img: '/storage/category/1/aksessuary1-50x50.png'
            }
        ]
    },
    {
        name: "Equipment",
        nameStr: "equipment",
        image: "/storage/category/equipment.png",
        subCat: [
            {
                name: "Amplifiers, Combos, Cabinets",
                nameStr: "amplifiers-combo-cabinets",
                img: '/storage/category/1/amp_combo-150x100.png'
            },
            {
                name: "Effect Pedals and Processors",
                nameStr: "effect-pedals-and-processors",
                img: '/storage/category/1/pedal_effects-150x100.png'
            },
            {
                name: "Tuners and Metronomes",
                nameStr: "tuners-and-metronomes",
                img: '/storage/category/1/tuner_metronom-150x100.png'
            },
            {
                name: "Headphones and Microphones",
                nameStr: "headphones-and-microphones",
                img: '/storage/category/1/microfon-50x50.png'
            }
        ]
    }
];

export const findCategoryByName = (nameStr) => {
    return CATEGORIES.find(category => category.nameStr === nameStr);
};

export const findSubcategoryByName = (categoryNameStr, subcategoryNameStr) => {
    const category = findCategoryByName(categoryNameStr);
    return category?.subCat.find(subCat => subCat.nameStr === subcategoryNameStr);
};

export const getAllSubcategories = () => {
    return CATEGORIES.flatMap(category =>
        category.subCat.map(subCat => ({
            ...subCat,
            parentCategory: category.nameStr
        }))
    );
};