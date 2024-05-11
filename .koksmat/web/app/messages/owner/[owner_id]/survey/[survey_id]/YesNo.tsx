"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Fragment } from "react";

export function YesNo(props: {
  id: string;
  question: string;
  checked: boolean;
  isnull: boolean;
  label: string;
  onChange: (value: boolean) => void;
  type: "radio" | "switch" | "checkbox";
}) {
  const { id, question, checked, onChange, label } = props;
  let control = null;
  switch (props.type) {
    case "radio":
      control = (
        <RadioGroup
          // value={props.isnull ? "" : checked ? "yes" : "no"}
          className="flex"
          defaultValue={props.isnull ? "" : checked ? "yes" : "no"}
          onValueChange={(value) => {
            onChange(value === "yes");
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="option-yes" />
            <Label htmlFor="option-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="option-no" />
            <Label htmlFor="option-no">No</Label>
          </div>
        </RadioGroup>
      );
      break;
    case "checkbox":
      control = (
        <Fragment>
          <div className="flex items-center space-x-2">
            <Checkbox
              id={"survey_response" + id}
              defaultChecked={checked}
              checked={checked}
              onCheckedChange={(e) => {
                if (e === "indeterminate") return;
                onChange(e);
              }}
            />
            <label
              htmlFor={"survey_response" + id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          </div>
        </Fragment>
      );
      break;
    case "switch":
      control = (
        <Fragment>
          <Switch
            className="pointer "
            id={"survey_response" + id}
            checked={checked}
            onCheckedChange={onChange}
          />
          <Label
            className="pointer text-sm text-slate-500"
            htmlFor={"survey_response" + id}
          >
            {label}
          </Label>
        </Fragment>
      );
      break;
  }

  return (
    <div className="space-y-3">
      <div className="">{question}</div>
      <div className="flex items-center space-x-2">{control}</div>
    </div>
  );
}
