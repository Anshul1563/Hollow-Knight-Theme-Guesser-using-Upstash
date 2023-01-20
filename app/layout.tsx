import { AnalyticsWrapper } from "./analytics";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head />
			<body>
				{children}
				<AnalyticsWrapper />
			</body>
		</html>
	);
}
