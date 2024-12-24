import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";
import { useUserEmail } from "../utils/context";

export default function Navigation() {

    const { state, dispatch } = useUserEmail();

    return (
        <Fragment>
            <div className="p-2 flex gap-2 text-lg">
                <Link
                    to="/"
                    activeProps={{
                        className: 'font-bold',
                    }}
                    activeOptions={{ exact: true }}
                >
                    Home
                </Link>{' '}
                <Link
                    to="/about"
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    About
                </Link>
                <Link
                    to="/dashboard"
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    Dashboard
                </Link>
                <Link
                    to="/login"
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    Signup
                </Link>
               {state.email ? (<Link
                    className="justify-self-end"
                    to="/logout"
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    Logout
                </Link>) : null}
                

            </div>
            <hr />
        </Fragment>

    );
}