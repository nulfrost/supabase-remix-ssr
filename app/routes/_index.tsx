import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { createClient } from "~/supabase/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createClient(request);
  const { data: todos } = await supabase.from("todos").select("*");

  return { todos };
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>();
  return (
    <>
      <ul>{todos?.map((todo) => <li key={todo.id}>{todo.name}</li>)}</ul>
      <Form method="POST" action="/logout">
        <button type="submit">Log out</button>
      </Form>
    </>
  );
}
