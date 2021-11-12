import React, {Fragment} from "react";
import AdminPage from "./pages/admin/adminPage";
import {Routes, Route, BrowserRouter} from "react-router-dom"



// const App = () => {

//   const renderAdmin = () => {
//     return (
//     <Routes>
//       <Route path="/admin" element ={<AdminPage/>} />
//     </Routes>
//     )
//   }


//   return (
//     <div >
//       <BrowserRouter>
//         {renderAdmin()}
//       </BrowserRouter>
//     </div>
//   );
// }
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element ={<AdminPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
