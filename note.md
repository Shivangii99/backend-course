creating web server using nodejs
const http = require('http');
const fs = require('fs');

const demo = fs.readFileSync('demo.html', 'utf-8');
const text = JSON.parse(fs.readFileSync('text.json', 'utf-8'));

const product = text.products[8];

const server = http.createServer((req,res)=>{
    switch(req.url){
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.end("Hello users, pls route to othe rpages to see our catalouge")
            break;
        case '/data':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(text));
            break;
        case '/card':
            res.setHeader('Content-Type', 'text/html');
            const changedDemo = demo.replace('@@Title&&', product.title)
                                    .replace('@@image&&', product.thumbnail);
            res.end(changedDemo);
            break;
        default:
            res.writeHead(404, 'the route is not found, pls enter valid route');
            res.end();
    }
    // console.log(req.url);
    // console.log("Server started");
    // res.setHeader('Content-Type', 'text/html')
    // res.end(demo);
})

//Created Web server using Express JSON
const data = fs.readFileSync('text.json', 'utf-8');

const app = express();
var morgan = require('morgan')

// MIDDLEWARES
//Application level Middleware
app.use((req,res,next)=>{
    console.log("Middleware created");
    next();
})

//Third-party Middlewares
app.use(morgan('short'));

//Built-in Middlewares
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.static('public'));

//Router level middleware
// const validUser = (req,res,next)=>{
//     if(req.query.userName === "Aditya"){
//         next();
//     }
//     else{
//         res.sendStatus(401);
//     }
// }
// const validPass = (req,res,next)=>{
//     if(req.body.Password === "1234"){
//         next();
//     }
//     else{
//         res.sendStatus(401);
//     }
// }


app.get('/login/:userName', (req,res)=>{
    console.log(req.params.userName);
    res.send(`<h1>Hello ${req.params.userName} !!</h1>`);
})
// app.get('/', (req,res)=>{
//     // res.sendStatus(401);
//     res.status(201).send("<h1>REsponse created</h1>");
// })
// app.get('/data', (req,res)=>{
//     res.sendFile(__dirname + '/text.json');
// })
// app.get('/json', (req,res)=>{
//     res.json(data);
// })


// API endpoints
// app.get('/', (req,res)=>{
//     res.send({type:"GET"});
// })
// app.post('/contact',validPass, (req,res)=>{
//     res.send({type:"POST"});
// })
// app.put('/', (req,res)=>{
//     res.send({type:"PUT"});
// })
// app.patch('/', (req,res)=>{
//     res.send({type:"PATCH"});
// })
// app.delete('/', (req,res)=>{
//     res.send({type:"DELETE"});
// })

// RESTful APIs

const fs = require('fs')

const text = JSON.parse(fs.readFileSync('text.json', 'utf-8'));
const products = text.products;

app.use(express.json());

//RESTful APIs
//CRUD
//CREATE
app.post('/products', (req,res)=>{
    products.push(req.body);
    res.json(req.body);

})
//READ
app.get('/products', (req,res)=>{
    res.json(products);
});

app.get('/products/:id', (req,res)=>{
    const id = +req.params.id;
    const product = products.find(p=>p.id===id);
    res.json(product);
})
// UPDATE
app.put('/products/:id', (req,res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id===id);
    products.splice(productIndex,1,{...req.body, id:id})
    res.status(201).json()
})
app.patch('/products/:id', (req,res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id===id);
    const product = products[productIndex];
    products.splice(productIndex,1,{...product,...req.body})
    res.status(201).json()
})
// DELETE
app.delete('/products/:id', (req,res)=>{
    const id = +req.params.id;
    const productIndex = products.findIndex(p=>p.id===id);
    const product = products[productIndex];
    products.splice(productIndex,1);
    res.status(200).json(product);
})


// Mongodb and Mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/collegeDb');
  
// await mongoose.connect('mongodb://user:QX4fc2zIiR76smip@127.0.0.1:27017/collegeDb');
  console.log("Connection successfull");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const collegeSchema = new Schema({
    name: {type: String, max:[10, "The anme should not exceed length 10"]},
    email:{type: String, required:true},
    marks: Number,
    rank:Number,
  });
const College = new mongoose.model('College', collegeSchema);

//CRUD
//1. CREATE
app.post("/teacher", (req,res)=>{
  const studentData = new College(req.body);
  studentData.save();
  res.sendStauts(201).json(studentData);
})
//2. READ
app.get("/student", async (req,res)=>{
  const studentData = await College.find({marks:{$gt:70}});
})
//3. UPDATE
app.post("/student", async (req,res)=>{
  const studentData = await College.updateOne({nane:"Sgivangi"}, {marks:100});
})

server.listen(8080);