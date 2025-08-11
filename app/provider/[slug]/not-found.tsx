import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-black mb-4">Provider Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the provider you're looking for. They may have moved or the link might be incorrect.
        </p>

        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full">Go to Homepage</Button>
          </Link>

          <div className="text-center">
            <Link href="https://bookovia.onelink.me/6MF9/yxg770e5" className="text-primary hover:underline">
              Download the Bookovia app
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
