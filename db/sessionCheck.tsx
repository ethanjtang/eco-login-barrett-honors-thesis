import { SignIn_Sm } from "@/components/sign-in"

export default async function AuthNotFound() {
    return(
        <div className="home-page-bg">
            <h1 className="page-title">
                Unauthorized Access
            </h1>
            <p className="page-caption">
                User session not active, please sign in to view this page.
            </p>
            <div>
                <SignIn_Sm/>
            </div>
        </div>
    );
}