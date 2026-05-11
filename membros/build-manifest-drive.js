#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DRIVE_LINKS = path.resolve(__dirname, '../../drive-links.json');
const OUT_JSON = path.resolve(__dirname, 'manifest.json');
const OUT_JS = path.resolve(__dirname, 'manifest.js');

const NAME_OVERRIDES = {
  'A Bela e a Fera': 'A Bela e a Fera',
  'A Casa Magica da Gaby': 'A Casa Mágica da Gaby',
  'A Era do Gelo': 'A Era do Gelo',
  'A Pequena Sereia': 'A Pequena Sereia',
  'A Princesa Sofia': 'A Princesa Sofia',
  'Arca de Noe': 'Arca de Noé',
  'Arco Iris Boho': 'Arco-Íris Boho',
  'Astronauta Aquarelado': 'Astronauta Aquarelado',
  'Atletico Mineiro': 'Atlético Mineiro',
  'Bale dos Bichinhos': 'Balé dos Bichinhos',
  'Boneca Metoo Dool': 'Boneca Metoo',
  'Cha Revelacao': 'Chá Revelação',
  'Cha de Bebe': 'Chá de Bebê',
  'Eu amo o meu Tete - Menina': 'Eu Amo o Meu Tetê — Menina',
  'Eu amo o meu Tete - Menino': 'Eu Amo o Meu Tetê — Menino',
  'Hello Kit': 'Hello Kitty',
  'Margarida': 'Margarida (Flores)',
  'Minecraft - Menino': 'Minecraft — Menino',
  'Natal Cristao': 'Natal Cristão',
  'O Poderoso Chefinho': 'O Poderoso Chefinho',
  'O Rei Leao': 'O Rei Leão',
  'O Tempo Voa - Menino': 'O Tempo Voa — Menino',
  'Pascoa': 'Páscoa',
  'Unicornio Aquarelado': 'Unicórnio Aquarelado',
  'Up Altas Aventuras': 'Up - Altas Aventuras',
};

// Categorias usando nomes "bonitos" (chaves do drive-links.json)
const CATEGORIES = {
  princesas: ['A Bela e a Fera','A Pequena Sereia','A Princesa Sofia','As Princesas Disney','Frozen','Moana','Minnie Rosa','Minnie Aquarelada','Barbie','Boneca Metoo Dool','Mulher Maravilha','Margarida','Chuva de Amor','Jardim das Borboletas','Jardim das Fadas','Bosque Encantado Menina','Bosque Encantado Menino','Pop It','Cactos','Confeitaria','Arco Iris Boho','Moranguinho','Hello Kit','My Little Pony','Unicornio Aquarelado','Spirit','Bobbie Goods','Corujinha','Slime'],
  herois: ['Homem Aranha','The Flash','Super Mario','Sonic','Dragon Ball Z','Naruto','One Piece','Minecraft - Menino','Roblox Rosa','Playstation','Angry Birds','Blaze','Hot Wheels','Carrinhos','Carros','TikTok','Astronauta','Astronauta Aquarelado'],
  bebes: ['Cha de Bebe','Cha Revelacao','Batizado Menina','Batizado Menino','Minha Primeira Volta ao Sol','O Tempo Voa','O Tempo Voa - Menino','Eu amo o meu Tete - Menina','Eu amo o meu Tete - Menino','Elefantinho Azul','Elefantinho Rosa','Baby Shark Azul','Baby Shark Rosa','Dinossauro Baby','Abelhinha','Pinguim','Mini Beats','3 Palavrinhas','Bita no Safari','Galinha Pintadinha Rosa','Galinha Pintadinha Tradicional','Bolofofos','Bale dos Bichinhos'],
  classicos: ['Mickey','Safari do Mickey','A Casa Magica da Gaby','A Era do Gelo','Bob Esponja','Procurando Nemo','Toy Story','O Poderoso Chefinho','O Rei Leao','Up Altas Aventuras','Ursinho Pooh','Madagascar','Minions','Chapeuzinho Vermelho','Circo Azul','Circo Rosa','Fazendinha Azul','Fazendinha Rosa','Dinossauro Rosa','Safari','Fundo do Mar'],
  esportes: ['Futebol','Atletico Mineiro','Cruzeiro'],
  datas: ['Natal','Natal Cristao','Pascoa','Arraia','Arca de Noe'],
};

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function categoryFor(name) {
  for (const [cat, list] of Object.entries(CATEGORIES)) {
    if (list.includes(name)) return cat;
  }
  return 'outros';
}

const driveLinks = JSON.parse(fs.readFileSync(DRIVE_LINKS, 'utf8'));

const themes = Object.entries(driveLinks)
  .map(([rawName, driveUrl]) => ({
    id: slugify(rawName),
    name: NAME_OVERRIDES[rawName] || rawName,
    category: categoryFor(rawName),
    driveUrl,
  }))
  .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

const manifest = {
  generatedAt: new Date().toISOString(),
  themesCount: themes.length,
  categories: [
    { id: 'todas', label: 'Todas' },
    { id: 'princesas', label: 'Princesas & Boho' },
    { id: 'herois', label: 'Heróis & Aventura' },
    { id: 'bebes', label: 'Bebês & Chás' },
    { id: 'classicos', label: 'Clássicos & Filmes' },
    { id: 'esportes', label: 'Esportes' },
    { id: 'datas', label: 'Datas Especiais' },
    { id: 'outros', label: 'Outros' },
  ],
  themes,
};

fs.writeFileSync(OUT_JSON, JSON.stringify(manifest, null, 2));
fs.writeFileSync(OUT_JS, `window.KF_MANIFEST = ${JSON.stringify(manifest)};\n`);
console.log(`Manifest gerado com ${themes.length} temas (Drive links).`);
