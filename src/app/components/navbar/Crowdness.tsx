"use client";
import { Users } from "lucide-react";

export default function Crowdness() {
	return (
		<div className="crowdness-wrapper z-[1000]">
			<button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition flex items-center">
				<Users size={20} className="mr-2" />
				Crowdness
			</button>

			<style jsx>{`
				.crowdness-wrapper {
					position: absolute;
					top: 4.5rem; /* top-18 */
					left: 7.5rem; /* left-30 */
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
				}

				@media (min-width: 850px) {
					.crowdness-wrapper {
						top: 1rem; /* top-4 */
						left: 36.25rem; /* left-145 */
						flex-direction: row;
					}
				}
			`}</style>
		</div>
	);
}
