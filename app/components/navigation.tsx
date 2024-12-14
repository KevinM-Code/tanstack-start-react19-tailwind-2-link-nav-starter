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
            </div>
            <hr />
        </Fragment>

    );
}