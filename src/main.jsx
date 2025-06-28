import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App";
import { AppWrapper } from "./components/common/PageMeta";
import { ThemeProvider } from "./context/ThemeContext";
// import { ClerkProvider } from '@clerk/clerk-react'



// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Missing Publishable Key')
// }


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AppWrapper>
        {/* <App /> */}
        {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
          <App />
        </ClerkProvider> */}
        <App />
      </AppWrapper>
    </ThemeProvider>
  </StrictMode>
);
