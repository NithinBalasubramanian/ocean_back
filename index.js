const express = require('express');
const employee = require('./router/employee')
const commonleave = require('./router/commonleave')
const Applyleave = require('./router/applyLeave')

const cors = require('cors');

const db = require('./model/index')

const app = express()

const PORT = '8000';

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/',(req,res) => {
    return res.send('Server is running');
})


// http://{url}/employee
app.use('/employee',employee);

// http://{url}/leave
app.use('/leave',commonleave);

// http://{url}/applyleave
app.use('/employeeleave',Applyleave);

app.listen(PORT,() => {
    console.log('Server started successfully.')
})

