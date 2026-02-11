export async function GET() {
  const res = await fetch(
    `${process.env.API_URL}/api/category`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return Response.json(data);
}
