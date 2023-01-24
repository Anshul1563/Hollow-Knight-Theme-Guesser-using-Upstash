import Image from "next/image";
import Link from "next/link";

function ResultsHeader() {
	return (
		<div className="self-start flex-col phone:flex-row bg-[hsl(325,100%,83%)] pt-4 phone:pb-4 font-medium flex gap-2 phone:gap-8 phone:px-8 items-center phone:justify-start">
			<Link
				className="flex p-2 flex-1 phone:w[100px] md:w-[150px]  bg-[hsl(325,100%,77%)] border-2 border-[#ffffff] justify-center transition-all hover:scale-110 active:scale-100 items-center"
				href="/results/themes"
			>
				Themes
			</Link>
			<Link
				className="flex p-2 flex-1 phone:w[100px] md:w-[150px]  bg-[hsl(325,100%,77%)] border-2 border-[#ffffff] justify-center transition-all hover:scale-110 active:scale-100 items-center"
				href="/results/voices"
			>
				Voices
			</Link>
		</div>
	);
}

export default ResultsHeader;
