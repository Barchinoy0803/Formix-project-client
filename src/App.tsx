import { Toaster } from "react-hot-toast"
import MainRouter from "./routes/index"

function App() {

  return (
    <>
      {/* <Navbar/> */}
      <MainRouter/>
      <Toaster/>
    </>
  )
}

export default App
