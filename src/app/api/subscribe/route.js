// app/api/subscribe/route.js

import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email address." },
        { status: 400 }
      );
    }

    // Mailchimp form action URL components
    const MAILCHIMP_URL = "https://gmail.us8.list-manage.com/subscribe/post";
    const MAILCHIMP_U = "4b3133edf8aff0e46c5a1a108";
    const MAILCHIMP_ID = "84a151cc93";
    const MAILCHIMP_F_ID = "005159e1f0";

    // Construct the full URL with query parameters
    const url = `${MAILCHIMP_URL}?u=${MAILCHIMP_U}&id=${MAILCHIMP_ID}&f_id=${MAILCHIMP_F_ID}`;

    // Prepare form data
    const formData = new URLSearchParams();
    formData.append("EMAIL", email);
    formData.append(`b_${MAILCHIMP_U}_${MAILCHIMP_ID}`, ""); // Bot field

    // Submit the form data to Mailchimp
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // To avoid CORS issues, we use a proxy
      },
      body: formData.toString(),
    });

    // Mailchimp typically returns a 200 status code even for errors
    // To handle this, we'll parse the response text

    const text = await response.text();

    if (text.includes("0 -")) {
      // Subscription successful
      return NextResponse.json(
        { message: "Subscription successful!" },
        { status: 200 }
      );
    } else {
      // Subscription failed
      return NextResponse.json(
        { message: "Subscription failed. Please try again." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

// Utility function to validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
