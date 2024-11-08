export async function GET(request: Request) {
  const res = await fetch("https://www.googleapis.com/youtube/v3/comments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
