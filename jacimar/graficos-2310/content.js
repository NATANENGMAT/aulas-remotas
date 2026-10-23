'use strict';
// All data are authored teaching examples; no figures are presented as official statistics.
const fruit = { labels:['Açaí','Cupuaçu','Graviola','Tucumã'], values:[40,20,30,10], unit:'copos', max:50, step:10, caption:'Sucos vendidos na feira · dados didáticos' };
const books = { labels:['AM','PA','AC','RR','RO'], values:[300,600,125,50,400], unit:'livros', max:700, step:100, caption:'Livros em bibliotecas · dados didáticos', names:['Amazonas','Pará','Acre','Roraima','Rondônia'] };
const orderedBooks = {...books,labels:['RR','AC','AM','RO','PA'],names:['Roraima','Acre','Amazonas','Rondônia','Pará'],values:[50,125,300,400,600]};
const schools = { labels:['A','B','C','D','E'], values:[30,35,40,40,400], unit:'livros', max:400, step:100, caption:'Doações a cinco escolas · dados didáticos' };
const smallSchools = { labels:['A','B','C','D'], values:[30,35,40,40], unit:'livros', max:50, step:10, caption:'Sem a escola E · observe a nova escala' };
const transport = { labels:['A pé','Bicicleta','Ônibus','Carro'], values:[50,10,25,15], unit:'estudantes', max:60, step:10, caption:'Como 100 estudantes vão à escola · exemplo' };
const meals = { labels:['Açaí','Tapioca','Frutas','Sanduíche'], values:[40,30,20,10], unit:'votos', max:50, step:10, caption:'Lanche preferido de 100 estudantes · exemplo' };
const q = (prompt, chart, answer, explanation, extra={}) => ({type:'question',prompt,chart,answer,explanation,...extra});
const note = (title,text,chart,extra={}) => ({type:'note',title,text,chart,...extra});
const LESSONS = [
 {id:'ler',title:'Lendo gráficos',subtitle:'Encontre as histórias nas barras',detail:'Gráficos de barras',icon:'bars',steps:[
  {type:'intro',title:'Lendo gráficos de barras',text:'Cada barra conta uma parte da história. Vamos descobrir o que os dados dizem sobre o Brasil?',art:'bars'},
  note('Uma barra, uma quantidade','O nome fica embaixo. A altura mostra a quantidade. Para ler um valor, compare o topo da barra com os números ao lado.',books),
  q('Qual estado tem cerca de 400 livros?',books,[4],'A barra de Rondônia (RO) chega à linha de 400 livros. Os números do eixo vertical mostram a quantidade.'),
  q('Qual estado tem cerca de 125 livros?',books,[2],'Acre (AC) tem 125 livros: a barra fica um pouco acima de 100 e abaixo de 200.'),
  q('Qual estado tem mais livros?',books,[1],'Pará (PA) tem a barra mais alta, com 600 livros. Uma barra mais alta representa uma quantidade maior.'),
  q('Qual estado tem menos livros?',books,[3],'Roraima (RR) tem 50 livros. É a menor barra do gráfico, abaixo da linha de 100.'),
  note('Organizar ajuda a comparar','As mesmas quantidades, em outra ordem! Do menor para o maior, fica fácil encontrar os extremos.',orderedBooks),
  q('Quais dois estados têm mais livros, juntos?',orderedBooks,[3,4],'Pará tem 600 e Rondônia tem 400. Juntos, somam 1.000 livros, a maior soma de dois estados.',{pick:2}),
  q('Qual estado tem a quantidade mais próxima da do Amazonas?',orderedBooks,[3],'Amazonas tem 300 livros. Rondônia tem 400: a diferença é 100, menor que a diferença para os outros estados.'),
  {type:'checkpoint',title:'Sua vez de descobrir',text:'Agora, use o que aprendeu com os sucos de uma feira brasileira. São três desafios rápidos.',art:'cup'},
  q('Qual suco foi o mais vendido?',fruit,[0],'O açaí vendeu 40 copos. Sua barra é a mais alta.',{skill:true}),
  q('Qual suco vendeu 30 copos?',fruit,[2],'A barra de graviola chega à marca de 30 copos.',{skill:true}),
  q('Quais dois sucos somam 30 copos?',fruit,[1,3],'Cupuaçu vendeu 20 e tucumã vendeu 10. Então, 20 + 10 = 30 copos.',{pick:2,skill:true})
 ]},
 {id:'comparar',title:'Comparando dados',subtitle:'Vá além da primeira impressão',detail:'Análise de gráficos',icon:'compare',steps:[
  {type:'intro',title:'Comparando gráficos de barras',text:'O que fica escondido quando um valor é muito maior que os outros? Vamos olhar mais de perto.',art:'compare'},
  q('Qual escola recebeu mais livros?',schools,[4],'A escola E recebeu 400 livros. As outras receberam entre 30 e 40.'),
  q('Quantos livros a escola E recebeu a mais que a escola C?',schools,360,'A escola E recebeu 400 e a escola C recebeu 40. A diferença é 400 − 40 = 360 livros.',{options:[40,360,440]}),
  note('Um valor fora do padrão','Os 400 livros da escola E comprimem as outras barras. Vamos retirar E só desta visualização e ajustar a escala.',schools),
  note('Agora dá para enxergar melhor','Os valores de A, B, C e D continuam iguais. Apenas a escala mudou: agora vai até 50. Compare com mais atenção!',smallSchools),
  q('Quantos livros a escola C recebeu a mais que a escola A?',smallSchools,10,'A escola C recebeu 40 e a escola A recebeu 30. Então, 40 − 30 = 10 livros.',{options:[5,10,20]}),
  q('Quais escolas receberam a mesma quantidade?',smallSchools,[2,3],'C e D receberam 40 livros cada. Barras de mesma altura representam quantidades iguais.',{pick:2}),
  q('Qual escola tem o valor fora do padrão neste grupo?',schools,[4],'A escola E, com 400 livros, está muito acima das outras. Esse valor é chamado de discrepante.'),
  note('Olhe sempre para a escala','Retirar um valor pode ajudar a comparar os demais. Mas avise o que foi retirado: um gráfico deve contar a história com clareza.',smallSchools),
  {type:'checkpoint',title:'Um olhar mais atento',text:'Vamos voltar à feira. Leia o gráfico e compare as vendas de sucos.',art:'cup'},
  q('Quantos copos de açaí foram vendidos a mais que os de cupuaçu?',fruit,20,'Foram 40 copos de açaí e 20 de cupuaçu. A diferença é 40 − 20 = 20 copos.',{options:[10,20,60],skill:true}),
  q('Qual destes pares teve as vendas mais próximas?',fruit,'Açaí e graviola','Açaí (40) e graviola (30) diferem em 10 copos. Nos outros pares das alternativas, as diferenças são 30 e 20 copos.',{options:['Açaí e graviola','Açaí e tucumã','Açaí e cupuaçu'],skill:true}),
  q('Qual é a diferença entre o mais e o menos vendido?',fruit,30,'Açaí vendeu 40 e tucumã vendeu 10. Então, 40 − 10 = 30 copos.',{options:[10,30,50],skill:true})
 ]},
 {id:'partes',title:'Partes de um todo',subtitle:'Descubra o que as fatias revelam',detail:'Gráficos de setores',icon:'pie',steps:[
  {type:'intro',title:'Gráficos de setores',text:'Um círculo inteiro representa o total. Cada fatia mostra quanto uma categoria participa desse todo.',art:'pie'},
  q('Quantos estudantes aparecem neste gráfico, ao todo?',transport,100,'Somamos todas as categorias: 50 + 10 + 25 + 15 = 100 estudantes.',{options:[50,100,150]}),
  q('Qual meio de transporte corresponde à metade dos estudantes?',transport,[0],'50 dos 100 estudantes vão a pé. Metade de 100 é 50: isso corresponde a 50%.'),
  note('Do total para as partes','Os mesmos dados podem virar um gráfico de setores. O círculo inteiro é 100%. Metade do círculo é 50%.', {...transport,kind:'pie',percent:true}),
  q('Qual fatia representa 25% dos estudantes?',{...transport,kind:'pie'},[2],'Ônibus representa 25 de 100 estudantes, ou 25%. É um quarto do círculo.'),
  q('Quais dois meios de transporte somam 75%?',{...transport,kind:'pie'},[0,2],'A pé representa 50% e ônibus representa 25%. Juntos: 50% + 25% = 75%.',{pick:2}),
  q('Qual meio de transporte representa 15%?',{...transport,kind:'pie'},[3],'Carro representa 15 dos 100 estudantes. Portanto, sua participação é 15%.'),
  note('Escolha o melhor jeito de mostrar','Barras ajudam a comparar quantidades. Setores ajudam a enxergar partes de um total. Toque nos botões para trocar a representação.',transport,{toggle:true}),
  {type:'checkpoint',title:'Últimas descobertas',text:'Uma turma escolheu seus lanches preferidos. Interprete as fatias e finalize a atividade do dia 23.',art:'pie'},
  q('Qual porcentagem prefere frutas?',{...meals,kind:'pie'},20,'Frutas recebeu 20 de 100 votos: 20% do total.',{options:[10,20,40],suffix:'%',skill:true}),
  q('Qual lanche representa 10% dos votos?',{...meals,kind:'pie'},[3],'Sanduíche recebeu 10 dos 100 votos. Sua fatia representa 10%.',{skill:true}),
  q('Açaí e tapioca somam qual porcentagem?',{...meals,kind:'pie'},70,'Açaí representa 40% e tapioca representa 30%. Juntos: 40% + 30% = 70%.',{options:[30,50,70],suffix:'%',skill:true})
 ]}
];
