import { SignIn } from "@/components/sign-in"

export default async function AuthNotFound() {
    return(
        <div className="home-page-bg">
            <p>
                Unauthorized Access, please login to view this page.
            </p>
            <div>
                <SignIn/>
            </div>
        </div>
    );
}