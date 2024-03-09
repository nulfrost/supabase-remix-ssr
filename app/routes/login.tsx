import { ActionFunctionArgs, redirect } from "@vercel/remix";
import { Form } from "@remix-run/react";
import { createClient } from "~/supabase/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("_intent") as "github";

  const { supabase, headers } = createClient(request);

  const { data } = await supabase.auth.signInWithOAuth({
    provider: intent,
    options: {
      redirectTo: process.env.REDIRECT_URL,
    },
  });

  return redirect(data.url as string, { headers });
}

export default function Login() {
  return (
    <Form method="POST">
      <input type="text" name="_intent" value="github" hidden readOnly />
      <button type="submit">Log in with Github</button>
    </Form>
  );
}
