// spa-single page web 
// npa-
// SPA" can refer to a Single-Page Application, a web app that provides a dynamic, seamless user experience by dynamically rewriting content on a single HTML page, or a Special Power of Attorney, a legal document giving someone authority to act on a principal's behalf in specific matters, like real estate or loans.
//  "NPA" typically means Non-Performing Asset in finance, an asset that no longer generates income for the lender. 
/*
    react -js library
         -spa
         -vDOM (VIRTUAL DOM)
        -vite -it is a build tool. it was create by veon.

      -command to install react is 
        -mkdir clent
        -  npm create vite@latest
        -y
        -give project folder name
        - npx
> create-vite

│
◇  Project name:
│  Netflix
│
◇  Package name:
│  netflix
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Scaffolding project in D:\project-3rdyear-main\client\Netflix...
│
└  Done. Now run:

  cd Netflix
  npm install
  npm run dev


 the main core structure of react app is build on components!.

  component -block of reusable code (consists of html,js),
    2 types- functional comp-do function calls,  class comp -create objects
  

    jsx-javascript extensable markup language(xml)
    whateven in component,react will convert into createElement in DOM .


    functional components-
      function calls as tags !

    parameters call it as props
    whatever we arepassing we should write it in {}(curly braces)
    
    
    <button
         onClick={()=>{
            fun();
            }}
            >
                click Me
            </button>
        </div>



       - npm install tailwindcss @tailwindcss/vite

    p- padding is internal spacing  and margin is external spacing
      p-4 -all directions
       -pt -padding at top
       -pl -padding at left
       -pr -padding at right
       -pb -padding at botton
    
      flex box -way of segregating componnets
        -if in same row, it is inline
      
      text-red-{50,100,300,500,..800}

      text-{sm,lg,md,2xl,xl,3xl}

      font -{bold,italic,semi bold,underlined}

      bg-color

      
      3 types of layout
        -relative
        -justify
        -fix

        useState -to stored the componnet value
      hook - variable,useState function
      state-

        useEffect - 3 types
          -no array -after every rendering
          -[] -only once when data fetched or timeer set is done
          -[value]-when value gets changed





  */


       //functional component
// // const MyButton=({label="Click Me",fun})=>{
// //     return(
// //         <button onClick={()=>{fun(label)}}>{label}</button>
// //     )
// // }

// // const Card= ({childComp})=>{
// //     return(
// //         <div style={{backgroundColor:'#d03838ff',
// //                      border:'1px',
// //                      color:'#ffffff'
// //                      }}>
// //             <h1>Child Components</h1>
// //             {childComp}
// //         </div>
// //     )

// // }

// export default function Header({name,age,fun}){
//     return (
//         <div>
//         <h1>Name:{name} Age:{age}</h1>
       
//         <Card childComp={
            
//             <>
//              <MyButton label="Submit" fun={fun}/>
//              <span>Info   </span>
//              </>
//              }>
//         </Card>
//         <br></br>
//         <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
//   <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
//   <div>
//     <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
//     <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
//   </div>
// </div>
//         <MyButton fun={fun}/>
//         </div>
//     )
// } 
//
//main.js
/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
//import App from './App.jsx'
import Header from './components/common/header'
const root = document.getElementById('root');
const Example =(label)=>{
  alert(label);
}
createRoot(root).render(
  <StrictMode>
    <Header name="Ramu" age="24" fun={Example} />
      
  </StrictMode>,
)



  hooks - useState
        -useEffect etc..

    axios - http lib it is capable of http request from client to server and handle response !
      -2 parameters =>request url,json data
  cross horizen request site

  browser router

      routes

              route
              route
              route


*/



// return(
//         <div className="relative  bg-cover bg-center backdrop-blur-lg"
//          style={{backgroundImage:"url('"+netflix_bg+"')",
//          height:"100vh"}}>
//             <Header/>
//             <div>
//             <h1 className="text-white text-3xl font-bold">{qty}</h1>
//             <button className="bg-red-500  text-white rounded-sm" onClick={()=>{setPrice(qty+1)}}>click me</button>
//             </div>

//          <div className="flex-1 px-5 bg-transparent-900 my-[100px] rounded-lg m-10">
//             <form className="p-4">
//                 <input type="email" placeholder="Email address" 
//                     className="w-min p-3 my-3 rounded-sm text-black border border-white bg-white"/><br></br>
//                 <input type="password" placeholder="Password"
//                     className="w-min p-3 my-3 rounded-sm text-black border border-white bg-white"/><br></br>
//                 <select className="w-min p-3 my-3 rounded-sm text-black border border-white bg-white">
//                     <option>User</option>
//                     <option>Admin</option>
//                 </select><br></br>
//                 <button className="bg-red-500 p-3 my-3 text-white rounded-sm">Get Started</button>


//             </form>

//          </div>

//         </div>
//     )


// import Header from "./header";
// import netflix_bg from "../../assets/netflix_bg.jpg";
// import { useState } from "react";

// export default function MainContent() {
//     const {email,setEmail}=useState("")
//     const {pass,setPass}=useState("");
//     const handleSubmit =()=>{
        
//     }
//     return (
//         <div className="relative min-h-screen">

//             {/* Background Image */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center filter blur-[2px]"
//                 style={{ backgroundImage: "url('"+netflix_bg+"') "}}
//             />

//             {/* Content Layer */}
//             <div className="relative z-10 flex flex-col min-h-screen">

//                 <Header />

//                 {/* Centered Form */}
//                 <div className="flex flex-1 justify-center items-center px-5">
//                     <form className="bg-transparent bg-opacity-10 p-8 rounded-lg shadow-lg max-w-md w-full">
//                         <h2 className="text-white text-2xl mb-6 font-semibold text-center">
//                             Sign In
//                         </h2>

//                         <input 
//                             value="email"
//                             onChange={(e)=>{setEmail(e.target.value)}}
//                             type="email"
//                             placeholder="Email address"
//                             className="w-full bg-black p-3 my-3 rounded-lg text-white border border-white"
//                         />

//                         <input
//                              value="pass"
//                             onChange={(e)=>{setPass(e.target.value)}}
//                             type="password"
//                             placeholder="Password"
//                             className="w-full bg-black p-3 my-3 rounded-lg text-white border border-white"
//                         />

//                          <button
//                             type="submit"
//                             className="w-full bg-red-500 p-3 my-3 text-white rounded-lg hover:bg-red-600 transition"
//                             onClick={handleSubmit}
//                        >
//                            Sign In
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }













// //to do app
// import { useState } from "react";   
// export default function MainContent(){
//     const [Item,setItem]=useState(" ");
//     const [Quantity,setQuantity]=useState(0);
//     const [Price,setPrice]=useState(0);
//     const [cart,setCart]=useState([]);
//     const [index,setIndex]=useState(-1);
//     const clearForm=()=>{
//         setItem("");
//         setQuantity(0);
//         setPrice(0);
//         setIndex(-1);
//     }
//     const handleSubmit= () => {
//         // setCart([...cart, {"Item": Item, "Quantity": Quantity, "Price": Price}]);
//         // setItem("");
//         // setQuantity(0);
//         // setPrice(0);
//         // console.log(cart);
//         if(index!==-1)
//         {
//             cart[index]={Item, Quantity,Price};
//             setCart(cart);
//         }
//         else
//         {
//             setCart([...cart,{Item, Quantity,Price}])
//         }
//         clearForm();
//     };
//     const handleEdit=(index)=>{
//         existingData =cart[index];
//         //console.log(existingData);
        
//         setItem(existingData.Item)
//         setQuantity(existingData.Quantity)
//         setPrice(existingData.Price)

//     }
//     return(
//         <div>
//             <h1> Shopping Cart</h1>
//             <form className="flex gap-3 bg-gray-200">
//                 <input type="text" placeholder="Item" value={Item} onChange={(exp) =>{setItem(exp.target.value)}}/>
//                 <input type="number" placeholder="Quantity" value={Quantity} onChange={(exp) => setQuantity(exp.target.value)}/>
//                 <input type="number" placeholder="Price" value={Price} onChange={(exp) => setPrice(exp.target.value)}/>
//             </form>
//             <button 
//             className="bg-blue-500"
//             type="submit"
//             onClick={handleSubmit}>Add to Cart</button>
//             <div className="px-10 py-10 bg-gray-200 mt-10">
//                 <table className="border border-gray-500">
//                     <thead>
//                         <th className="p-2 m-4">#</th>
//                         <th className="p-2 m-4">Item</th>
//                         <th className="p-2 m-4">Qty</th>
//                         <th className="p-2 m-4">Price</th>
//                         <th className="p-2 m-4">Action</th>
//                     </thead>
//                     <body>
//                         {cart.map((element,index) =>{                     
//                         <tr>
//                                <td>{index+1}</td>
//                                 <td>{elemnt.Item}</td>
//                                 <td>{elemnt.Quantity}</td>
//                                 <td>{elemnt.Quantity*element.Price}</td>
//                                 <td><button onClick={()=>{handleEdit(index)}}>Edit</button></td>
//                         </tr>
//                         })}
    
//                     </body>
                     
//                 </table>

//             </div>
//         </div>
//     )
// }

 //TO DO LIST

{/*
import { useState } from "react";
export default function MainContent() {
  const [item, setItem] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [index,setIndex]= useState(-1);
  const clearForm=()=>{
     setItem("");
    setQty(0);
    setPrice(0);
    setIndex(-1);
  }
  const handleSubmit = () => {
    if(index!==-1){
    cart[index]= {item,qty,price};
    setCart(cart);
    }else{
     setCart([...cart, { item, qty, price }]);
    }
    clearForm();
  };
  const handleEdit= (index)=>{
    const existingData= cart[index];
    setItem(existingData.item)
    setPrice(existingData.price)
    setQty(existingData.qty)
    setIndex(index);
  }
  return (
    <div>
      <h1>Shopping Cart</h1>
      <form className="flex gap-3 bg-gray-200">
        <input
          type="text"
          placeholder="Item"
          value={item}
          onChange={(exp) => {
            setItem(exp.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Qty"
          value={price}
          onChange={(exp) => {
            setPrice(exp.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Price"
          value={qty}
          onChange={(exp) => {
            setQty(exp.target.value);
          }}
        />
      </form>
     
      <button className="bg-blue-500" type="submit"
       onClick={handleSubmit}>
        {index==-1 ?(<>Add to Cart</>):(<>Update</>)}
      </button>
      <div className="px-10 py-10 bg-gray-200 mt-10">
        <table className="border border-gray-500">
          <thead className="gap-3 border border-gray-500 p-2">
            <th className="p-2 m-4">#</th>
            <th className="p-2 m-4">Item</th>
            <th className="p-2 m-4">Qty</th>
            <th className="p-2 m-4">Price</th>
            <th className="p-2 m-4">Action</th>
          </thead>
          <tbody>
            {cart.map((element,index) => (
            <tr className="border border-gray-800 px-2">
              <td>{index+1}</td>
              <td>{element.item}</td>
              <td>{element.qty}</td>
              <td>{element.price}</td>
              <td>
                <button className="bg-red-500 text-white"
                onClick={()=>{handleEdit(index)}}
                >
                Edit</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
  */}

  
  
// <input
//                         type="password"
//                         placeholder="Password"
//                         value={pass}
//                         onChange={(e) => setPass(e.target.value)}
//                         className="w-full  p-3 my-3 rounded-lg text-white"
//                     />