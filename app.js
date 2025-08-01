const e = require('express');
const exprees=require('express');
const app=exprees();

require('dotenv').config();


app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));

const userRoutes=require('./routes/userRoutes')
const teamRoutes=require('./routes/teamRoutes')

app.use('/user',userRoutes)
app.use('/team',teamRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
})