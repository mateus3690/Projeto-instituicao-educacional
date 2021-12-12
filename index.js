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

    async function CursoPostRequest() {

        let cursos = {
            'nome': req.body.nome
           ,'tempo_duracao': req.body.tempo
           ,'descricao': req.body.descricao
           ,'mensalidade':req.body.mensalidade
       };

       let auth = {
        username: 'ADMINISTRADOR',
        password: 'admin12345'
       }

        let res = await axios.post('http://localhost:5000/v1/cursos/', cursos, {auth});

        let data = res.data;
        console.log(data);
    }

    CursoPostRequest();
    res.redirect('/sistema_FIT');
    
});


//----------------PROFESSORES-------------
app.get('/add_professor', (req, res) => {
    res.render('pages/pag_sistema/add_professor');
});

app.post('/add_professor', (req, res) => {

    async function ProfessorPostRequest() {

        let professor = {
            nome: req.body.nome
           ,nascimento: req.body.nascimento
           ,cpf: req.body.cpf
           ,rg: req.body.rg
           ,endereco: req.body.endereco
           ,materia: req.body.materia
           ,salario:req.body.salario   
       };

       let auth = {
        username: 'ADMINISTRADOR',
        password: 'admin12345'
       }

       let res = await axios.post('http://localhost:5000/v1/profess/', professor, {auth});
       let data = res.data;
       console.log(data);
    }
    ProfessorPostRequest();
    res.redirect('/sistema_FIT');
});


//-----------ALUNOS-------------------
app.get('/add_alunos', (req, res) => {

    async function CursoGetResquest() {
        var rest = await axios.get('http://localhost:5000/v1/cursos/'); 
        let response = rest.data;

        res.render('pages/pag_sistema/add_alunos', { cursos : response});
    }
    CursoGetResquest();            
});

app.post('/add_alunos', (req, res) => {

    async function AlunoPostRequest() {

        let aluno = {
            nome: req.body.nome
           ,nascimento: req.body.nascimento
           ,cpf: req.body.cpf
           ,rg: req.body.rg
           ,endereco: req.body.endereco
           ,curso: req.body.curso
       };

        let res = await axios.post('http://localhost:5000/v1/alunos/', aluno);

        let data = res.data;
        console.log(data);
    }
    AlunoPostRequest();

    res.redirect('/sistema_FIT');
});

