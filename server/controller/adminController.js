const {prisma} = require('../utils/dbConnector');
exports.getAllUsers = async(req,res) =>{
    try{
        const Data = await prisma.User.findMany({where:{role:'user'}});
        res.status(200).send({status:true,data:Data});
    }catch(err){
         
         res.status(400).send({status:false,message:err});
    }

}
exports.addGenre = async (req, res) => {
  const {name} = req.body;
    try{
        const genreData = await prisma.Genre.create({ data:{name}});
        res.status(201).send({status:true,message:genreData});
    }catch(err){
        res.status(400).send({status:false,message:err});
    }

}

exports.addMovie = async (req, res) => {
  try {
    const { title, desc, year, url, bannerUrl, genreId } = req.body;

    if (!title || !genreId) {
      return res.status(400).json({ status: false, message: "Title & Genre ID required" });
    }

    const movie = await prisma.Movies.create({
      data: {
        title,
        desc,
        year: parseInt(year),
        url,
        bannerUrl,
        genreId
      }
    });

    res.status(201).json({ status: true, message: "Movie added", data: movie });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
}

exports.editMovie = async (req, res) => {
 
    const movieId = req.params.id;
  const {year,desc}=req.body;
  try{
    const updateMovie =prisma.Movies.update({
        where:{id:movieId},
        data:{year:parseInt(year),desc},
    })
    res.status(200).send({status:true,message:updateMovie})
}
catch(err)
{
    res.status(400).send({status:false,message:err});
}
}

exports.deleteGenre = async (req,res)=>{
    console.log(req.params.id);
    const genreId = req.params.id;
    try{
        await prisma.Movies.deleteMany({where:{genreId:genreId}});//one to many delete
        const deleteData = await prisma.Genre.delete({
         where:{id:genreId}
        })
         res.status(201).send({status:true,message:'Deleted Successfully'});
    }catch(err){
         res.status(200).send({status:false,message:err});
    }
}
exports.editGenre = async (req,res)=>{
    const genreId = req.params.id;
    const {name} = req.body;
    try{
        const updateData = await prisma.Genre.update({
         where:{id:genreId},
         data:{name}
        })
         res.status(201).send({data:{status:true,message:"Updated Successfully"}});
    }catch(err){
         res.status(200).send({status:false,message:err});
    }
}