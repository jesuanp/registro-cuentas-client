import { AGREGAR_UNA_CUENTA,
    EDITAR_CUENTA,
    ELIMINAR_UNA_CUENTA,
    OBTENER_TODAS_LAS_CUENTAS,
    OBTENER_UNA_CUENTA,
    OBTENER_UNA_CUENTA_DE_LA_DB
} from "../types/types";

export default (state = initialState, action) => {

    switch(action.type) {

        case OBTENER_TODAS_LAS_CUENTAS: return {
            ...state,
            accounts: action.payload.sort((a,b) => {
                if (a.date < b.date) {
                  return -1;
                } else if (a.date > b.date) {
                  return 1;
                }
                return 0;
            })
        }

        case AGREGAR_UNA_CUENTA: return {
            ...state,
            accounts: [action.payload, ...state.accounts]
        }

        case OBTENER_UNA_CUENTA: return {
            ...state,
            account: state.accounts.filter(e => e.id == action.payload)[0]
        }

        case OBTENER_UNA_CUENTA_DE_LA_DB: return {
            ...state,
            account: action.payload
        }

        case EDITAR_CUENTA: return {
            ...state,
            account: action.payload
        }

        case ELIMINAR_UNA_CUENTA: return {
            ...state,
            account: {}
        }
        
        default: return state;
    }
}