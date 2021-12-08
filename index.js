const express = require('express');
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express();
const axios = require('axios');


app.use(express.urlencoded({ extended : false }));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(expressLayouts)
app.use(bodyParser.urlencoded())

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

app.get('/', (req, res) =>{
    res.render('pages/home');
});

app.get('/sistema_FIT', (req, res) =>{
    res.render('pages/pag_sistema/sistema_FIT');
});

//----------------CURSOS--------------
app.get('/add_cursos', (req, res) => {
    res.render('pages/pag_sistema/add_cursos');
});

app.post('/add_cursos', (req, res) => {

    async function makeGetRequest() {

        let cursos = {
            'nome': req.body.nome
           ,'tempo_duracao': req.body.tempo
           ,'descricao': req.body.descricao
       };

        let res = await axios.post('http://localhost:5000/v1/cursos/', cursos);

        let data = res.data;
        console.log(data);
    }

    makeGetRequest();

    res.redirect('/sistema_FIT');
});

//----------------PROFESSORES-------------
app.get('/add_professor', (req, res) => {
    res.render('pages/pag_sistema/add_professor');
});

app.post('/add_professor', (req, res) => {

    let cursos = {
         nome: req.body.nome
        ,tempo_duracao: req.body.tempo
        ,descricao: req.body.descricao
    };

   
    res.redirect('/sistema_FIT');
});

//-----------ALUNOS-------------------
app.get('/add_alunos', (req, res) => {

    async function getNumberOfFollowers() {
        let cursos = [];
        var rest = await axios.get('http://localhost:5000/v1/cursos/');
      
        let response = rest.data;

      
        console.log('--------------')
        console.log(response)

        res.render('pages/pag_sistema/add_alunos', { cursos : cursos });
        curso = response
        console.log(cursos)
    }
    getNumberOfFollowers();
    
        /*for (let i = 0; i < (resultado.rows).length; i++){
            cursos.push(resultado.rows[i])
        }*/             
                
});

app.post('/add_alunos', (req, res) => {

    let aluno = {
         nome: req.body.nome
        ,nascimento: req.body.nascimento
        ,cpf: req.body.cpf
        ,rg: req.body.rg
        ,endereco: req.body.endereco
        ,mensalidade: req.body.mensalidade
        ,curso: req.body.curso
    };

    res.redirect('/sistema_FIT');
});

