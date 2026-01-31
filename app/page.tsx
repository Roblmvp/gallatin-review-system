// app/page.tsx
// Home page - redirects to main site or shows simple info

import { redirect } from "next/navigation";

export default function HomePage() {
  // Option 1: Redirect to main dealership website
  redirect("https://www.gallatincdjr.com");

  // Option 2: Show a simple page (uncomment below and comment out redirect above)
  // return (
  //   <main style={{ padding: 40, textAlign: "center" }}>
  //     <h1>Gallatin CDJR</h1>
  //     <p>Review link system</p>
  //   </main>
  // );
}
