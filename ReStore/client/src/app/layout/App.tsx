import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Catalog from "../features/catalog/Catalog";
import Header from "./Header";
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import HomePage from "../features/home/HomePage";
import ContactPage from "../features/contact/ContactPage";
import AboutPage from "../features/about/AboutPage";
import ProductDetailsPage from "../features/catalog/ProductDetailsPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // CSS for toasts
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../features/basket/BasketPage";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const customTheme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#31a949',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#7aa5e6',
      main: '#4362ba',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: "#eaeaea",
    },
  },
});

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState<Boolean>(true);

  const [theme, setTheme] = useState<Boolean>(false);

  // Change
  const onChangeTheme = () => {
    setTheme(currTheme=> !currTheme);
  }

  const fetchBasket = useCallback( async () => {
    const buyerId = getCookie('buyerId');
    if(buyerId){
      try {
        setBasket(await agent.Basket.get());
      } catch(e: any) {
          console.log(e);
      }
    }
    setLoading(false);
}, [setBasket]);

  useEffect(()=>{
    fetchBasket();
  }, [fetchBasket]);

  if(loading) return <LoadingComponent message="Initializing App ..." />;

  return (
    <ThemeProvider theme={theme ? darkTheme : customTheme}>
      <ToastContainer position="top-right" theme="colored" />
      <CssBaseline />
      <Header theme={theme} setTheme={onChangeTheme} />
      <Container>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductDetailsPage />} />
          <Route path='/basket' element={<BasketPage />} />
          <Route path='/contacts' element={<ContactPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/server-error' element={<ServerError />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
