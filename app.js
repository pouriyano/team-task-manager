const e = require('express');
const exprees=require('express');
const app=exprees();

require('dotenv').config();


app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));

const userRoutes=require('./routes/userRoutes')
const teamRoutes=require('./routes/teamRoutes')
const commentRoutes = require('./routes/commentRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/user',userRoutes)
app.use('/team',teamRoutes)
app.use('/comment',commentRoutes);
app.use('/task',taskRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`)
})