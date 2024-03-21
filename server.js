/********************************************************************************

* WEB322 – Assignment 04

*

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

*

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

*

* Name:Ritish Sharma Student ID: 146407226 Date: 21 March 2024

*

* Published URL:https://github.com/Glitched21/Web322

*

********************************************************************************/
const express = require('express');
const legoData = require('./modules/legoSets');

const app = express();
const port = 8080;

app.use(express.static('public'));
app.set('view engine', 'ejs');

legoData.initialize().then(() => {
    app.get('/', (req, res) => {
        res.render('home', { page: '/' });
    });

    app.get('/about', (req, res) => {
        res.render('about', { page: '/about' });
    });

    app.get('/lego/sets', (req, res) => {
        const theme = req.query.theme;
        if (theme) {
            legoData.getSetsByTheme(theme)
                .then((sets) => res.render("sets", { sets, page: '/lego/sets' }))
                .catch((error) => res.status(404).render('404', { message: "No sets found for the matching theme." }));
        } else {
            legoData.getAllSets()
                .then((sets) => res.render('sets', { sets, page: '/lego/sets' }))
                .catch((error) => res.status(404).render('404', { message: "Error: " + error }));
        }
    });

    app.get('/lego/sets/:setNum', (req, res) => {
        const setNum = req.params.setNum;
        legoData.getSetByNum(setNum)
            .then((set) => res.render('set', { set }))
            .catch((error) => res.status(404).render('404', { message: "No sets found for the specific set number." }));
    });

    app.use((req, res) => {
        res.status(404).render('404', { message: "No view matched for the specific route." });
    });

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Error initializing Lego data:', error);
});