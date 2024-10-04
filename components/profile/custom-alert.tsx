import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function CustomAlert() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md mx-4 overflow-hidden shadow-lg transition-all hover:shadow-xl">
        <CardContent className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Sparkles className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Coming Soon
              </h3>
              <p className="text-gray-600">
                This feature is currently in development.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">
              We&apos;re working hard to bring you something amazing. Stay tuned
              for updates!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
