import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as loginUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const handleLogin = async (data) => {
        try {
            const { email, password } = data;
            await dispatch(loginUser({
                email, password
            })).unwrap();
            toast.success("User loggedIn Successfully.");
            reset();
        } catch (error) {
            toast.error(error || "Failed to login, try again.");
        }
    }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <label>Email <input type="text" {...register("email", { required: "Email is required." })} /></label>
                {errors.email && <p>{errors?.email?.message}</p>}<br /><br />
                <label>Password <input type="password" {...register("password", { required: "Password is required." })} /></label><br /><br />
                <button type="submit">Login</button>
            </form>
        </>

    )
}

export default Login;