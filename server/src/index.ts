import { ServiceProvider } from "./Provider";
import { App } from "./App";

const app:App = ServiceProvider.getService(App);
app.initServer();