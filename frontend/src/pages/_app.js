import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		mode: "dark",
	},
});

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
