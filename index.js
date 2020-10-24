const express = require('express');
const config = require('config');
const mongoose = require('mongoose');


const app = express();

app.use(express.json({ extended: true }));
app.use('/api/todos', require('./routes/todo.routes'));


const PORT = config.get('port') || 5000;

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri', {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        }));

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
    } catch (e) {
        console.log('Server error:', e.message);
        process.exit(1);
    }
};

start();