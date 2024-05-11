"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useService } from "@/koksmat/useservice";
import { SurveyResponse } from "./page";

export function SendResponse(props: {
  responses: SurveyResponse[];
  dialogChange: (open: boolean) => void;
  isOpen: boolean;
}) {
  const { responses, dialogChange, isOpen } = props;

  const submitResult = useService<any>(
    "magic-messages.surveyresponse",
    ["submit", JSON.stringify(responses)],
    "",
    600,
    "x"
  );
  return (
    <Dialog onOpenChange={dialogChange} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="p-20">
            {submitResult.isLoading && <div>Sending...</div>}
            {submitResult.error && (
              <div className="text-red-500">{submitResult.error}</div>
            )}
            {submitResult.data && (
              <div className="text-xl">Responses have been received</div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
