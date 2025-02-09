import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import authservice from "../appwrite/auth";
import { toast } from "react-toastify";

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            const userId = searchParams.get("userId");
            const secret = searchParams.get("secret");

            if (!userId || !secret) {
                setError("Invalid verification link!");
                toast.error("Invalid verification link!");
                setLoading(false);
                return;
            }

            try {
                await authservice.verifyEmail(userId, secret);
                toast.success("Email verified successfully! You can now log in.");
                navigate("/");
            } catch (error) {
                setError("Verification failed!");
                toast.error("Verification failed!");
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold">{loading ? "Verifying..." : error ? "Verification Failed" : "Verification Successful"}</h2>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Verify;
