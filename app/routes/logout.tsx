import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { createClient } from "~/supabase/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createClient(request);

  await supabase.auth.signOut();
  return redirect("/login", { headers });
}

export function loader() {
  return redirect("/");
}
