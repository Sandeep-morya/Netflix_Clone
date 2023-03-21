import Input from "@/components/Input";
import React, { useCallback, useState } from "react";

type Props = {};

const Auth = (props: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [variant, setVariant] = useState("Sign in");

	const toggleVariant = useCallback(() => {
		setVariant((variant) => (variant == "Sign in" ? "Register" : "Sign in"));
	}, []);
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
						<button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
							{variant === "Register" ? "Sign up" : "Login"}
						</button>
						<p className="text-neutral-500 mt-12 text-center">
							{variant === "Register"
								? "Already have an account?"
								: "First time using NetFlix?"}
							&bnsp;
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
