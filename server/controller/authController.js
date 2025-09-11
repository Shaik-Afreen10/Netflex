const {prisma }= require('../utils/dbConnector');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

//admin register
exports.adminRegister= async (req,res)=>{
    const {name,role,email,pass} = req.body
    const hashPassword = await bcrypt.hash(pass,10)//10 salts of hashing
    try{
    const UserData  = await prisma.User.create({
        data:{
            name,
            email,
            role,
            pass:hashPassword
        }
    });
    res.status(201).send({message:'created admin',status:true,data:UserData})
    }catch(err){
       res.status(400).send({message:err,status:false})
    }  
}
//admin login

exports.adminLogin= async (req,res)=>{
    const {email,pass} = req.body;
    try{
    const validUser = await prisma.User.findFirst({where:{email:email,role:'admin'}});
    if(!validUser) res.status(200).send({message:`User Does'nt exist`});
    const validPass =await bcrypt.compare(pass,validUser.pass);
    if(!validPass) res.status(200).send({message:`Wrong Password`});
    //we will generate token here and send it as response
    const token = jwt.sign(
        {id:validUser.id,email:email,role:'admin'},
        process.env.JWT_SECRET_TOKEN,
        {expiresIn:'6h'});
    res.status(200).send({message:`Login Successful`,token:token});
    }catch(err){ 
        res.status(200).send({message:err});

    }
}

//user register
exports.userRegister = async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    const hashPassword = await bcrypt.hash(pass, 10);

    const Userdata = await prisma.User.create({
      data: { name, email, pass: hashPassword, role: 'user' },
    });

    res.status(201).json({ status: true, message: "User registered", data: Userdata });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// User login
exports.userLogin = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const validUser = await prisma.User.findFirst({ where: { email, role: 'user' } });
    if (!validUser) return res.status(400).json({ message: "User doesn't exist" });

    const validPass = await bcrypt.compare(pass, validUser.pass);
    if (!validPass) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: validUser.id, email, role: 'user' },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: '6h' }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//change admin password
// ...existing code...
//change admin password
exports.adminChangePass = async (req,res)=>{
    const adminId = req.params.id;
    const {newPass} = req.body;
    
    if (!newPass) {
        return res.status(400).send({status:false, message: "New password is required."});
    }

    try{
        // Hash the new password before saving
        const hashPassword = await bcrypt.hash(newPass, 10);

        const updateData = await prisma.User.update({
         where:{id:adminId},
         data:{pass: hashPassword} // Save the hashed password
        })
         res.status(201).send({status:true, message: "Password updated successfully."});
    }catch(err){
         res.status(400).send({status:false, message:err.message});
    }
}
// ...existing code...


// View all genres
exports.viewGenre = async (req, res) => {
  try {
    const genres = await prisma.Genre.findMany({
      include: { movies: true } // include movies linked to each genre
    });

    res.status(200).json({ status: true, data: genres });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};



// View all movies
exports.viewMovies = async (req, res) => {
  try {
    const movies = await prisma.Movies.findMany({
      include: { genre: true } // show genre details too
    });

    res.status(200).json({ status: true, data: movies });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

//const { prisma } = require('../utils/dbConnector');

// ================= MOVIES =================

// View all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.Movies.findMany({
      include: { genre: true }, // fetch genre info too
    });
    res.status(200).json({ status: true, data: movies });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// View all genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await prisma.Genre.findMany({
      include: { movies: true }, // include movies under each genre
    });
    res.status(200).json({ status: true, data: genres });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Get movies by genre
exports.getMoviesByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const movies = await prisma.Movies.findMany({
      where: {
        genre: {
          name: {
            equals: genre,
            mode: 'insensitive', // case-insensitive match
          },
        },
      },
      include: { genre: true },
    });

    if (movies.length === 0) {
      return res.status(404).json({ status: false, message: "No movies found in this genre" });
    }

    res.status(200).json({ status: true, data: movies });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// View single movie by ID
exports.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await prisma.Movies.findUnique({
      where: {
        id: id.toString(),  // 🔑 ensure it's a string
      },
      include: {
        genre: true
      }
    });

    if (!movie) {
      return res.status(404).json({ status: false, message: "Movie not found" });
    }

    res.status(200).json({ status: true, data: movie });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


// Rate a movie
exports.rateMovie = async (req, res) => {
  const { id, rating } = req.body;

  if (!id || !rating) {
    return res.status(400).json({ status: false, message: "Movie ID and rating required" });
  }

  try {
    const updatedMovie = await prisma.Movies.update({
      where: { id },
      data: { rating: parseFloat(rating) },
    });

    res.status(200).json({ status: true, message: "Rating updated", data: updatedMovie });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

// Search movies by title
exports.searchMovies = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ status: false, message: "Search query missing" });
  }

  try {
    const results = await prisma.Movies.findMany({
      where: {
        title: {
          contains: q,
          mode: 'insensitive',
        },
      },
      include: { genre: true },
    });

    res.status(200).json({ status: true, data: results });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
//http://localhost:8060/api/user/search?q=om bhim bush
