#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.resolve(__dirname, '../../downloads/raw');
const OUT = path.resolve(__dirname, 'manifest.json');

const NAME_OVERRIDES = {
  'A_Bela_e_a_Fera': 'A Bela e a Fera',
  'A_Casa_Magica_da_Gaby': 'A Casa Mágica da Gaby',
  'A_Era_do_Gelo': 'A Era do Gelo',
  'A_Pequena_Sereia': 'A Pequena Sereia',
  'A_Princesa_Sofia': 'A Princesa Sofia',
  'Arca_de_Noe': 'Arca de Noé',
  'Arco_Iris_Boho': 'Arco-Íris Boho',
  'As_Princesas_Disney': 'As Princesas Disney',
  'Astronauta_Aquarelado': 'Astronauta Aquarelado',
  'Atletico_Mineiro': 'Atlético Mineiro',
  'Baby_Shark_Azul': 'Baby Shark Azul',
  'Baby_Shark_Rosa': 'Baby Shark Rosa',
  'Bale_dos_Bichinhos': 'Balé dos Bichinhos',
  'Batizado_Menina': 'Batizado Menina',
  'Batizado_Menino': 'Batizado Menino',
  'Bita_no_Safari': 'Bita no Safari',
  'Bob_Esponja': 'Bob Esponja',
  'Boneca_Metoo_Dool': 'Boneca Metoo',
  'Bosque_Encantado_Menina': 'Bosque Encantado Menina',
  'Bosque_Encantado_Menino': 'Bosque Encantado Menino',
  'Cha_Revelacao': 'Chá Revelação',
  'Cha_de_Bebe': 'Chá de Bebê',
  'Chapeuzinho_Vermelho': 'Chapeuzinho Vermelho',
  'Chuva_de_Amor': 'Chuva de Amor',
  'Circo_Azul': 'Circo Azul',
  'Circo_Rosa': 'Circo Rosa',
  'Dinossauro_Baby': 'Dinossauro Baby',
  'Dinossauro_Rosa': 'Dinossauro Rosa',
  'Dragon_Ball_Z': 'Dragon Ball Z',
  'Elefantinho_Azul': 'Elefantinho Azul',
  'Elefantinho_Rosa': 'Elefantinho Rosa',
  'Eu_amo_o_meu_Tete_-_Menina': 'Eu Amo o Meu Tetê — Menina',
  'Eu_amo_o_meu_Tete_-_Menino': 'Eu Amo o Meu Tetê — Menino',
  'Fazendinha_Azul': 'Fazendinha Azul',
  'Fazendinha_Rosa': 'Fazendinha Rosa',
  'Fundo_do_Mar': 'Fundo do Mar',
  'Galinha_Pintadinha_Rosa': 'Galinha Pintadinha Rosa',
  'Galinha_Pintadinha_Tradicional': 'Galinha Pintadinha Tradicional',
  'Hello_Kit': 'Hello Kitty',
  'Homem_Aranha': 'Homem-Aranha',
  'Hot_Wheels': 'Hot Wheels',
  'Jardim_das_Borboletas': 'Jardim das Borboletas',
  'Jardim_das_Fadas': 'Jardim das Fadas',
  'Margarida_(Flores)': 'Margarida (Flores)',
  'Minecraft_-_Menino': 'Minecraft — Menino',
  'Minha_Primeira_Volta_ao_Sol': 'Minha Primeira Volta ao Sol',
  'Mini_Beats': 'Mini Beats',
  'Minnie_Aquarelada': 'Minnie Aquarelada',
  'Minnie_Rosa': 'Minnie Rosa',
  'Mulher_Maravilha': 'Mulher Maravilha',
  'My_Little_Pony': 'My Little Pony',
  'Natal_Cristao': 'Natal Cristão',
  'O_Poderoso_Chefinho': 'O Poderoso Chefinho',
  'O_Rei_Leao': 'O Rei Leão',
  'O_Tempo_Voa': 'O Tempo Voa',
  'O_Tempo_Voa_-_Menino': 'O Tempo Voa — Menino',
  'One_Piece': 'One Piece',
  'Pop_It': 'Pop It',
  'Procurando_Nemo': 'Procurando Nemo',
  'Roblox_Rosa': 'Roblox Rosa',
  'Safari_do_Mickey': 'Safari do Mickey',
  'Super_Mario': 'Super Mario',
  'The_Flash': 'The Flash',
  'Toy_Story': 'Toy Story',
  'Unicornio_Aquarelado': 'Unicórnio Aquarelado',
  'Up_Altas_Aventuras': 'Up - Altas Aventuras',
  'Ursinho_Pooh': 'Ursinho Pooh',
  '3_Palavrinhas': '3 Palavrinhas',
  'Pascoa': 'Páscoa',
};

const CATEGORIES = {
  princesas: ['A_Bela_e_a_Fera','A_Pequena_Sereia','A_Princesa_Sofia','As_Princesas_Disney','Frozen','Moana','Minnie_Rosa','Minnie_Aquarelada','Barbie','Boneca_Metoo_Dool','Mulher_Maravilha','Margarida','Margarida_(Flores)','Chuva_de_Amor','Jardim_das_Borboletas','Jardim_das_Fadas','Bosque_Encantado_Menina','Bosque_Encantado_Menino','Pop_It','Cactos','Confeitaria','Arco_Iris_Boho','Moranguinho','Hello_Kit','My_Little_Pony','Unicornio_Aquarelado','Spirit','Bobbie_Goods','Corujinha','Slime'],
  herois: ['Homem_Aranha','Mulher_Maravilha','The_Flash','Super_Mario','Sonic','Dragon_Ball_Z','Naruto','One_Piece','Minecraft_-_Menino','Roblox_Rosa','Playstation','Angry_Birds','Blaze','Hot_Wheels','Carrinhos','Carros','TikTok','Astronauta','Astronauta_Aquarelado'],
  bebes: ['Cha_de_Bebe','Cha_Revelacao','Batizado_Menina','Batizado_Menino','Minha_Primeira_Volta_ao_Sol','O_Tempo_Voa','O_Tempo_Voa_-_Menino','Eu_amo_o_meu_Tete_-_Menina','Eu_amo_o_meu_Tete_-_Menino','Elefantinho_Azul','Elefantinho_Rosa','Baby_Shark_Azul','Baby_Shark_Rosa','Dinossauro_Baby','Abelhinha','Pinguim','Mini_Beats','3_Palavrinhas','Bita_no_Safari','Galinha_Pintadinha_Rosa','Galinha_Pintadinha_Tradicional','Bolofofos','Bale_dos_Bichinhos'],
  classicos: ['Mickey','Safari_do_Mickey','A_Casa_Magica_da_Gaby','A_Era_do_Gelo','Bob_Esponja','Procurando_Nemo','Toy_Story','O_Poderoso_Chefinho','O_Rei_Leao','Up_Altas_Aventuras','Ursinho_Pooh','Madagascar','Minions','Chapeuzinho_Vermelho','Circo_Azul','Circo_Rosa','Fazendinha_Azul','Fazendinha_Rosa','Dinossauro_Rosa','Safari','Fundo_do_Mar'],
  esportes: ['Futebol','Atletico_Mineiro','Cruzeiro'],
  datas: ['Natal','Natal_Cristao','Pascoa','Arraia','Arca_de_Noe']
};

function prettyName(slug) {
  if (NAME_OVERRIDES[slug]) return NAME_OVERRIDES[slug];
  return slug.replace(/_/g, ' ').replace(/-/g, ' - ');
}

function slugify(s) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => !f.startsWith('.'))
    .map(f => ({ name: f, path: path.join(dir, f) }))
    .filter(it => fs.statSync(it.path).isFile())
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { numeric: true }));
}

function collectPapelDigital(root) {
  // Returns { papeis: [], imagens: [] } handling either nested or flat layouts.
  const base = path.join(root, 'Papel Digital');
  if (!fs.existsSync(base)) return { papeis: [], imagens: [] };

  const nestedImg = path.join(base, 'imagens');
  const nestedPap = path.join(base, 'papeis');
  const hasNested = fs.existsSync(nestedImg) || fs.existsSync(nestedPap);

  if (hasNested) {
    return {
      imagens: listFiles(nestedImg),
      papeis: listFiles(nestedPap),
    };
  }
  // Flat layout — split by extension. JPGs → papéis (estampas), PNG/WEBP → imagens.
  const all = listFiles(base);
  const papeis = [], imagens = [];
  all.forEach(f => {
    const ext = path.extname(f.name).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg') papeis.push(f);
    else imagens.push(f);
  });
  return { papeis, imagens };
}

function rel(p) {
  // Relative path from /lp/membros/ to the file
  return path.relative(__dirname, p).split(path.sep).map(encodeURIComponent).join('/');
}

function categoryFor(slug) {
  for (const [cat, list] of Object.entries(CATEGORIES)) {
    if (list.includes(slug)) return cat;
  }
  return 'outros';
}

const slugs = fs.readdirSync(RAW_DIR)
  .filter(f => !f.startsWith('.') && fs.statSync(path.join(RAW_DIR, f)).isDirectory())
  .sort();

const themes = slugs.map(slug => {
  const root = path.join(RAW_DIR, slug);
  const fotos = listFiles(path.join(root, 'Fotos'));
  const fontes = listFiles(path.join(root, 'Fonte'));
  const moldesPDF = listFiles(path.join(root, 'Moldes', 'PDF'));
  const moldesStudio = listFiles(path.join(root, 'Moldes', 'Studio'));
  const { papeis, imagens } = collectPapelDigital(root);

  return {
    slug,
    id: slugify(slug),
    name: prettyName(slug),
    category: categoryFor(slug),
    cover: fotos[0] ? rel(fotos[0].path) : (imagens[0] ? rel(imagens[0].path) : null),
    counts: {
      fotos: fotos.length,
      fontes: fontes.length,
      moldesPDF: moldesPDF.length,
      moldesStudio: moldesStudio.length,
      papeis: papeis.length,
      imagens: imagens.length,
      total: fotos.length + fontes.length + moldesPDF.length + moldesStudio.length + papeis.length + imagens.length,
    },
    fotos: fotos.map(f => ({ name: f.name, url: rel(f.path) })),
    fontes: fontes.map(f => ({ name: f.name, url: rel(f.path) })),
    moldesPDF: moldesPDF.map(f => ({ name: f.name, url: rel(f.path) })),
    moldesStudio: moldesStudio.map(f => ({ name: f.name, url: rel(f.path) })),
    papeis: papeis.map(f => ({ name: f.name, url: rel(f.path) })),
    imagens: imagens.map(f => ({ name: f.name, url: rel(f.path) })),
  };
});

const totals = themes.reduce((acc, t) => {
  acc.total += t.counts.total;
  acc.fotos += t.counts.fotos;
  acc.moldesPDF += t.counts.moldesPDF;
  acc.papeis += t.counts.papeis;
  acc.imagens += t.counts.imagens;
  return acc;
}, { total: 0, fotos: 0, moldesPDF: 0, papeis: 0, imagens: 0 });

const manifest = {
  generatedAt: new Date().toISOString(),
  totals,
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

fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2));
const OUT_JS = path.resolve(__dirname, 'manifest.js');
fs.writeFileSync(OUT_JS, `window.KF_MANIFEST = ${JSON.stringify(manifest)};\n`);
console.log(`Manifest gerado com ${themes.length} temas e ${totals.total} arquivos.`);
console.log(`Salvo em: ${OUT}`);
console.log(`Também salvo como JS em: ${OUT_JS}`);
