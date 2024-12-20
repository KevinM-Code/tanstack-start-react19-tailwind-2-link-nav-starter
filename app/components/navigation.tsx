import { Link } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

export default function Navigation() {


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

            </div>
            <hr />
        </Fragment>

    );
}