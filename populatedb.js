#! /usr/bin/env node

console.log(
  'This script populates some test brands and fragrances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Brand = require("./models/brand");
const Fragrance = require("./models/fragrance");

const brands = [];
const fragrances = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createBrands();
  await createFragrances();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function brandCreate(index, name, description) {
  const brand = new Brand({ name, description });
  await brand.save();
  brands[index] = brand;
  console.log(`Added brand: ${name}`);
}

async function fragranceCreate(
  index,
  name,
  description,
  brand,
  number_in_stock,
  price
) {
  const fragrance = new Fragrance({
    name,
    description,
    brand,
    number_in_stock,
    price,
  });
  await fragrance.save();
  fragrances[index] = fragrance;
  console.log(`Added fragrancd: ${name}`);
}

async function createBrands() {
  console.log("Adding brands");
  await Promise.all([
    brandCreate(
      0,
      "Creed",
      "Creed is a French perfume house founded in 1760 by James Henry Creed. The brand is known for its luxurious and high-quality fragrances that are inspired by history and royalty."
    ),
    brandCreate(
      1,
      "Tom Ford",
      "Tom Ford is an American fashion designer and film director who launched his own fragrance line in 2006. The brand is known for its bold and sensual fragrances that are inspired by the designer’s personal style."
    ),
    brandCreate(
      2,
      "Chanel",
      "Chanel is a French fashion house founded in 1910 by Coco Chanel. The brand is known for its iconic and timeless fragrances that are inspired by the elegance and sophistication of Paris."
    ),
    brandCreate(
      3,
      "Versace",
      "Versace is an Italian luxury fashion company founded in 1978 by Gianni Versace. The brand is known for its bold and glamorous fragrances that are inspired by the Mediterranean."
    ),
    brandCreate(
      4,
      "Yves Saint Laurent",
      "Yves Saint Laurent is a French luxury fashion house founded in 1961 by Yves Saint Laurent and Pierre Bergé. The brand is known for its elegant and sophisticated fragrances that are inspired by Parisian chic."
    ),
    brandCreate(
      5,
      "Dior",
      "	Dior is a French luxury fashion house founded in 1946 by Christian Dior. The brand is known for its refined and timeless fragrances that are inspired by the French elegance."
    ),
  ]);
}

async function createFragrances() {
  console.log("Adding Fragrances");
  await Promise.all([
    fragranceCreate(
      0,
      "Aventus",
      "The bestselling men’s fragrance in the history of The House of Creed, Aventus celebrates strength, power, success and heritage. Sensual, audacious and contemporary, this rich and iconic Eau de Parfum combines tantalizing fruity head notes of apple, blackcurrant, pink pepper and bergamot with a complementary fresh and fruity heart of jasmine, pineapple and patchouli. Rounding off this bold and elegant men’s aftershave spray is a rich, woody base of oakmoss, cedarwood, birch and Creed’s signature ingredient, Ambroxan, for the ultimate olfactive experience.",
      brands[0],
      10,
      250
    ),
    fragranceCreate(
      1,
      "Green Irish Tweed",
      "Inspired by Olivier Creed's family couture legacy, Green Irish Tweed Eau de Parfum is a true fougère fragrance that is both aromatic and fresh. Evoking the lush green countryside of the Emerald Isle, freshly cut grass and a fresh sea breeze, this classic men’s fragrance is a clean and natural smelling scent, characterised by its dry, grassy, hay-like dry down. Refreshing head notes of lemon and verbena are perfectly cooled with a breath of invigorating peppermint. Layers of fresh, green geranium are pitched against fresh and aromatic lavender, while rich notes of cedarwood, sandalwood, oakmoss and ambroxan mingle together to leave a unique, long-lasting arboreal scent for him - a refreshing twist on a classic gentleman's fragrance.",
      brands[0],
      5,
      200
    ),
    fragranceCreate(
      2,
      "Silver Mountain Water",
      "A fragrance inspired by the exhilarating crispness of alpine air, Silver Mountain Water is a fresh and contemporary scent. With juicy citrus head notes and unfolding heart notes of tea and a salty ozonic note, this exhilarating perfume also draws on base notes of sandalwood and musks which leave an icy air of freshness to this uplifting and energizing unisex fragrance.",
      brands[0],
      7,
      220
    ),
    fragranceCreate(
      3,
      "Tobacco Vanille",
      "Opulent. Warm. Iconic. Tom Ford's affection for London inspired this scent, reminiscent of an English gentleman's club, redolent with spice. He reinvents a classic fragrance genre by adding creamy tonka bean, vanilla, cocoa, dry fruit accords and sweet wood sap for a modern, opulent, and almost heady impression that's all man, unless worn by a woman.",
      brands[1],
      3,
      294
    ),
    fragranceCreate(
      4,
      "Oud Wood",
      "Oud Wood envelops you in rare oud, exotic spices and cardamom then exposes its rich and dark blend of sensuality.",
      brands[1],
      5,
      294
    ),
    fragranceCreate(
      5,
      "Black Orchid",
      "Black Orchid is a rich blend of spice and darkness to revolve around you, to be closer, and closer to you. Unleash its perfect power -both rare and extraordinary.",
      brands[1],
      8,
      150
    ),
    fragranceCreate(
      6,
      "Neroli Portofino ",
      "Neroli Portofino is an aromatic, citrus fragrance that opens with top notes of Tunisian neroli, Italian bergamot, Sicilian lemon, mandarin, lavender, myrtle, rosemary and bitter orange. Middle notes are African orange blossom, jasmine, neroli and pitosporum; base notes are amber, ambrette seed and angelica.",
      brands[1],
      2,
      249
    ),
    fragranceCreate(
      7,
      "Chanel No. 5",
      "A timeless classic, Chanel No. 5 is a floral-aldehyde fragrance that has been around since 1921. It is a blend of jasmine, rose, ylang-ylang, iris, and vanilla.",
      brands[2],
      10,
      136
    ),
    fragranceCreate(
      8,
      "Allure Homme Sport",
      "A masculine and sporty fragrance, Allure Homme Sport is a woody aromatic scent that was launched in 2004. It is a blend of mandarin, neroli, cedar, tonka bean, and white musk.",
      brands[2],
      15,
      120
    ),
    fragranceCreate(
      9,
      "Coco Mademoiselle",
      "A feminine and sexy fragrance, Coco Mademoiselle is a floral oriental scent that was launched in 2001. It is a blend of orange, bergamot, jasmine, rose, patchouli, and vanilla.",
      brands[2],
      20,
      120
    ),
    fragranceCreate(
      10,
      "Bleu de Chanel",
      "A fresh and sophisticated fragrance, Bleu de Chanel is a woody aromatic scent that was launched in 2010. It is a blend of citrus, labdanum, ginger, sandalwood, and cedar.",
      brands[2],
      8,
      130
    ),
    fragranceCreate(
      11,
      "Versace Pour Homme",
      "Versace Pour Homme is a modern take on the classic aromatic fougere fragrance for men. Launched in 2008, this signature scent is perfect for the modern man: knowledgeable and confident, living in harmony with his natural surroundings with a dynamic and entrepreneurial spirit. The Versace Pour Homme man communicates his passionate character with this masculine aroma.	",
      brands[3],
      13,
      60
    ),
    fragranceCreate(
      12,
      "Versace Eros",
      "Versace Eros is a fragrance for a strong, passionate man, who is master of himself. It contains notes of mint oil, Italian lemon, green apple, tonka bean, geranium flower, vanilla, vetiver, moss, cedarwood.",
      brands[3],
      20,
      70
    ),
    fragranceCreate(
      13,
      "Versace Bright Crystal",
      "Versace Bright Crystal is a floral, fruity, musky fragrance designed for the modern woman. It was launched in 2006 and features top notes of pomegranate, yuzu, and frosted accord. Middle notes of peony and magnolia are followed by base notes of amber, musk, and red woods.",
      brands[3],
      15,
      50
    ),
    fragranceCreate(
      14,
      "Versace Dylan Blue",
      "Versace Dylan Blue is a highly distinctive fougère fragrance that has a woody aroma. It was launched in 2016 and features top notes of Calabrian bergamot, grapefruit, and fig leaf. Middle notes of violet leaf, papyrus wood, and organic patchouli are followed by base notes of black pepper, ambrox, and musk.	",
      brands[3],
      5,
      80
    ),
    fragranceCreate(
      15,
      "Versace Crystal Noir",
      "Versace Crystal Noir is a floral, oriental fragrance that was launched in 2004. It features top notes of ginger, cardamom, and pepper. Middle notes of African orange flower, gardenia, and peony are followed by base notes of musk, sandalwood, and amber.	",
      brands[3],
      7,
      90
    ),
    fragranceCreate(
      16,
      "Black Opium",
      "Black Opium is a highly addictive feminine fragrance from Yves Saint Laurent. Fascinating and seductively intoxicating, the opening notes of adrenaline-rich coffee and the sweet sensuality of vanilla recline into the softness of white flowers for a modern, young, and vibrant interpretation of addiction.	",
      brands[4],
      24,
      92
    ),
    fragranceCreate(
      17,
      "Libre",
      "Libre is a floral fragrance for women from Yves Saint Laurent. It is a grand floral scent with a couture twist. The scent combines the French heritage of the brand with a daring and modern twist.",
      brands[4],
      15,
      66
    ),
    fragranceCreate(
      18,
      "Y",
      "Y is a masculine fragrance from Yves Saint Laurent. It is a fresh and modern scent that combines the freshness of bergamot and ginger with the strength of sage and balsam fir.",
      brands[4],
      7,
      65
    ),
    fragranceCreate(
      19,
      "La Nuit de L’Homme Bleu Electrique",
      "La Nuit de L’Homme Bleu Electrique is an electrifying version of an Eau de Toilette Intense. A flash of cool spices and aromatic notes, pulsing a dazzling beam of blue light into the night. A fresher, more intense take of the Eau de toilette based on a high-voltage blend of cardamom, ginger, geranium, and lavender.",
      brands[4],
      8,
      70
    ),
    fragranceCreate(
      20,
      "J'adore",
      "J’adore is a modern, glamorous fragrance, which has become incredibly popular, and for that reason developed in number of variants of different concentrations. The perfume is ideal for evening wear and special occasions.	",
      brands[5],
      9,
      100
    ),
    fragranceCreate(
      21,
      "Miss Dior",
      "Miss Dior is a fresh and captivating fragrance, perfect for everyday wear. The fragrance is a chypre characterized by an instant and captivating charm.	",
      brands[5],
      14,
      85
    ),
    fragranceCreate(
      22,
      "Sauvage",
      "Dior Sauvage is a masculine fragrance by Christian Dior. The scent was launched in 2018 and the fragrance was created by perfumer François Demachy. The composition is characterized by a raw freshness, powerful and noble all at once.",
      brands[5],
      10,
      97
    ),
  ]);
}
