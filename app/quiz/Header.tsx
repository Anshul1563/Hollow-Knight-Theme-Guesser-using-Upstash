import Image from "next/image";
import Link from "next/link";
import HKlogo from "../../public/HKlogo.svg";

function Header() {
	return (
		<div className="sticky top-0 w-full z-50 flex-col phone:flex-row bg-[hsl(24,100%,69%)] text-[hsl(273,92%,27%)] pt-4 phone:pb-4 font-medium flex gap-2 phone:gap-8 phone:px-8 items-center phone:justify-between">
			<Image
				priority={true}
				src={HKlogo}
				width={100}
				height={50}
				alt="HK logo"
			></Image>
			<div className="flex justify-around text-base w-full phone:w-auto phone:justify-start">
				<Link className="flex p-2 flex-1 phone:w[100px] md:w-[150px]  bg-[hsl(24,100%,65%)] border-x-2 border-[#ffffff] justify-center transition-all hover:scale-110 active:scale-100 items-center" href="/results">Results</Link>
				<Link className="flex p-2 flex-1 phone:w[100px] md:w-[150px]  bg-[hsl(24,100%,65%)] border-x-2 border-[#ffffff] justify-center transition-all hover:scale-110 active:scale-100 items-center" href="/quiz">Quiz</Link>
				
			</div>
		</div>
	);
}

export default Header;
