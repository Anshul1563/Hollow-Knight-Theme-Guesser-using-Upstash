import Header from "../quiz/Header";

export default function ResultsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
