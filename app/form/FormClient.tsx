"use client";

import { useState } from "react";
import { TextInput, Textarea, Button, Stack, Box } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";

interface Props {
  action: (formData: FormData) => Promise<void>;
}

export default function FormClient({ action }: Props) {
  const [datetime, setDatetime] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    },
    validate: {
      firstname: (v) => (v.trim().length < 2 ? "Too short" : null),
      lastname: (v) => (v.trim().length < 2 ? "Too short" : null),
      email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? null : "Invalid email"),
      phone: (v) => (v.trim().length < 6 ? "Invalid phone" : null),
    },
    validateInputOnChange: true, //juba näha mis sobib
  });

  return (
    <Box component="section">
      <form action={action} className="space-y-4">
        <Stack>
          <TextInput
            label="Eesnimi"
            placeholder="Eesnimi"
            required
            {...form.getInputProps("firstname")}
            name="firstname"
          />
          <TextInput
            label="Perekonnanimi"
            placeholder="Perekonnanimi"
            required
            {...form.getInputProps("lastname")}
            name="lastname"
          />
          <TextInput
            label="E-post"
            placeholder="email@tlu.ee"
            required
            type="email"
            {...form.getInputProps("email")}
            name="email"
          />
          <TextInput
            label="Telefoni number"
            placeholder="+372......."
            required
            {...form.getInputProps("phone")}
            name="phone"
          />

          <DateTimePicker
            label="Kuupäev ja kellaaeg"
            placeholder="Vali kuupäev ja aeg"
            value={datetime}
            onChange={(value: string | null) => setDatetime(value)} //  string | null
          />
          <input type="hidden" name="datetime" value={datetime ?? ""} />

          <Textarea
            label="Tekst"
            placeholder="Kirjeldus..."
            minRows={3}
            {...form.getInputProps("message")}
            name="message"
          />
        </Stack>

        <div className="flex justify-end mt-4">
          <Button type="submit">Saada</Button>
        </div>
      </form>
    </Box>
  );
}
