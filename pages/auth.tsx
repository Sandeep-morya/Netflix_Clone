import Input from "@/components/Input";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
type Props = {};

const Auth = (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [variant, setVariant] = useState("Sign in");

	const router = useRouter();

	const toggleVariant = useCallback(() => {
		setVariant((variant) => (variant == "Sign in" ? "Register" : "Sign in"));
	}, []);

	const login = useCallback(async () => {
		try {
			const data = await signIn("credentials", {
				email,
				password,
				redirect: false,
				callbackUrl: "/",
			});
			console.log(data);
			data?.status === 200 && router.replace("/");
		} catch (error) {
			console.log(error);
		}
	}, [email, password, router]);

	const register = useCallback(async () => {
		try {
			const { data } = await axios.post("/api/register", {
				name,
				email,
				password,
			});
			console.log(data);
			login();
		} catch (error) {
			console.log(error);
		}
	}, [name, email, password, login]);

	return (
		<div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
			<div className="bg-black h-full w-full lg:bg-opacity-50">
				<nav className="px-12 py-5">
					<img src="/images/logo.png/" alt="Logo" className="h-12" />
				</nav>
				<div className="flex justify-center">
					<div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-md rounded-md w-full">
						<h2 className="text-white text-4xl mb-8 font-semibold">
							{variant}
						</h2>
						<div className="flex flex-col gap-4">
							{variant == "Register" && (
								<Input
									label="UserName"
									type="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							)}
							<Input
								label="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							onClick={variant === "Register" ? register : login}
							className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
							{variant === "Register" ? "Sign up" : "Login"}
						</button>
						<div
							onClick={() => signIn("google", { callbackUrl: "/" })}
							className="flex flex-row items-center gap-4 mt-8 justify-center">
							<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
								<FcGoogle size={30} />
							</div>
							<div
								onClick={() => signIn("github", { callbackUrl: "/" })}
								className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
								<FaGithub size={30} />
							</div>
						</div>

						<p className="text-neutral-500 mt-12 text-center">
							{variant === "Register"
								? "Already have an account?"
								: "First time using NetFlix?"}{" "}
							<span
								onClick={toggleVariant}
								className="text-white ml-1 hover:underline cursor-pointer">
								{variant === "Register" ? "Login" : "Create an acoount"}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Auth;
