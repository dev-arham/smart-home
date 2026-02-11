"use client";

import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function AdminError({ error, reset }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center p-6">
      <Alert variant="destructive" className="max-w-lg">
        <AlertTriangle className="size-4" />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription className="mt-2">
          <p>{error?.message || "An unexpected error occurred."}</p>
          <Button variant="outline" className="mt-4" onClick={() => reset()}>
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
