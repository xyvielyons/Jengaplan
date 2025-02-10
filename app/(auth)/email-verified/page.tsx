import EmailVerifiedCard from "@/components/cards/EmailVerifiedCard";
import { Suspense } from "react";
export default async function EmailVerifiedPage() {
	return (
        <div className="p-4">
            <Suspense fallback={<p>loading....</p>}>
                <EmailVerifiedCard></EmailVerifiedCard>
            </Suspense>
        </div>
	);
}