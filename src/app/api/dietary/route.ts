export async function GET() {
  const res = await fetch(
    `${process.env.API_URL}/api/dietary`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return Response.json(data);
}
