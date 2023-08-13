'use client';

import * as Form from '@radix-ui/react-form';

export function MedInput() {
  return (
    <Form.Root
      className="w-80"
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        console.log(data);
      }}
    >
      <Form.Field name="medication">
        <div className="text-white flex flex-col items-baseline justify-between">
          <Form.Label className="font-medium">The name you use for your medication:</Form.Label>
          <Form.Message className="text-sm opacity-80 mb-1" match="valueMissing">
            Please enter a medication
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            className="w-full inline-flex items-center justify-center rounded resize-none p-2 text-black"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="dosage">
        <div className="text-white flex flex-col items-baseline justify-between">
          <Form.Label className="font-medium ">The dosage you take:</Form.Label>
          <Form.Message className="text-sm opacity-80 mb-1" match="valueMissing">
            Please enter your prescribed dosage
          </Form.Message>
        </div>
        <Form.Control asChild>
          <textarea
            placeholder="'50mg' or '2 pills'- whatever's comfortable for you."
            className="w-full inline-flex items-center justify-center rounded resize-none p-2 text-black"
            required
          />
        </Form.Control>
      </Form.Field>
      <Form.Field className="grid mb-3" name="schedule">
        <div className="text-white flex flex-col items-baseline justify-between">
          <Form.Label className="font-medium ">When you take it:</Form.Label>
        </div>
        <Form.Control asChild>
          <select className="text-black">
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Morning and Evening">Morning and Evening</option>
          </select>
        </Form.Control>
      </Form.Field>
      <Form.Submit asChild>
        <div className="flex w-full justify-center mt-4">
          <button
            className="flex w-5/6 h-8 text-black items-center justify-center rounded px-4 text-sm font-medium bg-white shadow-md"
          >
            Add Scheduled Dose
          </button>
        </div>
      </Form.Submit>
    </Form.Root>
  );
}
