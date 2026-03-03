const express = require('express')
const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const PORT = 8000
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressLayouts)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/views'));

async function dbsetup() {
	return await open({
		filename: './database.db',
		driver: sqlite3.Database
	})
}

app.get('/api', function(req,res) {
	return res.send("API with Node.js")
})
const headerLinks = [
	{
		title: "Dashboard",
		href: "/dashboard"
	},
	{
		title: "Milalao",
		href: "/milalao"
	},
];
app.get('/', async function(req, res) {
	res.render('index.ejs', { title:"Home Page", headerLinks:headerLinks })
})


app.get('/milalao', async function(req, res) {
    return res.render('play.ejs', { title:"Milalao fanorona", headerLinks:headerLinks })
})

app.post('/api/game', async function(req, res) {   
	const { player1, player2, whoWin, gameOver } = req.body
	const db = await dbsetup()
	
	if(!player1) {
		return res.status(500).send("field player1 is required")
	}
	if(!player2) {
		return res.status(500).send("field player2 is required")
	}
	if(!gameOver) {
		return res.status(500).send("field gameOver is required")
	}
	const dt = new Date();
	const createdAt = dt.toLocaleString();
	const created = await db.run("INSERT INTO game(player1, player2, gameOver, whoWin, createdAt) VALUES(?,?,?,?,?)", player1, player2, gameOver, whoWin, createdAt);
	return res.status(201).send('game created');
})

app.listen(PORT, async function() {
        const db = await dbsetup()
        const gameCreated = await db.run("CREATE TABLE IF NOT EXISTS game(id INTEGER PRIMARY KEY AUTOINCREMENT, player1 TEXT, player2 TEXT, whoWin TEXT, gameOver TEXT, createdAt TEXT)");
        
	console.log("app listening on port "+PORT)
})

