import { QueryClient, QueryClientProvider } from "react-query";
import { Providers, Router } from "main";
import { Toaster } from "react-hot-toast";
import { GlobalStyle } from "presentation";

const queryClient = new QueryClient();

function App(): JSX.Element {
	return (
		<Providers>
			<QueryClientProvider client={queryClient}>
				<Toaster
					position="top-center"
					reverseOrder={false}
				/>
				<GlobalStyle />
				<Router />
			</QueryClientProvider>
		</Providers>
	);
}

export default App;
