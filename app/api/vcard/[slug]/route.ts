// app/api/vcard/[slug]/route.ts
// Generate downloadable vCard for salesperson

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

// Dealership info
const DEALERSHIP = {
  name: "Gallatin CDJR",
  address: "1290 Nashville Pike, Gallatin, TN 37066",
  website: "https://www.gallatincdjr.com",
  salesHours: "Mon-Sat 9:00AM-8:00PM",
  servicePhone: "629-263-6161",
  serviceHours: "Mon-Fri 7:30AM-6:00PM",
};

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Handle special slugs
    if (slug === "service") {
      return generateServiceVCard();
    }
    if (slug === "accessories") {
      return generateAccessoriesVCard();
    }

    // Get salesperson data
    const { data: sp, error } = await supabaseServer
      .from("salespeople")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !sp) {
      return NextResponse.json(
        { error: "Salesperson not found" },
        { status: 404 }
      );
    }

    // Generate vCard content
    const vcard = generateVCard({
      firstName: sp.display_name.split(" ")[0],
      lastName: sp.display_name.split(" ").slice(1).join(" "),
      title: sp.title,
      phone: sp.phone,
      email: sp.email,
      organization: DEALERSHIP.name,
      address: DEALERSHIP.address,
      website: DEALERSHIP.website,
      note: `Sales Hours: ${DEALERSHIP.salesHours}`,
    });

    // Return as downloadable file
    return new NextResponse(vcard, {
      headers: {
        "Content-Type": "text/vcard",
        "Content-Disposition": `attachment; filename="${sp.display_name.replace(/\s+/g, "_")}.vcf"`,
      },
    });
  } catch (err) {
    console.error("vCard error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function generateVCard(data: {
  firstName: string;
  lastName: string;
  title?: string;
  phone?: string;
  email?: string;
  organization?: string;
  address?: string;
  website?: string;
  note?: string;
  photo?: string;
}) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${data.lastName};${data.firstName};;;`,
    `FN:${data.firstName} ${data.lastName}`,
  ];

  if (data.organization) lines.push(`ORG:${data.organization}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.phone) lines.push(`TEL;TYPE=CELL:${data.phone}`);
  if (data.email) lines.push(`EMAIL:${data.email}`);
  if (data.address) lines.push(`ADR;TYPE=WORK:;;${data.address.replace(/,/g, ";")};;;`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.note) lines.push(`NOTE:${data.note}`);
  if (data.photo) lines.push(`PHOTO;VALUE=URI:${data.photo}`);

  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function generateServiceVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Department;Service;;;",
    "FN:Gallatin CDJR Service",
    "ORG:Gallatin CDJR",
    "TITLE:Service Department",
    "TEL;TYPE=WORK:629-263-6161",
    "ADR;TYPE=WORK:;;1290 Nashville Pike;Gallatin;TN;37066;USA",
    "URL:https://www.gallatincdjr.com/scheduleservice",
    "NOTE:Service Hours: Mon-Fri 7:30AM-6:00PM",
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": 'attachment; filename="Gallatin_CDJR_Service.vcf"',
    },
  });
}

function generateAccessoriesVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Upchurch;Wesley;;;",
    "FN:Wesley Upchurch",
    "ORG:Gallatin CDJR",
    "TITLE:Accessories Manager",
    "TEL;TYPE=CELL:615-626-1274",
    "EMAIL:wesley.u@gallatincdjr.com",
    "ADR;TYPE=WORK:;;1290 Nashville Pike;Gallatin;TN;37066;USA",
    "URL:https://www.gallatincdjr.com",
    "NOTE:Customize your ride! Contact Wesley for accessories and upgrades. Sales Hours: Mon-Sat 9:00AM-8:00PM",
    "END:VCARD",
  ].join("\r\n");

  return new NextResponse(vcard, {
    headers: {
      "Content-Type": "text/vcard",
      "Content-Disposition": 'attachment; filename="Wesley_Upchurch_Accessories.vcf"',
    },
  });
}
