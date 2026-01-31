// app/api/calendar/service-reminder/route.ts
// Generate downloadable calendar reminder for service

import { NextResponse } from "next/server";

const DEALERSHIP = {
  name: "Gallatin CDJR",
  address: "1550 Nashville Pike, Gallatin, TN 37066",
  serviceUrl: "https://www.gallatincdjr.com/service/schedule/", // UPDATE WITH ACTUAL URL
  servicePhone: "615-000-0000", // UPDATE WITH ACTUAL NUMBER
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const format = url.searchParams.get("format") || "ics";

  // Calculate first service date (6 months from now)
  const now = new Date();
  const firstService = new Date(now);
  firstService.setMonth(firstService.getMonth() + 6);
  firstService.setHours(9, 0, 0, 0); // 9 AM

  const endTime = new Date(firstService);
  endTime.setHours(10, 0, 0, 0); // 1 hour event

  if (format === "google") {
    // Return Google Calendar URL
    const googleUrl = generateGoogleCalendarUrl(firstService, endTime);
    return NextResponse.redirect(googleUrl);
  }

  // Generate ICS file (works for Apple Calendar, Outlook, etc.)
  const ics = generateICS(firstService, endTime);

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": 'attachment; filename="Gallatin_CDJR_Service_Reminder.ics"',
    },
  });
}

function formatDateForICS(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function generateICS(start: Date, end: Date): string {
  const uid = `service-${Date.now()}@gallatincdjr.reviews`;
  
  // Calculate dates for recurring reminders (every 6 months, 4 occurrences = 2 years)
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Gallatin CDJR//Service Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${formatDateForICS(new Date())}`,
    `DTSTART:${formatDateForICS(start)}`,
    `DTEND:${formatDateForICS(end)}`,
    "RRULE:FREQ=MONTHLY;INTERVAL=6;COUNT=8", // Every 6 months for 4 years
    "SUMMARY:🚗 Gallatin CDJR - Service Due",
    `DESCRIPTION:Time for your scheduled maintenance at Gallatin CDJR!\\n\\n📅 Schedule online: ${DEALERSHIP.serviceUrl}\\n📞 Call: ${DEALERSHIP.servicePhone}\\n\\nRegular maintenance keeps your vehicle running great and protects your warranty.`,
    `LOCATION:${DEALERSHIP.address}`,
    `URL:${DEALERSHIP.serviceUrl}`,
    // Reminder 1 week before
    "BEGIN:VALARM",
    "TRIGGER:-P7D",
    "ACTION:DISPLAY",
    "DESCRIPTION:Service reminder: Your vehicle maintenance is due in 1 week!",
    "END:VALARM",
    // Reminder 1 day before
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY", 
    "DESCRIPTION:Service reminder: Your vehicle maintenance is due tomorrow!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

function generateGoogleCalendarUrl(start: Date, end: Date): string {
  const formatForGoogle = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "🚗 Gallatin CDJR - Service Due",
    dates: `${formatForGoogle(start)}/${formatForGoogle(end)}`,
    details: `Time for your scheduled maintenance at Gallatin CDJR!\n\n📅 Schedule online: ${DEALERSHIP.serviceUrl}\n📞 Call: ${DEALERSHIP.servicePhone}\n\nRegular maintenance keeps your vehicle running great and protects your warranty.`,
    location: DEALERSHIP.address,
    recur: "RRULE:FREQ=MONTHLY;INTERVAL=6;COUNT=8",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
