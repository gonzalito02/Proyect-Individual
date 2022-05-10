// configuración del store
import {legacy_createStore, applyMiddleware } from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"

import Reducer from "../reducer"

export const store = legacy_createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))

// ver en clases si se utilizo otro metodo que no sea configureStore,
// ya que segun lo visto se utilizaba el metodo createStore

// para poder avanzar sobre este tema, debido a la advertencia del vscode, se utliza legacy_createStore, que es lo mismo (en teoria)