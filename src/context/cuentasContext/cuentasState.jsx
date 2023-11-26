import { useReducer } from "react";
import cuentasContext from "./cuentasContext";
import cuentasReduer from "./cuentasReduer";
import { AGREGAR_UNA_CUENTA,
    EDITAR_CUENTA,
    ELIMINAR_UNA_CUENTA,
    OBTENER_TODAS_LAS_CUENTAS,
    OBTENER_UNA_CUENTA,
    OBTENER_UNA_CUENTA_DE_LA_DB
} from "../types/types";
import clienteAxios from "../../config/clienteAxios";

const CuentasState = ({children}) => {

    const initialState = {
        accounts: [],
        account: {}
    }

    const [state, dispatch] = useReducer(cuentasReduer, initialState);

    const getAccounts = async () => {

        try {

            let response = await clienteAxios.get('api/get-accounts')

            dispatch({
                type: OBTENER_TODAS_LAS_CUENTAS,
                payload: response.data
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const addAccount = async (newAccount) => {

        try {

            let response = await clienteAxios.post('api/add-account', newAccount)

            return dispatch({
                type: AGREGAR_UNA_CUENTA,
                payload: response.data
            })
   
        } catch (error) {
            console.log(error);
        }
    }

    const getAccountById = async id => {

        if(Object.keys(state.account).length === 0){

            try {

                let response = await clienteAxios.get(`api/get-account/${id}`)

                return dispatch({
                    type: OBTENER_UNA_CUENTA_DE_LA_DB,
                    payload: response.data
                })
                
            } catch (error) {
                return console.log(error);
            }
        }

        return dispatch({
            type: OBTENER_UNA_CUENTA,
            payload: id
        })
    }

    const updateAccount = async account => {

        try {

            const response = await clienteAxios.put(`api/edit-account/${account.id}`, account)

            dispatch({
                type: EDITAR_CUENTA,
                payload: response.data
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAccount = async id => {

        try {

            await clienteAxios.delete(`api/delete-account/${id}`)

            dispatch({
                type: ELIMINAR_UNA_CUENTA
            })
            
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <cuentasContext.Provider
            value={{
                accounts: state.accounts,
                account: state.account,

                addAccount,
                getAccounts,
                getAccountById,
                updateAccount,
                deleteAccount,
            }}
        >
            {children}
        </cuentasContext.Provider>
    )
}

export default CuentasState;
