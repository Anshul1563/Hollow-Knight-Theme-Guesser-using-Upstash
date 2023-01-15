import Image from "next/image";
import Link from "next/link";
import HKlogo from "../../public/HKlogo.svg";

function Header() {
	return (
		<div className="sticky top-0 w-full z-50  bg-[#FF9F5F] text-[hsl(273,92%,27%)] font-medium  flex gap-8 p-4 px-8 justify-between">
			<Image
				priority={true}
				className="filter-white"
				src={HKlogo}
				height={50}
				width={100}
				alt="HK logo"
			></Image>
			<div className="flex gap-8">
				<Link className="flex justify-center transition-all hover:scale-110 active:scale-100 items-center" href="/results">Results</Link>
				<Link className="flex justify-center transition-all hover:scale-110 active:scale-100 items-center" href="/quiz">Quiz</Link>
				<Link className="flex justify-center transition-all hover:scale-110 active:scale-100 items-center" href="/">Home</Link>
			</div>
		</div>
	);
}

export default Header;
