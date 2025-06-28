// import { useState } from "react";
import ComponentCard from "../../common/ComponentCard"
import Label from "../Label"
import Input from "../input/InputField"
import Button from "../../ui/button/Button.jsx"

export default function DefaultInputs() {
  return (
    <ComponentCard title="Enter Your Attendance">
      <div className="space-y-6">
        <div>
          <Label htmlFor="inputTwo">Enter Your Presented Classes</Label>
          <Input type="text" id="input" placeholder="0-6" />
        </div>
        <div>
          <Label htmlFor="inputTwo">Enter Your Missing Classes</Label>
          <Input type="text" id="input" placeholder="0-6" />
        </div>
        <div>
          <Button className="w-full" size="sm">
            Post Attendence
          </Button>
        </div>
      </div>
    </ComponentCard>
  )
}
