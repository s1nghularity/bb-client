import * as React from 'react'

import BankForm from "./bankform";
import { useUserContext } from "./context";


// TODO: Authorize login requests

function CreateAccount() {
    return <Account />;
}

function Account() {
    const { user, setUser } = useUserContext();
    let nextId =+ 1;
    function handle(data) {
        if (typeof user === 'undefined') {
            setUser([]);
        }
        setUser([
            ...user,
            {
                id: nextId,
                name: data.name,
                email: data.email,
                password: data.password,
                balance: 100,
                transactionHistory: []
            },
        ]);

        console.log(user);

        return true;
    }

    return (
        <div>
            <BankForm
            bgcolor="primary"
            label="Create Account"
            handle={handle}
            successButton="Add another account"
            />
    
        </div>
    );
}

export default CreateAccount
