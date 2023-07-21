import SidebarProvider from "@/view/Sidebar/SidebarContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/themes";
import { Provider } from "react-redux";
import store from "@/reduxs/store";
import BaseLayout from "@/layouts/BaseLayout";
import "react-datepicker/dist/react-datepicker.css"

function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <SidebarProvider>
          <BaseLayout>
            <AnyComponent {...pageProps} />
          </BaseLayout>
        </SidebarProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
